import { db } from '~/server/db'
import { categories } from '~/server/db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event).id
  const body = await readBody(event)

  if (!id || isNaN(Number(id))) {
    throw createError({ statusCode: 400, statusMessage: 'Неверный ID категории' })
  }

  // Валидация имени
  if (body.name && (typeof body.name !== 'string' || !body.name.trim())) {
    throw createError({ statusCode: 400, statusMessage: 'Название не может быть пустым' })
  }

  // Запрет на редактирование категории "Без категории" (ID=1)
  if (Number(id) === 1) {
    throw createError({ 
      statusCode: 403, 
      statusMessage: 'Нельзя редактировать системную категорию "Без категории"' 
    })
  }

  const updateData: any = {}
  
  if (body.name !== undefined) {
    updateData.name = body.name.trim()
  }
  if (body.description !== undefined) {
    updateData.description = body.description?.trim() || ''
  }
  if (body.image !== undefined) {
    updateData.image = body.image || null
  }

  // Если ничего не передали для обновления
  if (Object.keys(updateData).length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Нет данных для обновления' })
  }

  const updated = await db
    .update(categories)
    .set(updateData)
    .where(eq(categories.id, Number(id)))
    .returning()

  if (updated.length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Категория не найдена' })
  }

  return updated[0]
})
