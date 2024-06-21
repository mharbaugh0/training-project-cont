import { defineEventHandler, readBody, parseCookies } from 'h3';
import bcrypt from 'bcrypt';
import prisma from '../../../database/db';

export default defineEventHandler(async (event) => {

    //Check if the request method is DELETE
    if (event.req.method !== 'DELETE') {
        event.res.statusCode = 405;
        console.log('Method not allowed');
        return { message: 'Method not allowed' };
    }

    const body = await readBody(event);
    console.log('Request body:', body);

    if (!body) {
        event.res.statusCode = 400;
        console.log('No body found in the request');
        return { message: 'No body found in the request' };
    }

    const { email, password, confirmedPassword } = body;
    console.log(email, password, confirmedPassword);

    // Validate presence of all required fields
    if (!email || !password || !confirmedPassword) {
        event.res.statusCode = 400;
        console.log('Missing fields');
        return { message: 'Missing fields' };
    }

    // Check if currentPassword and confirmedCurrentPassword match
    if (password !== confirmedPassword) {
        event.res.statusCode = 400;
        console.log('Passwords do not match');
        return { message: 'Passwords do not match' };
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

        // Compare email with the email stored in the database
        const isEmailValid = email === user.email;

        if (!isEmailValid) {
            event.res.statusCode = 401;
            return { message: 'Invalid Email' };
        }

        // Verify current password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            event.res.statusCode = 401;
            return { message: 'Invalid password' };
        }

        // Delete user from the database
        await prisma.user.delete({
            where: { id: userId },
        });

        return { message: 'Account deleted successfully' };
    } catch (error: any) {
        event.res.statusCode = 500;
        console.log('Account deletion failed:', error.message);
        return { message: 'Account deletion failed', error: error.message };
    }
});
