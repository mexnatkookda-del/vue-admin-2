import { db } from '../../../db/index'
import { categories, products } from '../../../db/schema'
import { count, eq } from 'drizzle-orm'

export default defineEventHandler(async () => {
  return db
    .select({
      id: categories.id,
      name: categories.name,
      description: categories.description,
      images: categories.images,
      createdAt: categories.createdAt,
      productsCount: count(products.id)
    })
    .from(categories)
    .leftJoin(products, eq(products.categoryId, categories.id))
    .groupBy(categories.id)
    .all()
})