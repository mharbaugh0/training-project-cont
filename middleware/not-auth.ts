export default defineNuxtRouteMiddleware(async () => {
  console.log('Not-Auth Middleware: Checking authentication');

  const response = await me();

  if (response.success) {
    console.log('Not-Auth Middleware: Already authenticated, redirecting to /welcome');
    return navigateTo('/welcome');
  } else {
    console.log('Not-Auth Middleware: Not authenticated');
    return true;
  }
});

const me = async () => {
  const token = useCookie('token').value || "";
  console.log('Not-Auth Middleware: Token:', token);

  if (!token) {
    console.log('Not-Auth Middleware: No token found, user is not authenticated');
    return { success: false };
  }

  return await $fetch('/api/auth/me', { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }) 
  }).then((data: any) => { 
    console.log('Not-Auth Middleware: /api/auth/me response:', data);
    // refreshCookie('token');
    // refreshCookie('user');
    return data;
  }).catch((error) => {
    console.log('Not-Auth Middleware: Error:', error);
    return { success: false };
  });
};
