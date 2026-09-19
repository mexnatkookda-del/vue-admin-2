export default defineEventHandler(async (event) => {
  const { password } = await readBody(event)
  const config = useRuntimeConfig()

  if (String(password) !== String(config.adminPassword)) {
    throw createError({ statusCode: 401, statusMessage: 'Неверный пароль' })
  }

  setCookie(event, 'admin_auth', 'yes')
  return { ok: true }
})