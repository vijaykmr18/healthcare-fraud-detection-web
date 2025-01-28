import { initDatabase } from '@/lib/init-db'

async function main() {
  try {
    await initDatabase()
    process.exit(0)
  } catch (error) {
    console.error('Failed to initialize database:', error)
    process.exit(1)
  }
}

main() 