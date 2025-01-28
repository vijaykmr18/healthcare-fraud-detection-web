"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Card from "../components/Card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Claim } from "@/models/Claim"

export default function Claims() {
  const [claims, setClaims] = useState<Claim[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 10

  useEffect(() => {
    fetchClaims()
  }, []) // Removed currentPage dependency

  const fetchClaims = async () => {
    try {
      const response = await fetch(`/api/claims?page=${currentPage}&pageSize=${pageSize}`)
      const data = await response.json()
      setClaims(data.claims)
      setTotalPages(Math.ceil(data.total / pageSize))
    } catch (error) {
      console.error("Error fetching claims:", error)
    }
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Claims</h1>
        <Link href="/claims/new" className="btn btn-primary">
          Submit New Claim
        </Link>
      </div>
      <Card title="All Claims">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Diagnosis Code</TableHead>
              <TableHead>Procedure Code</TableHead>
              <TableHead>Claim Amount</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims.map((claim) => (
              <TableRow key={claim._id?.toString()}>
                <TableCell>{claim.patientName}</TableCell>
                <TableCell>{claim.diagnosisCode}</TableCell>
                <TableCell>{claim.procedureCode}</TableCell>
                <TableCell>${claim.claimAmount.toLocaleString()}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskScoreColor(claim.riskScore || "low")}`}
                  >
                    {claim.riskScore || "N/A"}
                  </span>
                </TableCell>
                <TableCell>
                  <Link href={`/claims/${claim._id}`} className="text-primary hover:underline">
                    View Details
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mt-4">
          <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  )
}

