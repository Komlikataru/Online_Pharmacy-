"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ShoppingCart, Search, User, Heart, Home, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { items } = useCart()

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Upload Prescription", href: "/upload-prescription" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Help", href: "/help" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white",
      )}
    >
      <div className="container mx-auto px-3">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1.5">
            <span className="logo-text text-gradient">
              MediCare<span className="text-sky-500">+</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-underline-animated text-sm font-medium transition-colors hover:text-sky-600",
                  pathname === link.href ? "text-sky-600 font-semibold" : "text-gray-700",
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="hover:text-sky-600 h-8 w-8 p-0">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-sky-600 h-8 w-8 p-0">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-sky-600 h-8 w-8 p-0">
              <Heart className="h-4 w-4" />
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative hover:text-sky-600 h-8 w-8 p-0">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[10px] text-white font-stylish-number">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu} className="h-8 w-8 p-0">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-3 pt-2 pb-3 space-y-2 bg-white">
            <div className="flex items-center border rounded overflow-hidden">
              <Input
                type="search"
                placeholder="Search medicines..."
                className="border-0 focus-visible:ring-0 h-8 text-xs"
              />
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <nav className="grid gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center px-3 py-1.5 text-sm font-medium rounded hover:bg-sky-50",
                    pathname === link.href ? "bg-sky-50 text-sky-600 font-semibold" : "text-gray-700",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name === "Home" && <Home className="mr-1.5 h-3.5 w-3.5" />}
                  {link.name === "Upload Prescription" && <FileText className="mr-1.5 h-3.5 w-3.5" />}
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t">
              <Link href="/login">
                <Button variant="outline" className="w-full h-7 text-xs" size="sm">
                  <User className="mr-1 h-3 w-3" />
                  Login
                </Button>
              </Link>
              <Link href="/wishlist">
                <Button variant="outline" className="w-full h-7 text-xs" size="sm">
                  <Heart className="mr-1 h-3 w-3" />
                  Wishlist
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="outline" className="w-full relative h-7 text-xs" size="sm">
                  <ShoppingCart className="mr-1 h-3 w-3" />
                  Cart
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-sky-500 text-[10px] text-white">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
