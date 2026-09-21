import { db } from '../../../db/index'
import { categories, products } from '../../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (id === 1) {
    throw createError({ statusCode: 400, message: 'Эту категорию удалить нельзя' })
  }

  // перевешиваем товары на "Без категории", затем удаляем
  db.update(products).set({ categoryId: 1 }).where(eq(products.categoryId, id)).run()
  db.delete(categories).where(eq(categories.id, id)).run()

  return { ok: true }
})