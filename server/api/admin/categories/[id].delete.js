import { eq } from 'drizzle-orm'
import { db } from '../../../db/index'
import { categories, products } from '../../../db/schema'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Не указан ID' })
  }

  // Нельзя удалить категорию "без категории" (ID=1)
  if (id === 1) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'Нельзя удалить категорию "без категории"' 
    })
  }

  // Проверяем, есть ли продукты в этой категории
  const categoryProducts = await db.query.products.findMany({
    where: eq(products.categoryId, id)
  })

  // Если есть продукты, переносим их в категорию "без категории" (ID=1)
  if (categoryProducts.length > 0) {
    await db
      .update(products)
      .set({ categoryId: 1 })
      .where(eq(products.categoryId, id))
  }

  // Удаляем категорию
  await db.delete(categories).where(eq(categories.id, id))

  return { ok: true }
})
