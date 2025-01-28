"use client"

import { useState } from "react"
import Card from "../components/Card"
import { Input } from "@/components/ui/input"

const resources = [
  {
    title: "CDC ICD-10-CM Official Guidelines",
    description: "Official guidelines for ICD-10-CM coding and reporting.",
    url: "https://www.cdc.gov/nchs/icd/icd10cm.htm",
    category: "Coding",
  },
  {
    title: "CMS Medicare Claims Processing Manual",
    description: "Comprehensive guide for processing Medicare claims.",
    url: "https://www.cms.gov/Regulations-and-Guidance/Guidance/Manuals/Internet-Only-Manuals-IOMs-Items/CMS018912",
    category: "Billing",
  },
  {
    title: "AAFP Chronic Care Management Toolkit",
    description: "Resources for managing patients with chronic conditions.",
    url: "https://www.aafp.org/family-physician/practice-and-career/managing-your-practice/chronic-care-management.html",
    category: "Clinical",
  },
  {
    title: "OIG Compliance Program Guidance",
    description: "Guidance for healthcare providers on compliance programs.",
    url: "https://oig.hhs.gov/compliance/compliance-guidance/",
    category: "Compliance",
  },
  {
    title: "HIPAA Privacy Rule",
    description: "Official HHS guidance on the HIPAA Privacy Rule.",
    url: "https://www.hhs.gov/hipaa/for-professionals/privacy/index.html",
    category: "Compliance",
  },
]

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Medical Resources & Guidelines</h1>
      <Input
        type="text"
        placeholder="Search resources..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((resource, index) => (
          <Card key={index} title={resource.title}>
            <p className="mb-2">{resource.description}</p>
            <p className="text-sm text-blue-600 mb-2">Category: {resource.category}</p>
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Visit Resource
            </a>
          </Card>
        ))}
      </div>
    </div>
  )
}

