"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Upload, FileText, CheckCircle, AlertCircle, ChevronRight, Home, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"
import { useToast } from "@/components/ui/use-toast"

export default function UploadPrescriptionPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files)
      const validFiles = newFiles.filter(
        (file) => file.type === "image/jpeg" || file.type === "image/png" || file.type === "application/pdf",
      )

      if (validFiles.length !== newFiles.length) {
        toast({
          title: "Invalid file type",
          description: "Only JPG, PNG and PDF files are allowed",
          variant: "destructive",
        })
      }

      setFiles((prev) => [...prev, ...validFiles])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (files.length === 0) {
      toast({
        title: "No prescription uploaded",
        description: "Please upload at least one prescription",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Prescription submitted successfully",
      description: "We will process your prescription and contact you soon",
    })

    // In a real app, you would upload the files and form data to your server here

    // Redirect to home page after 2 seconds
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  const steps = [
    { id: 1, title: "Upload Prescription", icon: Upload },
    { id: 2, title: "Patient Information", icon: FileText },
    { id: 3, title: "Review & Submit", icon: CheckCircle },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar variant="inset" collapsible="icon" className="hidden md:flex">
          <SidebarHeader className="p-4">
            <h2 className="font-heading text-xl font-bold text-gradient">Upload Prescription</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Steps</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {steps.map((s) => (
                    <SidebarMenuItem key={s.id}>
                      <SidebarMenuButton isActive={step === s.id} onClick={() => setStep(s.id)}>
                        <s.icon className="h-5 w-5" />
                        <span>{s.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-8">
              <SidebarGroupLabel>Help</SidebarGroupLabel>
              <SidebarGroupContent className="p-4 bg-sky-50 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-sky-600 mr-2 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      Upload clear images of your prescription for accurate processing
                    </p>
                  </div>
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-sky-600 mr-2 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      Make sure all details on the prescription are clearly visible
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-sky-600 mr-2 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      Need help? Call us at <span className="font-semibold">+91 1234 567 890</span>
                    </p>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <div className="container max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-heading font-bold text-gradient">Upload Prescription</h1>
              <Link href="/">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>Back to Home</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Steps */}
            <div className="flex items-center justify-between mb-8 md:hidden">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step === s.id
                        ? "bg-sky-600 text-white"
                        : step > s.id
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step > s.id ? <CheckCircle className="h-5 w-5" /> : s.id}
                  </div>
                  {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />}
                </div>
              ))}
            </div>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-sky-700">
                  {step === 1 && "Upload Your Prescription"}
                  {step === 2 && "Patient Information"}
                  {step === 3 && "Review & Submit"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Upload clear images of your prescription for accurate processing"}
                  {step === 2 && "Please provide your contact details"}
                  {step === 3 && "Review your information and submit"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-4">
                      <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center ${
                          isDragging ? "border-sky-500 bg-sky-50" : "border-gray-300"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <div className="flex flex-col items-center">
                          <Upload className="h-12 w-12 text-sky-500 mb-4 animate-bounce-soft" />
                          <h3 className="font-heading text-lg font-semibold mb-2">
                            Drag & Drop your prescription here
                          </h3>
                          <p className="text-gray-500 mb-4">or click to browse from your device</p>
                          <Label
                            htmlFor="prescription-upload"
                            className="cursor-pointer bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-colors"
                          >
                            Browse Files
                          </Label>
                          <Input
                            id="prescription-upload"
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <p className="text-xs text-gray-500 mt-4">Supported formats: JPG, PNG, PDF (Max 5MB each)</p>
                        </div>
                      </div>

                      {files.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-heading font-medium mb-3">Uploaded Files</h4>
                          <div className="space-y-2">
                            {files.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                <div className="flex items-center">
                                  <FileText className="h-5 w-5 text-sky-600 mr-2" />
                                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                </div>
                                <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Delivery Address</Label>
                        <Textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Enter your complete delivery address"
                          rows={3}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Any specific instructions or information"
                          rows={2}
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-heading font-semibold text-lg">Prescription Files</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                          {files.length > 0 ? (
                            <ul className="space-y-2">
                              {files.map((file, index) => (
                                <li key={index} className="flex items-center">
                                  <FileText className="h-5 w-5 text-sky-600 mr-2" />
                                  <span className="text-sm">{file.name}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-red-500">No files uploaded</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-heading font-semibold text-lg">Patient Information</h3>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Name</dt>
                              <dd className="font-medium">{formData.name || "Not provided"}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Phone</dt>
                              <dd className="font-medium">{formData.phone || "Not provided"}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Email</dt>
                              <dd className="font-medium">{formData.email || "Not provided"}</dd>
                            </div>
                            <div className="md:col-span-2">
                              <dt className="text-sm font-medium text-gray-500">Address</dt>
                              <dd className="font-medium">{formData.address || "Not provided"}</dd>
                            </div>
                            {formData.notes && (
                              <div className="md:col-span-2">
                                <dt className="text-sm font-medium text-gray-500">Notes</dt>
                                <dd>{formData.notes}</dd>
                              </div>
                            )}
                          </dl>
                        </div>
                      </div>

                      <div className="bg-sky-50 p-4 rounded-md border border-sky-100">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-sky-600 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-700">
                              By submitting this form, you agree to our terms and conditions. Our pharmacist will review
                              your prescription and contact you for confirmation.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>

              <CardFooter className="flex justify-between">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                    Previous
                  </Button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <Button type="button" onClick={() => setStep(step + 1)}>
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
                  >
                    Submit Prescription
                  </Button>
                )}
              </CardFooter>
            </Card>

            <div className="mt-8 bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="font-heading font-semibold text-lg mb-4">Why Choose Our Prescription Service?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4 hover-lift">
                  <div className="bg-sky-100 p-3 rounded-full mb-4">
                    <CheckCircle className="h-6 w-6 text-sky-600" />
                  </div>
                  <h4 className="font-heading font-medium mb-2">Authentic Medicines</h4>
                  <p className="text-sm text-gray-600">We source medicines directly from authorized distributors</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 hover-lift">
                  <div className="bg-sky-100 p-3 rounded-full mb-4">
                    <CheckCircle className="h-6 w-6 text-sky-600" />
                  </div>
                  <h4 className="font-heading font-medium mb-2">Pharmacist Verification</h4>
                  <p className="text-sm text-gray-600">All prescriptions are verified by qualified pharmacists</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 hover-lift">
                  <div className="bg-sky-100 p-3 rounded-full mb-4">
                    <CheckCircle className="h-6 w-6 text-sky-600" />
                  </div>
                  <h4 className="font-heading font-medium mb-2">Secure Delivery</h4>
                  <p className="text-sm text-gray-600">Medicines delivered in tamper-proof packaging</p>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
