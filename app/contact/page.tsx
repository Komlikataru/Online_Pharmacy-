"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, HeadphonesIcon, Home } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  })

  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock form submission
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    })
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      message: "",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-600 to-sky-800 text-white py-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-sky-100">
              We're here to help! Get in touch with our team for any questions, concerns, or support needs.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild className="hover:bg-sky-50 transition-all duration-300">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Our customer support team is available 24/7 to assist you with any questions or concerns.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sky-100 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone Support</h3>
                      <p className="text-gray-600 text-sm mb-2">Call us for immediate assistance</p>
                      <p className="font-medium text-sky-600">+1 (555) 123-4567</p>
                      <p className="text-xs text-gray-500">Available 24/7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sky-100 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
                      <p className="text-gray-600 text-sm mb-2">Send us a detailed message</p>
                      <p className="font-medium text-sky-600">support@medicareplus.com</p>
                      <p className="text-xs text-gray-500">Response within 2 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sky-100 p-3 rounded-lg">
                      <MessageCircle className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Live Chat</h3>
                      <p className="text-gray-600 text-sm mb-2">Chat with our support team</p>
                      <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-sky-100 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Visit Our Office</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        123 Health Street
                        <br />
                        New York, NY 10001
                        <br />
                        United States
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>Mon-Fri: 9AM-6PM EST</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Contact */}
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-lg">
                    <HeadphonesIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-900 mb-1">Emergency Support</h3>
                    <p className="text-red-700 text-sm mb-2">
                      For urgent medical questions or prescription emergencies
                    </p>
                    <p className="font-medium text-red-600">+1 (555) 911-HELP</p>
                    <p className="text-xs text-red-500">Available 24/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="mr-2 h-5 w-5" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="order">Order Support</SelectItem>
                          <SelectItem value="prescription">Prescription Help</SelectItem>
                          <SelectItem value="technical">Technical Issue</SelectItem>
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Please provide as much detail as possible..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Before contacting us:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>
                        • Check our{" "}
                        <a href="/help" className="underline">
                          FAQ section
                        </a>{" "}
                        for quick answers
                      </li>
                      <li>• Have your order number ready if asking about an order</li>
                      <li>• For prescription questions, have your prescription details available</li>
                    </ul>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-sky-600 hover:bg-sky-700">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Find Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Interactive map would be embedded here</p>
                  <p className="text-sm">123 Health Street, New York, NY 10001</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
