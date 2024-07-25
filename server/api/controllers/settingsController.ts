import { readBody, parseCookies, H3Event } from 'h3';
import bcrypt from 'bcrypt';
import prisma from '../../../database/db';
import { consola } from "consola"

export async function changePassword(event: H3Event) { 

    const body = await readBody(event);

    const { currentPassword, newPassword, confirmedNewPassword } = body;

    // Validate presence of all required fields
    if (!currentPassword || !newPassword || !confirmedNewPassword) {
        event.res.statusCode = 400;
        consola.error(event.res.statusCode + ':' + 'Missing fields');
        return ('Missing fields');
    }

    // Check if newPassword and confirmedNewPassword match
    if (newPassword !== confirmedNewPassword) {
        event.res.statusCode = 400;
        consola.error(event.res.statusCode + ':' + 'Passwords do not match');
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
};

export async function changeEmail(event: H3Event) {

    const body = await readBody(event);

    const { currentEmail, newEmail, confirmedNewEmail } = body;

    // Validate presence of all required fields
    if (!currentEmail || !newEmail || !confirmedNewEmail) {
        event.res.statusCode = 400;
        consola.error(event.res.statusCode + ':' + 'Missing fields');
        return ('Missing fields');
    }

    // Check if newEmail and confirmedNewEmail match
    if (newEmail !== confirmedNewEmail) {
        event.res.statusCode = 400;
        consola.error(event.res.statusCode + ':' + 'Emails do not match');
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
};

export async function changeDisplayName(event: H3Event) {
    
    const body = await readBody(event);
    const { newName } = body;

      // Validate presence of the required field
    if (!newName) {
        event.res.statusCode = 400;
        consola.error(event.res.statusCode + ':' + 'Missing fields');
        return ('Missing fields');
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
        return ('Name is the same as the current name');
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
};

export async function deleteAccount(event: H3Event) {

    const body = await readBody(event);

    const { email, password, confirmedPassword } = body;

    // Validate presence of all required fields
    if (!email || !password || !confirmedPassword) {
        event.res.statusCode = 400;
        consola.error(event.res.statusCode + ':' + 'Missing fields');
        return ('Missing fields');
    }

    // Check if currentPassword and confirmedCurrentPassword match
    if (password !== confirmedPassword) {
        event.res.statusCode = 400;
        consola.error(event.res.statusCode + ':' + 'Passwords do not match');
        return ('Passwords do not match');
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
            return ('Invalid Email');
        }

        // Verify current password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            event.res.statusCode = 401;
            return ('Invalid password');
        }

        // Delete user from the database
        await prisma.user.delete({
            where: { id: userId },
        });
        consola.log('Account deleted, user logged out')
        return { message: 'Account deleted successfully' };
    } catch (error: any) {
        event.res.statusCode = 500;
        consola.error(event.res.statusCode + ':' + 'Account deletion failed:', error.message);
        return { message: 'Account deletion failed', error: error.message };
    }

};
