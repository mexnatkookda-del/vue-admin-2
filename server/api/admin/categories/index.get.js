import { db } from '../../../db/index'
import { categories, products } from '../../../db/schema'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const result = await db
    .select({
      id: categories.id,
      name: categories.name,
      description: categories.description,
      image: categories.image,
      createdAt: categories.createdAt,
      productCount: sql<number>`COUNT(${products.id})`.as('product_count')
    })
    .from(categories)
    .leftJoin(products, sql`${categories.id} = ${products.categoryId}`)
    .groupBy(categories.id)
    .all()

  return result
})