import type { ObjectId } from "mongodb"

export interface HealthTip {
  _id?: ObjectId
  category: "mental" | "yoga" | "general"
  title: string
  content: string
  createdAt: Date
}

