import { defineEventHandler, readBody, parseCookies } from 'h3';
import bcrypt from 'bcrypt';
import prisma from '../../../database/db';

export default defineEventHandler(async (event) => {
    console.log('Request received');

    if (event.req.method !== 'POST') {
        event.res.statusCode = 405;
        console.log('Method not allowed');
        return { message: 'Method not allowed' };
    }

    const body = await readBody(event);
    console.log('Request body:', body);

    const { currentPassword, newPassword, confirmedNewPassword } = body;

    if (!currentPassword || !newPassword || !confirmedNewPassword) {
        event.res.statusCode = 400;
        console.log('Missing fields');
        return { message: 'Missing fields' };
    }

    if (newPassword !== confirmedNewPassword) {
        event.res.statusCode = 400;
        console.log('Passwords do not match');
        return { message: 'Passwords do not match' };
    }

    try {
        // Parse the cookies from the request headers
        const cookies = parseCookies(event);
        console.log(cookies);
        const userId = Number(cookies.id);
        console.log('User ID:', userId);

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        console.log('User:', user);

        if (!user) {
            event.res.statusCode = 401;
            console.log('Invalid user');
            return { message: 'Invalid user' };
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        console.log('Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            event.res.statusCode = 401;
            console.log('Invalid password');
            return { message: 'Invalid password' };
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedNewPassword },
        });

        console.log('Password changed successfully');
        return { message: 'Password changed successfully' };
    } catch (error: any) {
        event.res.statusCode = 500;
        console.log('Password change failed:', error.message);
        return { message: 'Password change failed', error: error.message };
    }
});