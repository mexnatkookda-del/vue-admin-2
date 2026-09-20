import { eq } from 'drizzle-orm'
import { db } from '../../db/index'
import { categories } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Не указан ID' })
  }

  await db.delete(categories).where(eq(categories.id, Number(id)))

  return { ok: true }
})