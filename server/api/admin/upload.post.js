import { randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  const files = (parts || []).filter(part => part.name === 'images' && part.filename)

  if (files.length === 0) {
    throw createError({ statusCode: 400, message: 'Нет файлов для загрузки' })
  }

  const uploadsDir = join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadsDir, { recursive: true })

  const uploadedPaths = []

  for (const file of files) {
    const ext = extname(file.filename).toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      throw createError({ statusCode: 400, message: `Недопустимый формат файла: ${file.filename}` })
    }

    const savedName = `${randomUUID()}${ext}`
    await writeFile(join(uploadsDir, savedName), file.data)
    uploadedPaths.push(`/uploads/${savedName}`)
  }

  return { paths: uploadedPaths }
})