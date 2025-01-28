import clientPromise from './mongodb'

export async function initDatabase() {
  try {
    const client = await clientPromise
    const db = client.db("healthcare")

    // Create collections if they don't exist
    await db.createCollection("claims")
    await db.createCollection("users")

    // Create indexes
    await db.collection("claims").createIndex({ createdAt: -1 })
    await db.collection("users").createIndex({ email: 1 }, { unique: true })

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Failed to initialize database:", error)
    throw error
  }
} 