import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "10")

    const client = await clientPromise
    const db = client.db("healthcare")
    
    const skip = (page - 1) * pageSize
    
    const claims = await db
      .collection("claims")
      .find({})
      .skip(skip)
      .limit(pageSize)
      .toArray()

    const total = await db.collection("claims").countDocuments()

    return NextResponse.json({ claims, total })
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch claims" },
      { status: 500 }
    )
  }
} 