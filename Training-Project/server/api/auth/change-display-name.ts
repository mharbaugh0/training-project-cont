import { defineEventHandler, readBody, parseCookies } from 'h3';
import prisma from '../../../database/db';

export default defineEventHandler(async (event) => {
  if (event.req.method !== 'POST') {
    event.res.statusCode = 405;
    console.log('Method not allowed');
    return { message: 'Method not allowed' };
  }

  const body = await readBody(event);
  const { newName } = body;

  if (!newName) {
    event.res.statusCode = 400;
    console.log('Missing fields');
    return { message: 'Missing fields' };
  }

  try {
    const cookies = parseCookies(event);
    const userId = Number(cookies.id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      event.res.statusCode = 401;
      return { message: 'Invalid user' };
    }

    if (newName === user.name) {
      event.res.statusCode = 400;
      return { message: 'Name is the same as the current name' };
    }

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
