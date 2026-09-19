import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './server/db/schema.js',
  dbCredentials: {
    url: './sqlite.db'
  }
})