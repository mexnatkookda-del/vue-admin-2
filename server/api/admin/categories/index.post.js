import { db } from '../../../db/index'
import { categories } from '../../../db/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name || !body.name.trim()) {
    throw createError({ statusCode: 400, message: 'Название обязательно' })
  }

  const result = db.insert(categories).values({
    name: body.name.trim(),
    description: body.description || null,
    image: body.image || null,
    createdAt: new Date()
  }).run()

  return { id: result.lastInsertRowid }
})