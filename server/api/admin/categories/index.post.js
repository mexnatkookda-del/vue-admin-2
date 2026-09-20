import { db } from '~/server/db'
import { categories } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Простая валидация
  if (!body.name || typeof body.name !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Название категории обязательно'
    })
  }

  const newCategory = await db.insert(categories).values({
    name: body.name.trim(),
    description: body.description?.trim() || '',
    image: body.image || null,
    createdAt: new Date()
  }).returning()

  return newCategory[0]
})
