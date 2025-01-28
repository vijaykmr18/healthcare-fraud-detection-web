"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Card from "../../components/Card"
import { Button } from "@/components/ui/button"
import type { Claim } from "@/models/Claim"

export default function ClaimDetails() {
  const [claim, setClaim] = useState<Claim | null>(null)
  const params = useParams()

  useEffect(() => {
    fetchClaim()
  }, []) // Removed unnecessary dependency: params.id

  const fetchClaim = async () => {
    try {
      const response = await fetch(`/api/claims/${params.id}`)
      const data = await response.json()
      setClaim(data)
    } catch (error) {
      console.error("Error fetching claim:", error)
    }
  }

  if (!claim) {
    return <div>Loading...</div>
  }

  const getRiskScoreColor = (riskScore: "low" | "medium" | "high") => {
    switch (riskScore) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Claim Details</h1>
      <Card title={claim.patientName}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p>
              <strong>Patient DOB:</strong> {claim.patientDOB}
            </p>
            <p>
              <strong>Diagnosis Code:</strong> {claim.diagnosisCode}
            </p>
            <p>
              <strong>Procedure Code:</strong> {claim.procedureCode}
            </p>
            <p>
              <strong>Claim Amount:</strong> ${claim.claimAmount.toLocaleString()}
            </p>
            <p>
              <strong>Provider NPI:</strong> {claim.providerNPI}
            </p>
            <p>
              <strong>Service Date:</strong> {claim.serviceDate}
            </p>
            <p>
              <strong>Risk Score:</strong>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskScoreColor(claim.riskScore || "low")}`}
              >
                {claim.riskScore || "N/A"}
              </span>
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Bill Image</h4>
            {claim.billImageUrl ? (
              <img
                src={claim.billImageUrl || "/placeholder.svg"}
                alt="Bill"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            ) : (
              <p>No bill image available</p>
            )}
          </div>
        </div>
        <div className="mt-6 space-x-4">
          <Button onClick={() => console.log("Approve Claim")}>Approve Claim</Button>
          <Button variant="secondary" onClick={() => console.log("Flag for Review")}>
            Flag for Review
          </Button>
          <Button variant="secondary" onClick={() => console.log("Request Additional Information")}>
            Request Additional Information
          </Button>
        </div>
      </Card>
      <div className="mt-4">
        <Link href="/claims" className="text-primary hover:underline">
          &larr; Back to Claims List
        </Link>
      </div>
    </div>
  )
}

