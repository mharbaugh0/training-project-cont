import { defineEventHandler, readBody, parseCookies } from 'h3';
import prisma from '../../../database/db';

export default defineEventHandler(async (event) => {

    // Check if the request method is POST
    if (event.req.method !== 'POST') {
        event.res.statusCode = 405;
        console.log('Method not allowed');
        return { message: 'Method not allowed' };
    }

    const body = await readBody(event);

    const { currentEmail, newEmail, confirmedNewEmail } = body;

    // Validate presence of all required fields
    if (!currentEmail || !newEmail || !confirmedNewEmail) {
        event.res.statusCode = 400;
        console.log('Missing fields');
        return { message: 'Missing fields' };
    }

    // Check if newEmail and confirmedNewEmail match
    if (newEmail !== confirmedNewEmail) {
        event.res.statusCode = 400;
        console.log('Emails do not match');
        return ('Emails do not match');
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

        // Compare currentEmail with the email stored in the database
        const isEmailValid = currentEmail === user.email;        

        if (!isEmailValid) {
            event.res.statusCode = 401;
            return ('Invalid Email');
        }

        // Check if the new email is already being used by another user
        const emailInUse = await prisma.user.findUnique({
            where: { email: newEmail },
        });

        if (emailInUse) {
            event.res.statusCode = 409; // Conflict status code
            return ('Email is already in use');
        }

        // Update user's email in the database
        await prisma.user.update({
            where: { id: userId },
            data: { email: confirmedNewEmail },
        });

        return { message: 'Email changed successfully' };
    } catch (error: any) {
        event.res.statusCode = 500;
        return { message: 'Email change failed', error: error.message };
    }
});