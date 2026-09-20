import { db } from '../../../db/index'
import { categories, products } from '../../../db/schema'
import { sql, desc, asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  // Получаем параметры сортировки из query параметров
  // ?sortBy=name|createdAt|productCount&order=asc|desc
  const sortBy = query.sortBy || 'createdAt'
  const order = query.order || 'desc'

  // Определяем поле и направление сортировки
  let sortField

  if (sortBy === 'name') {
    sortField = order === 'asc' ? asc(categories.name) : desc(categories.name)
  } else if (sortBy === 'productCount') {
    // Для сортировки по количеству товаров используем то же выражение COUNT
    sortField = order === 'asc' 
      ? asc(sql`COUNT(${products.id})`)
      : desc(sql`COUNT(${products.id})`)
  } else {
    // По умолчанию createdAt
    sortField = order === 'asc' ? asc(categories.createdAt) : desc(categories.createdAt)
  }

  const result = await db
    .select({
      id: categories.id,
      name: categories.name,
      description: categories.description,
      image: categories.image,
      createdAt: categories.createdAt,
      productCount: sql`COUNT(${products.id})`.as('product_count')
    })
    .from(categories)
    .leftJoin(products, sql`${categories.id} = ${products.categoryId}`)
    .groupBy(categories.id)
    .orderBy(sortField)
    .all()

  return result
})