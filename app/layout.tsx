import type React from "react"
import type { Metadata } from "next"
import { Poppins, Nunito, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { CartProvider } from "@/contexts/cart-context"
import { Toaster } from "@/components/ui/toaster"

// Main heading font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

// Body text font
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito",
})

// Accent font for special elements
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "MediCare Plus - Online Pharmacy",
  description: "Your trusted online pharmacy for authentic medicines and healthcare products",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${nunito.variable} ${playfair.variable} font-nunito`}>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
