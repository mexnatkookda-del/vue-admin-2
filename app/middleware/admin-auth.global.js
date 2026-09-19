export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/admin/login') return

  if (to.path.startsWith('/admin')) {
    const auth = useCookie('admin_auth')

    if (!auth.value) {
      return navigateTo('/admin/login')
    }
  }
})