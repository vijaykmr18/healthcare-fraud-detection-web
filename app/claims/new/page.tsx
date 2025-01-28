"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Card from "../../components/Card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const claimSchema = z.object({
  patientName: z.string().min(2, "Patient name must be at least 2 characters"),
  patientDOB: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  diagnosisCode: z.string().regex(/^[A-Z]\d{2}(\.\d{1,2})?$/, "Invalid ICD-10 code format"),
  procedureCode: z.string().regex(/^\d{5}$/, "Invalid CPT code format"),
  claimAmount: z.number().positive("Claim amount must be positive"),
  providerNPI: z.string().regex(/^\d{10}$/, "Invalid NPI format"),
  serviceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  billImage: z.instanceof(File).optional(),
})

type ClaimFormData = z.infer<typeof claimSchema>

export default function NewClaim() {
  const router = useRouter()
  const form = useForm<ClaimFormData>({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      patientName: "",
      patientDOB: "",
      diagnosisCode: "",
      procedureCode: "",
      claimAmount: 0,
      providerNPI: "",
      serviceDate: "",
    },
  })

  const onSubmit = async (data: ClaimFormData) => {
    try {
      // Here you would typically call your API to submit the claim
      console.log("Submitting claim:", data)
      // For demo purposes, we'll just redirect to the claims list
      router.push("/claims")
    } catch (error) {
      console.error("Error submitting claim:", error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Submit New Claim</h1>
      <Card title="Claim Details">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patientDOB"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Date of Birth</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diagnosisCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diagnosis Code (ICD-10)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., A00.0" />
                  </FormControl>
                  <FormDescription>Enter a valid ICD-10 code</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="procedureCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Procedure Code (CPT)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., 99213" />
                  </FormControl>
                  <FormDescription>Enter a valid 5-digit CPT code</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="claimAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Claim Amount</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.01" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="providerNPI"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provider NPI</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="10-digit NPI" />
                  </FormControl>
                  <FormDescription>Enter the provider's 10-digit National Provider Identifier</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Service</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Bill Image</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit Claim
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}

