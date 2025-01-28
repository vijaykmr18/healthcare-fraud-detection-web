import * as tf from "@tensorflow/tfjs"

let model: tf.LayersModel | null = null

export async function loadModel() {
  if (typeof window === "undefined") return // Skip on server-side

  try {
    // In production, you should load from a proper model endpoint
    model = await tf.loadLayersModel("/model/model.json")
    console.log("Model loaded successfully")
  } catch (error) {
    console.error("Error loading model:", error)
    model = null
  }
}

export function assessClaimRisk(
  claimAmount: number,
  diagnosisCode: string,
  procedureCode: string,
): "low" | "medium" | "high" {
  return fallbackRiskAssessment(claimAmount, diagnosisCode, procedureCode)
}

function fallbackRiskAssessment(
  claimAmount: number,
  diagnosisCode: string,
  procedureCode: string,
): "low" | "medium" | "high" {
  if (claimAmount > 5000) return "high"
  if (claimAmount > 2000) return "medium"
  return "low"
}

