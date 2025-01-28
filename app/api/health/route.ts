import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const isHealthy = await db.healthCheck()
    
    if (!isHealthy) {
      return NextResponse.json(
        { status: 'error', message: 'Database connection failed' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { status: 'healthy', message: 'System is operational' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      { status: 'error', message: 'System health check failed' },
      { status: 500 }
    )
  }
} 