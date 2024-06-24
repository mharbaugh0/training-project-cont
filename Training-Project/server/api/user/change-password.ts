import { defineEventHandler, readBody, parseCookies } from 'h3';
import bcrypt from 'bcrypt';
import prisma from '../../../database/db';

export default defineEventHandler(async (event) => {

    // Check if the request method is POST
    if (event.req.method !== 'POST') {
        event.res.statusCode = 405;
        console.log('Method not allowed');
        return { message: 'Method not allowed' };
    }

    const body = await readBody(event);

    const { currentPassword, newPassword, confirmedNewPassword } = body;

    // Validate presence of all required fields
    if (!currentPassword || !newPassword || !confirmedNewPassword) {
        event.res.statusCode = 400;
        console.log('Missing fields');
        return ('Missing fields');
    }

    // Check if newPassword and confirmedNewPassword match
    if (newPassword !== confirmedNewPassword) {
        event.res.statusCode = 400;
        console.log('Passwords do not match');
        return ('Passwords do not match');
    }

    try {
        //Parse the cookies from the request headers
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

        // Verify current password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            event.res.statusCode = 401;
            return ('Invalid password');
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password in the database
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedNewPassword },
        });

        return { message: 'Password changed successfully' };
    } catch (error: any) {
        event.res.statusCode = 500;
        return { message: 'Password change failed', error: error.message };
    }
});