import bcrypt from 'bcrypt';
import { defineEventHandler, readBody } from 'h3';
import prisma from '../../../database/db';
import { createJwtToken } from '~/jwt';

export default defineEventHandler(async (event) => {
  console.log('Request received');

  if (event.req.method !== 'POST') {
    event.res.statusCode = 405;
    console.log('Method not allowed');
    return { message: 'Method not allowed' };
  }

  const body = await readBody(event);
  console.log('Request body:', body);

  const { email, password } = body;

  if (!email || !password) {
    event.res.statusCode = 400;
    console.log('Missing fields');
    return {message: 'Missing fields'};
  }

  const user = await prisma.user.findUnique({
    where: {
       email: email
    },
    select: {
      id: true,
      email: true,
      name: true,
      password: true
    }
 });

 if(user){
    const match = await bcrypt.compare(password, user.password);

    if(match){
       const token = await createJwtToken(user.id); // Pass user ID to createJwtToken

       setCookie(event, "token", token); // Corrected to set the token in the cookie
       
       // Destructure the user object to exclude the password property
       const { password, ...userWithoutPassword } = user;
       
       // Store encrypted user data in cookie without the password
       setCookie(event, "user", JSON.stringify(userWithoutPassword));

       prisma.$disconnect();

       // Prepare user object for response without directly mutating the original user object
       const responseUser = { ...userWithoutPassword, token: token, success: true };

       return responseUser;
    } else {
       return {
          message: `The user with email "${email}" does not exist or the password does not match`,
          success: false
       }
    }
 } else {
    prisma.$disconnect();

    return {
       message: `The user with email ${email} does not exist or the password does not match`,
       success: false
    }
 }
});
