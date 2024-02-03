export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (to.path !== '/login' && to.path !== '/register' && (!user || !token)) {
      return navigateTo('/login');
    } else if ((to.path === '/login' || to.path === '/register') && user && token){
      return navigateTo('/');
    }else {
      return;
    }
  }
});
