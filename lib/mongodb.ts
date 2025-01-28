import { MongoClient, MongoClientOptions } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

const uri = process.env.MONGODB_URI
const options: MongoClientOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  retryWrites: true,
  retryReads: true,
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

class Singleton {
  private static _instance: Promise<MongoClient>

  static getInstance(): Promise<MongoClient> {
    if (!this._instance) {
      const client = new MongoClient(uri, options)
      this._instance = client.connect()
        .then(client => {
          console.log('Connected to MongoDB')
          return client
        })
        .catch(err => {
          console.error('Failed to connect to MongoDB:', err)
          throw err
        })
    }
    return this._instance
  }
}

const clientPromise = process.env.NODE_ENV === 'development' 
  ? global._mongoClientPromise || (global._mongoClientPromise = Singleton.getInstance())
  : Singleton.getInstance()

export default clientPromise

