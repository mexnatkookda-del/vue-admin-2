import { db } from '../../../db/index'
import { categories } from '../../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)

  if (id === 1) {
    throw createError({ statusCode: 400, message: 'Эту категорию редактировать нельзя' })
  }

  if (!body.name || !body.name.trim()) {
    throw createError({ statusCode: 400, message: 'Название обязательно' })
  }

  db.update(categories).set({
    name: body.name.trim(),
    description: body.description || null,
    image: body.image || null
  }).where(eq(categories.id, id)).run()

  return { ok: true }
})