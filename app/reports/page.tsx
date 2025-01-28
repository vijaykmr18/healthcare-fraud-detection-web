"use client"

import { useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import Card from "../components/Card"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Reports() {
  const [reportType, setReportType] = useState("fraudByRegion")

  const fraudByRegionData = {
    labels: ["North", "South", "East", "West", "Central"],
    datasets: [
      {
        label: "Fraudulent Claims",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "#3b82f6",
      },
    ],
  }

  const fraudByTreatmentData = {
    labels: ["Surgery", "Medication", "Therapy", "Diagnostics", "Other"],
    datasets: [
      {
        label: "Fraudulent Claims",
        data: [8, 15, 5, 12, 3],
        backgroundColor: "#3b82f6",
      },
    ],
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <Card title="Fraud Analysis">
        <div className="mb-4">
          <label htmlFor="reportType" className="block mb-2">
            Select Report Type:
          </label>
          <select id="reportType" value={reportType} onChange={(e) => setReportType(e.target.value)} className="input">
            <option value="fraudByRegion">Fraud by Region</option>
            <option value="fraudByTreatment">Fraud by Treatment Type</option>
          </select>
        </div>
        <div className="h-64">
          {reportType === "fraudByRegion" ? (
            <Bar
              data={fraudByRegionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { title: { display: true, text: "Fraud by Region" } },
              }}
            />
          ) : (
            <Bar
              data={fraudByTreatmentData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { title: { display: true, text: "Fraud by Treatment Type" } },
              }}
            />
          )}
        </div>
      </Card>
    </div>
  )
}

