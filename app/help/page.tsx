"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  HelpCircle,
  Phone,
  Mail,
  MessageCircle,
  Truck,
  CreditCard,
  Shield,
  Clock,
  ChevronRight,
  Home,
} from "lucide-react"
import Link from "next/link"

const faqCategories = [
  {
    id: "orders",
    name: "Orders & Delivery",
    icon: Truck,
    count: 12,
  },
  {
    id: "payments",
    name: "Payments & Billing",
    icon: CreditCard,
    count: 8,
  },
  {
    id: "prescriptions",
    name: "Prescriptions",
    icon: Shield,
    count: 15,
  },
  {
    id: "account",
    name: "Account & Profile",
    icon: HelpCircle,
    count: 6,
  },
]

const faqs = [
  {
    category: "orders",
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 5-7 business days. Express delivery (2-3 days) and overnight delivery options are also available. Free standard delivery is available on orders over $25.",
  },
  {
    category: "orders",
    question: "Can I track my order?",
    answer:
      "Yes! Once your order ships, you'll receive a tracking number via email and SMS. You can also track your order in real-time through your account dashboard.",
  },
  {
    category: "orders",
    question: "What if my order is damaged or incorrect?",
    answer:
      "We apologize for any inconvenience. Please contact our customer support within 48 hours of delivery. We'll arrange for a replacement or full refund at no cost to you.",
  },
  {
    category: "orders",
    question: "Can I cancel or modify my order?",
    answer:
      "Orders can be cancelled or modified within 1 hour of placement. After that, please contact customer support as soon as possible. We'll do our best to accommodate changes before shipping.",
  },
  {
    category: "payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and HSA/FSA cards for eligible purchases.",
  },
  {
    category: "payments",
    question: "Is my payment information secure?",
    answer:
      "Absolutely. We use industry-standard SSL encryption and are PCI DSS compliant. Your payment information is never stored on our servers and is processed through secure payment gateways.",
  },
  {
    category: "payments",
    question: "Do you offer payment plans?",
    answer:
      "For orders over $100, we offer flexible payment plans through our partner Affirm. You can choose to pay in 3, 6, or 12 monthly installments with competitive rates.",
  },
  {
    category: "prescriptions",
    question: "How do I upload my prescription?",
    answer:
      "You can upload your prescription during checkout by taking a clear photo or scanning the document. Our pharmacists will verify it within 2 hours during business hours.",
  },
  {
    category: "prescriptions",
    question: "Can you transfer my prescription from another pharmacy?",
    answer:
      "Yes! We can transfer most prescriptions. Just provide us with your current pharmacy's information and prescription details. The transfer usually takes 24-48 hours.",
  },
  {
    category: "prescriptions",
    question: "What if my prescription expires?",
    answer:
      "If your prescription has expired, you'll need a new one from your doctor. We offer online consultations with licensed physicians who can review your medical history and issue new prescriptions when appropriate.",
  },
  {
    category: "prescriptions",
    question: "Do you offer automatic refills?",
    answer:
      "Yes! You can set up automatic refills for your maintenance medications. We'll notify you before each refill and ship your medication so you never run out.",
  },
  {
    category: "account",
    question: "How do I create an account?",
    answer:
      'Click "Sign Up" in the top right corner and provide your basic information. You\'ll receive a verification email to activate your account. Creating an account allows you to track orders, save prescriptions, and access exclusive offers.',
  },
  {
    category: "account",
    question: "I forgot my password. How do I reset it?",
    answer:
      "Click \"Forgot Password\" on the login page and enter your email address. You'll receive a password reset link within a few minutes. If you don't see it, check your spam folder.",
  },
  {
    category: "account",
    question: "How do I update my profile information?",
    answer:
      'Log into your account and go to "Profile Settings." You can update your personal information, shipping addresses, payment methods, and communication preferences.',
  },
]

const quickHelp = [
  {
    title: "Order Status",
    description: "Check the status of your current orders",
    icon: Truck,
    action: "Track Order",
  },
  {
    title: "Prescription Upload",
    description: "Upload a new prescription quickly",
    icon: Shield,
    action: "Upload Now",
  },
  {
    title: "Live Chat",
    description: "Chat with our support team",
    icon: MessageCircle,
    action: "Start Chat",
  },
  {
    title: "Call Support",
    description: "24/7 phone support available",
    icon: Phone,
    action: "Call Now",
  },
]

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-600 to-sky-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">How Can We Help You?</h1>
            <p className="text-xl text-sky-100 mb-8">
              Find answers to common questions or get in touch with our support team.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                className="pl-12 pr-4 py-3 text-lg bg-white text-gray-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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
        {/* Quick Help Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Help</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickHelp.map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer hover-lift bg-white/90 backdrop-blur-sm border-sky-100"
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-sky-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-sky-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
                    {item.action}
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* FAQ Categories Sidebar */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 mb-4">Browse by Category</h3>

            <Button
              variant={selectedCategory === "all" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedCategory("all")}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              All Categories
              <Badge variant="secondary" className="ml-auto">
                {faqs.length}
              </Badge>
            </Button>

            {faqCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon className="mr-2 h-4 w-4" />
                {category.name}
                <Badge variant="secondary" className="ml-auto">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                {filteredFaqs.length} article{filteredFaqs.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {filteredFaqs.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search terms or browse a different category.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                    }}
                  >
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Contact Support Section */}
        <section className="mt-16">
          <Card className="bg-gradient-to-r from-sky-50 to-blue-50 border-sky-200">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Our customer support team is available 24/7 to help you with any
                questions or concerns.
              </p>

              <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <Button size="lg" className="bg-sky-600 hover:bg-sky-700">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Support
                </Button>
                <Button size="lg" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Us
                </Button>
                <Button size="lg" variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Live Chat
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span>Secure & Private</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
