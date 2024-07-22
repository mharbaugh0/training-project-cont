const JWT_SECRET = process.env.JWT_SECRET;

export default defineEventHandler(async (event) => {
    setCookie(event, "token", "", { maxAge: -1 }); // Correctly remove the token cookie
    setCookie(event, "user", "", { maxAge: -1 }); // Correctly remove the user cookie

    return {
        success: true
    };
});
