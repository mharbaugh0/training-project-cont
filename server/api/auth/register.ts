import prisma from '../../../database/db';
import bcrypt from 'bcrypt';
import { defineEventHandler, readBody } from 'h3';
import { consola } from "consola"


export default defineEventHandler(async (event) => {
//Checking if the request method is POST
  if (event.req.method !== 'POST') {
    event.res.statusCode = 405;
    return { message: 'Method not allowed' };
  }

  //Reading the body of the request and splitting it into name, email, and password
  const body = await readBody(event);
  const { name, email, password, confirmPassword } = body;

  //If the name, email, or password fields are missing, send a message
  if (!name || !email || !password || !confirmPassword) {
    event.res.statusCode = 400;
    return ('Missing fields');
  }

  // Check if the password and password confirmation match
  if (password !== confirmPassword) {
    event.res.statusCode = 400;
    consola.error(event.res.statusCode + ':' + 'Passwords do not match');
    return ('Passwords do not match');
}

  const hashedPassword = await bcrypt.hash(password, 10);

  //Creating a new user with the name, email, and hashed password
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    //If the user is created successfully, send a status code of 201
    event.res.statusCode = 201;
    consola.log(event.res.statusCode + ':' + 'User created successfully');
    return { user };

    //If the user creation fails, send a status code of 500 and an error message
  } catch (error: any) {
    event.res.statusCode = 500;
    consola.error(event.res.statusCode + ':' + 'User creation failed')
    return ('User creation failed, please alter credentials and try again');
  }
});
