import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Truck, Clock, Users, Award, Heart, Phone, Mail, Home } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  {
    name: "Dr. Sarah Johnson",
    role: "Chief Medical Officer",
    image: "/placeholder.svg?height=300&width=300",
    credentials: "MD, PharmD",
    experience: "15+ years",
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    image: "/placeholder.svg?height=300&width=300",
    credentials: "MS Computer Science",
    experience: "12+ years",
  },
  {
    name: "Dr. Emily Rodriguez",
    role: "Head Pharmacist",
    image: "/placeholder.svg?height=300&width=300",
    credentials: "PharmD, RPh",
    experience: "10+ years",
  },
  {
    name: "David Kim",
    role: "Customer Success Manager",
    image: "/placeholder.svg?height=300&width=300",
    credentials: "MBA Healthcare",
    experience: "8+ years",
  },
]

const milestones = [
  { year: "2018", event: "MediCare Plus founded with a vision to make healthcare accessible" },
  { year: "2019", event: "Launched online pharmacy platform serving 5 major cities" },
  { year: "2020", event: "Expanded to 50+ cities during the pandemic" },
  { year: "2021", event: "Introduced telemedicine consultations" },
  { year: "2022", event: "Reached 1 million satisfied customers" },
  { year: "2023", event: "Launched AI-powered health recommendations" },
  { year: "2024", event: "Expanded internationally and achieved carbon-neutral delivery" },
]

const values = [
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "We ensure all medications are authentic and sourced directly from licensed manufacturers.",
  },
  {
    icon: Heart,
    title: "Patient-Centric Care",
    description: "Every decision we make is guided by what's best for our patients' health and wellbeing.",
  },
  {
    icon: Users,
    title: "Accessibility",
    description: "Making quality healthcare accessible to everyone, regardless of location or circumstances.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in every aspect of our service, from product quality to customer support.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-600 to-sky-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">About MediCare Plus</h1>
            <p className="text-xl lg:text-2xl text-sky-100 mb-8">
              Revolutionizing healthcare delivery with technology, compassion, and unwavering commitment to patient
              care.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sky-100">
              <div className="text-center">
                <div className="text-3xl font-bold">1M+</div>
                <div className="text-sm">Customers Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm">Uptime</div>
              </div>
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

      {/* Mission & Vision */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To make quality healthcare accessible, affordable, and convenient for everyone. We believe that access
                to essential medications and healthcare services should not be limited by geography, time constraints,
                or financial barriers.
              </p>
              <p className="text-gray-600 mb-8">
                Through our innovative platform, we connect patients with licensed pharmacists and healthcare
                professionals, ensuring safe, reliable, and personalized care delivered right to their doorstep.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-sky-600" />
                  <span className="font-medium">100% Authentic Medications</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-6 w-6 text-sky-600" />
                  <span className="font-medium">Fast & Reliable Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-sky-600" />
                  <span className="font-medium">24/7 Customer Support</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Healthcare Mission"
                width={600}
                height={500}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These values guide everything we do and shape how we serve our customers and community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-sky-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From a small startup to a leading healthcare platform, here's how we've grown to serve millions.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-sky-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                    <p className="text-gray-700">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced team of healthcare professionals and technology experts are dedicated to improving
              healthcare access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sky-600 font-medium mb-2">{member.role}</p>
                  <Badge variant="secondary" className="mb-2">
                    {member.credentials}
                  </Badge>
                  <p className="text-sm text-gray-600">{member.experience} experience</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Partnerships */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Certifications & Partnerships</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We maintain the highest standards through our certifications and partnerships with leading healthcare
              organizations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="FDA Approved"
                  width={120}
                  height={80}
                  className="mx-auto mb-2"
                />
                <p className="text-sm font-medium">FDA Approved</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="HIPAA Compliant"
                  width={120}
                  height={80}
                  className="mx-auto mb-2"
                />
                <p className="text-sm font-medium">HIPAA Compliant</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="ISO Certified"
                  width={120}
                  height={80}
                  className="mx-auto mb-2"
                />
                <p className="text-sm font-medium">ISO 27001 Certified</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Image
                  src="/placeholder.svg?height=80&width=120"
                  alt="Pharmacy Board"
                  width={120}
                  height={80}
                  className="mx-auto mb-2"
                />
                <p className="text-sm font-medium">Licensed Pharmacy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Have questions about our services or want to learn more about how we can help you? We'd love to hear from
            you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Phone className="mr-2 h-5 w-5" />
              Call Us: (555) 123-4567
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sky-600">
              <Mail className="mr-2 h-5 w-5" />
              Email: hello@medicareplus.com
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
