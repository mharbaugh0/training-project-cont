import { defineEventHandler, readBody } from 'h3';
import { deleteAccount } from '../controllers/settingsController';


export default defineEventHandler(async (event) => {

    //Check if the request method is DELETE
    if (event.req.method !== 'DELETE') {
        event.res.statusCode = 405;
        console.log(event.res.statusCode + ':' + 'Method not allowed');
        return { message: 'Method not allowed' };
    }

    const body = await readBody(event);

    // Check if the request body contains the required fields
    if ('email' in body && 'password' in body && 'confirmedPassword' in body) {
        return deleteAccount(event);
    } else {
        event.res.statusCode = 400;
    }
});