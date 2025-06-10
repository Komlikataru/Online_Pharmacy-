import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-sky-50 to-white border-t">
      <div className="container mx-auto px-3 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center space-x-1.5">
              <span className="logo-text text-gradient">
                MediCare<span className="text-sky-500">+</span>
              </span>
            </Link>
            <p className="text-gray-600 font-nunito text-xs">
              Your trusted online pharmacy for authentic medicines and healthcare products.
            </p>
            <div className="flex space-x-3">
              <Link href="#" className="text-sky-600 hover:text-sky-800 transition-colors">
                <Facebook size={16} />
              </Link>
              <Link href="#" className="text-sky-600 hover:text-sky-800 transition-colors">
                <Twitter size={16} />
              </Link>
              <Link href="#" className="text-sky-600 hover:text-sky-800 transition-colors">
                <Instagram size={16} />
              </Link>
              <Link href="#" className="text-sky-600 hover:text-sky-800 transition-colors">
                <Youtube size={16} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-heading font-semibold text-sm text-gray-900">Quick Links</h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/" className="text-gray-600 hover:text-sky-600 transition-colors text-xs">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-sky-600 transition-colors text-xs">
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/upload-prescription"
                  className="text-gray-600 hover:text-sky-600 transition-colors text-xs"
                >
                  Upload Prescription
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-sky-600 transition-colors text-xs">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-sky-600 transition-colors text-xs">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h3 className="font-heading font-semibold text-sm text-gray-900">Customer Service</h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-sky-600 transition-colors text-xs">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-sky-600 transition-colors text-xs">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-sky-600 transition-colors text-xs">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-sky-600 transition-colors text-xs">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-sky-600 transition-colors text-xs">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="font-heading font-semibold text-sm text-gray-900">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="mr-1.5 h-3.5 w-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-xs">
                  123 Healthcare Avenue, Medical District, Mumbai, India - 400001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-1.5 h-3.5 w-3.5 text-sky-600 flex-shrink-0" />
                <span className="text-gray-600 text-xs">+91 1234 567 890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-1.5 h-3.5 w-3.5 text-sky-600 flex-shrink-0" />
                <span className="text-gray-600 text-xs">support@medicareplus.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-[10px] font-nunito">
              &copy; {new Date().getFullYear()} MediCare Plus. All rights reserved.
            </p>
            <div className="mt-2 md:mt-0">
              <p className="text-gray-600 text-[10px] font-nunito">
                Designed with <span className="text-red-500">♥</span> for better healthcare
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
