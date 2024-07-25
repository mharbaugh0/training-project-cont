import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { defineEventHandler, readBody } from 'h3'
import prisma from '../../../database/db';
import { consola } from "consola"

const JWT_SECRET = process.env.JWT_SECRET;

export default defineEventHandler(async (event) => {
  consola.log('Request received');

  if (event.req.method !== 'POST') {
    event.res.statusCode = 405;
    consola.error(event.res.statusCode + ':' + 'Method not allowed');
    return { message: 'Method not allowed' };
  }

  // The body of the request is read and parsed into a JavaScript object.
  const body = await readBody(event);
  consola.log('Request body:', body);

  // The email and password are extracted from the request body.
  const { email, password } = body;

  if (!email || !password) {
    event.res.statusCode = 400;
    consola.error(event.res.statusCode + ':' + 'Missing fields');
    return ('Missing fields');
  }

  try {

    //The User is found in the database using the email address provided in the request.
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      event.res.statusCode = 401;
      consola.error(event.res.statusCode + ':' + 'Invalid email');
      return ('Invalid email or password');
    }

    //The password provided in the request is compared to the hashed password stored in the database.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    consola.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      event.res.statusCode = 401;
      consola.error(event.res.statusCode + ':' + 'Invalid password');

      return ('Invalid Password');
    }

    //If the password is valid, a JSON Web Token (JWT) is created and returned to the client.
    const token = jwt.sign({ userId: user.id }, JWT_SECRET || '');
    consola.log('User authenticated successfully:', user.id);

    return { token, name: user.name, email: user.email, id: user.id};
  } catch (error: any) {
    event.res.statusCode = 500;
    consola.error(event.res.statusCode + ':' + 'Login failed:', error.message);
    return { message: 'Login failed', error: error.message };
  }
});
