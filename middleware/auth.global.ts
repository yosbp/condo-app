import type { User } from '~/types/User';

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const user = (JSON.parse(localStorage.getItem('user') as string) as User) || null;
    const token = localStorage.getItem('token');

    if (to.path !== '/login' && to.path !== '/register' && (!user || !token)) { // If the user is not logged in and tries to access a page that requires authentication, redirect to the login page
      return navigateTo('/login'); // Redirect to the login page
    } else if ((to.path === '/login' || to.path === '/register') && user && token) { // If the user is logged in and tries to access the login or register page, redirect to the home page
      if (user.role === 'administrator') { // If the user is an administrator, redirect to the admin page
        return navigateTo('/admin'); // Redirect to the admin page
      } else { // If the user is not an administrator, redirect to the user page
        return navigateTo('/user'); // Redirect to the user page
      }
    } else { 
      return; // If the user is logged in and tries to access a page that does not require authentication, allow access
    }
  }
});
