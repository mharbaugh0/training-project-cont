export default defineNuxtRouteMiddleware(async () => {
  console.log('Auth Middleware: Checking authentication');

  const response = await me();
  console.log('Auth Middleware: /api/auth/me response:', response); // Log the response

  if (!response.success) { 
    console.log('Auth Middleware: Not authenticated, redirecting to /login');
    return navigateTo('/login');
  } else {
    console.log('Auth Middleware: Authenticated');
    return true;
  }
});

const me = async () => {
  const token = useCookie('token').value || "";
  console.log('Auth Middleware: Token:', token);

  if (!token) {
    console.log('Token is missing in the cookie');
    return { success: false, message: 'Token is missing' };
  }

  return await $fetch('/api/auth/me', { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }) 
  }).then((data: any) => { 
    console.log('Auth Middleware: /api/auth/me response:', data);

    // refreshCookie('token');
    // refreshCookie('user');
    return data;
  }).catch((error) => {
    console.log('Auth Middleware: Error:', error);

    return {
      success: false,
      message: error.message
    };
  });
}
