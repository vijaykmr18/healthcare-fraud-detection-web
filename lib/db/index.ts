import clientPromise from '../mongodb'
import { Db, Collection } from 'mongodb'

export class DatabaseService {
  private static instance: DatabaseService
  private db: Db | null = null

  private constructor() {}

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  async connect(): Promise<void> {
    try {
      const client = await clientPromise
      this.db = client.db('healthcare')
      console.log('Connected to database')
    } catch (error) {
      console.error('Database connection error:', error)
      throw error
    }
  }

  async getCollection<T>(name: string): Promise<Collection<T>> {
    if (!this.db) {
      await this.connect()
    }
    return this.db!.collection<T>(name)
  }

  async healthCheck(): Promise<boolean> {
    try {
      const client = await clientPromise
      await client.db('admin').command({ ping: 1 })
      return true
    } catch (error) {
      console.error('Database health check failed:', error)
      return false
    }
  }
}

export const db = DatabaseService.getInstance() 