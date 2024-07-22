import { checkJwtToken, createJwtToken } from "~/jwt";
import prisma from '../../../database/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { token } = body;

  console.log('Received body:', body); // Log the entire request body
  console.log('Received token:', token); // Log the received token

  if (!token) {
    console.log('Token is missing in the request body');
    return { success: false, message: 'Token is missing' };
  }

  const isValid = await checkJwtToken(token);

  if (!isValid.success) {
    console.log('Token is invalid:', isValid.message); // Log the invalid token message
    return { success: false, message: 'Invalid token' };
  }

  const decoded = isValid.decoded as { userId: number }; // Assuming decoded contains a 'userId' field
  console.log('Decoded token:', decoded); // Log the decoded token

  const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

  if (!user) {
    console.log('User not found for ID:', decoded.userId); // Log the user not found message
    return { success: false, message: 'User not found' };
  }

  // Refresh JWT token
  const newToken = await createJwtToken(user.id);
  setCookie(event, "token", newToken);

  // Remove sensitive information like password from the user object
  const { password, ...userWithoutPassword } = user;

  return { success: true, user: userWithoutPassword };
});
