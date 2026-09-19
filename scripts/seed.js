import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { categories, products } from '../server/db/schema.js'

const sqlite = new Database('sqlite.db')
const db = drizzle(sqlite)

const existing = db.select().from(categories).all()
if (existing.length > 0) {
  console.log('База уже заполнена, сидер пропущен')
  process.exit(0)
}

db.insert(categories).values([
  { id: 1, name: 'Без категории', description: 'Сюда попадают товары без категории', image: null, createdAt: new Date() },
  { name: 'Одежда', description: 'Основная коллекция', image: 'cloth.jpg', createdAt: new Date() },
  { name: 'Аксессуары', description: null, image: 'acc.jpg', createdAt: new Date() }
]).run()

db.insert(products).values([
  { name: 'Футболка базовая', price: 1500, sku: 'TSH-001', description: 'Хлопок 100%', inStock: true, images: '["tshirt-1.jpg","tshirt-2.jpg"]', categoryId: 2, createdAt: new Date() },
  { name: 'Джинсы', price: 4500, sku: 'JNS-014', description: null, inStock: true, images: '[]', categoryId: 2, createdAt: new Date() },
  { name: 'Ремень', price: 900, sku: 'BEL-002', description: 'Кожа', inStock: false, images: '["belt.jpg"]', categoryId: 3, createdAt: new Date() }
]).run()

console.log('Демо-данные добавлены')