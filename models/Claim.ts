import type { ObjectId } from "mongodb"

export interface Claim {
  _id?: ObjectId
  patientName: string
  patientDOB: string
  diagnosisCode: string
  procedureCode: string
  claimAmount: number
  providerNPI: string
  serviceDate: string
  billImageUrl?: string
  riskScore?: "low" | "medium" | "high"
  createdAt: Date
}

