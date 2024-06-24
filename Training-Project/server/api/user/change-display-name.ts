import { defineEventHandler, readBody, parseCookies } from 'h3';
import prisma from '../../../database/db';

export default defineEventHandler(async (event) => {

  //If the request method is not POST, return a 405 status code
  if (event.req.method !== 'POST') {
    event.res.statusCode = 405;
    console.log('Method not allowed');
    return { message: 'Method not allowed' };
  }

  const body = await readBody(event);
  const { newName } = body;

      // Validate presence of the required field
  if (!newName) {
    event.res.statusCode = 400;
    console.log('Missing fields');
    return { message: 'Missing fields' };
  }

  try {
    // Parse the cookies from the request headers
    const cookies = parseCookies(event);
    const userId = Number(cookies.id); // Convert cookie ID to number

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Check if user exists
    if (!user) {
      event.res.statusCode = 401;
      return { message: 'Invalid user' };
    }

    // Check if the new name is the same as the current name
    if (newName === user.name) {
      event.res.statusCode = 400;
      return { message: 'Name is the same as the current name' };
    }

    // Update the user's name in the database
    await prisma.user.update({
      where: { id: userId },
      data: { name: newName },
    });

    return { message: 'Name changed successfully', newName };
  } catch (error: any) {
    event.res.statusCode = 500;
    return { message: 'Internal server error' };
  }
});
