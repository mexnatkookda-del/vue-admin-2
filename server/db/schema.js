import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  images: text('images').notNull().default('[]'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
})

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  sku: text('sku'),
  inStock: integer('in_stock', { mode: 'boolean' }).notNull().default(false),
  images: text('images').notNull().default('[]'),
  categoryId: integer('category_id').notNull().references(() => categories.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
})