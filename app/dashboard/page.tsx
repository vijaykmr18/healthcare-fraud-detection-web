"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bar, Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"
import Card from "../components/Card"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export default function Dashboard() {
  const [fraudStats, setFraudStats] = useState({
    totalClaims: 0,
    fraudulentClaims: 0,
    totalAmount: 0,
    fraudulentAmount: 0,
  })

  const [topDiagnoses, setTopDiagnoses] = useState<{ [key: string]: number }>({})
  const [claimsBySpecialty, setClaimsBySpecialty] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    setFraudStats({
      totalClaims: 1000,
      fraudulentClaims: 50,
      totalAmount: 1000000,
      fraudulentAmount: 75000,
    })

    setTopDiagnoses({
      I10: 150, // Essential (primary) hypertension
      "E11.9": 120, // Type 2 diabetes mellitus without complications
      "J02.9": 100, // Acute pharyngitis, unspecified
      "M54.5": 80, // Low back pain
      R51: 70, // Headache
    })

    setClaimsBySpecialty({
      "Internal Medicine": 300,
      "Family Practice": 250,
      Cardiology: 150,
      Orthopedics: 100,
      Pediatrics: 200,
    })
  }, [])

  const claimsData = {
    labels: ["Total Claims", "Fraudulent Claims"],
    datasets: [
      {
        label: "Number of Claims",
        data: [fraudStats.totalClaims, fraudStats.fraudulentClaims],
        backgroundColor: ["#3b82f6", "#ef4444"],
      },
    ],
  }

  const topDiagnosesData = {
    labels: Object.keys(topDiagnoses),
    datasets: [
      {
        label: "Number of Claims",
        data: Object.values(topDiagnoses),
        backgroundColor: ["#3b82f6", "#22c55e", "#eab308", "#ef4444", "#8b5cf6"],
      },
    ],
  }

  const claimsBySpecialtyData = {
    labels: Object.keys(claimsBySpecialty),
    datasets: [
      {
        label: "Number of Claims",
        data: Object.values(claimsBySpecialty),
        backgroundColor: ["#3b82f6", "#22c55e", "#eab308", "#ef4444", "#8b5cf6"],
      },
    ],
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Fraud Statistics">
          <div className="space-y-2">
            <p>Total Claims: {fraudStats.totalClaims}</p>
            <p>Fraudulent Claims: {fraudStats.fraudulentClaims}</p>
            <p>Total Amount: ${fraudStats.totalAmount.toLocaleString()}</p>
            <p>Fraudulent Amount: ${fraudStats.fraudulentAmount.toLocaleString()}</p>
          </div>
        </Card>
        <Card title="Claims Overview">
          <Bar data={claimsData} options={{ responsive: true, maintainAspectRatio: false }} />
        </Card>
        <Card title="Top 5 Diagnoses">
          <Doughnut data={topDiagnosesData} options={{ responsive: true, maintainAspectRatio: false }} />
        </Card>
        <Card title="Claims by Specialty">
          <Bar data={claimsBySpecialtyData} options={{ responsive: true, maintainAspectRatio: false }} />
        </Card>
      </div>
      <div className="flex space-x-4">
        <Link href="/claims/new" className="btn btn-primary">
          Submit New Claim
        </Link>
        <Link href="/claims" className="btn btn-secondary">
          View All Claims
        </Link>
      </div>
    </div>
  )
}

