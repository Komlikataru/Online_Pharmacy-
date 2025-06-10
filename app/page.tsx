"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart, Truck, Shield, Clock, Phone } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 149,
    originalPrice: 199,
    image: "/images/products/paracetamol.png",
    rating: 4.5,
    category: "Pain Relief",
    inStock: true,
    prescription: false,
  },
  {
    id: 2,
    name: "Vitamin D3 Tablets",
    price: 399,
    originalPrice: 499,
    image: "/images/products/vitamin-d3.png",
    rating: 4.8,
    category: "Vitamins",
    inStock: true,
    prescription: false,
  },
  {
    id: 3,
    name: "Cough Syrup 100ml",
    price: 129,
    originalPrice: 179,
    image: "/images/products/cough-syrup.png",
    rating: 4.3,
    category: "Cold & Cough",
    inStock: true,
    prescription: false,
  },
  {
    id: 4,
    name: "Blood Pressure Monitor",
    price: 1999,
    originalPrice: 2499,
    image: "/images/products/bp-monitor.png",
    rating: 4.7,
    category: "Medical Devices",
    inStock: true,
    prescription: false,
  },
]

const categories = [
  { name: "Cold & Cough", icon: "🤧", image: "/images/categories/cold-cough.png", count: 45 },
  { name: "Diabetes Care", icon: "💉", image: "/images/categories/diabetes.png", count: 32 },
  { name: "Skin Care", icon: "🧴", image: "/images/categories/skincare.png", count: 67 },
  { name: "Vitamins", icon: "💊", image: "/images/categories/vitamins.png", count: 89 },
  { name: "Heart Care", icon: "❤️", image: "/images/categories/heart.png", count: 23 },
  { name: "Pain Relief", icon: "🩹", image: "/images/categories/pain-relief.png", count: 56 },
]

const popularProducts = [
  {
    id: 5,
    name: "Digital Thermometer",
    price: 299,
    originalPrice: 399,
    image: "/images/products/thermometer.png",
    rating: 4.6,
    category: "Medical Devices",
  },
  {
    id: 6,
    name: "Hand Sanitizer 500ml",
    price: 199,
    originalPrice: 249,
    image: "/images/products/sanitizer.png",
    rating: 4.4,
    category: "Personal Care",
  },
  {
    id: 7,
    name: "Face Masks (Pack of 10)",
    price: 149,
    originalPrice: 199,
    image: "/images/products/masks.png",
    rating: 4.2,
    category: "Personal Care",
  },
  {
    id: 8,
    name: "Multivitamin Tablets",
    price: 449,
    originalPrice: 599,
    image: "/images/products/multivitamin.png",
    rating: 4.9,
    category: "Vitamins",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState({
    hero: false,
    categories: false,
    featured: false,
    popular: false,
    promo: false,
    trust: false,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const sections = ["hero", "categories", "featured", "popular", "promo", "trust"]
    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    })

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100 animate-gradient">
      {/* Hero Section */}
      <section
        id="hero"
        className={`relative bg-gradient-to-r from-sky-600 to-sky-800 text-white py-12 transition-all duration-1000 ${
          isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-3">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="font-bold leading-tight font-heading">Your Health, Our Priority</h1>
              <p className="text-sm text-sky-100">
                Get your medicines delivered to your doorstep. Safe, reliable, and convenient healthcare solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="sm" className="bg-white text-sky-600 hover:bg-sky-50 btn-animate animate-bounce-soft">
                  <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                  Shop Now
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-1.5 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <Truck className="h-3.5 w-3.5 text-sky-200" />
                  <span className="text-xs">Free Delivery</span>
                </div>
                <div className="flex items-center gap-1.5 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <Shield className="h-3.5 w-3.5 text-sky-200" />
                  <span className="text-xs">100% Authentic</span>
                </div>
                <div className="flex items-center gap-1.5 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                  <Clock className="h-3.5 w-3.5 text-sky-200" />
                  <span className="text-xs">24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="relative animate-float">
              <Image
                src="/images/hero-pharmacy.png"
                alt="Healthcare Hero"
                width={500}
                height={400}
                className="rounded-md shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-400 rounded-full opacity-10 translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Quick Categories */}
      <section
        id="categories"
        className={`py-10 bg-white transition-all duration-1000 ${
          isVisible.categories ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-3">
          <div className="text-center mb-8">
            <h2 className="section-title">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-xs">
              Find the right healthcare products for your needs from our wide range of categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link key={index} href="/products">
                <Card
                  className="hover:shadow-md transition-all duration-300 cursor-pointer hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-3 text-center">
                    <div className="mb-2 flex justify-center">
                      <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          width={30}
                          height={30}
                          className="group-hover:scale-110 transition-transform"
                        />
                      </div>
                    </div>
                    <h3 className="card-title mb-0.5 text-sm">{category.name}</h3>
                    <p className="text-xs text-gray-500">{category.count} products</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section
        id="featured"
        className={`py-10 bg-white/80 backdrop-blur-sm transition-all duration-1000 ${
          isVisible.featured ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-3">
          <div className="text-center mb-8">
            <h2 className="section-title">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-xs">
              Discover our most popular and trusted healthcare products
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-md">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredProducts.map((product) => (
                  <div key={product.id} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2 gap-6 items-center bg-white p-6 rounded-md shadow-md mx-3">
                      <div className="relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="rounded-md animate-float"
                        />
                        {product.originalPrice > product.price && (
                          <Badge className="absolute top-2 left-2 bg-red-500 animate-pulse-soft text-[10px] py-0 px-1">
                            Save ₹{Math.round(product.originalPrice - product.price).toFixed(0)}
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Badge variant="secondary" className="animate-fade-in text-[10px] py-0 px-1">
                          {product.category}
                        </Badge>
                        <h3 className="text-lg font-bold text-gray-900 animate-fade-in">{product.name}</h3>
                        <div className="flex items-center gap-1.5 animate-fade-in">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">({product.rating})</span>
                        </div>
                        <div className="flex items-center gap-2 animate-fade-in">
                          <span className="text-xl font-bold text-sky-600 price-tag">₹{product.price}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex gap-2 animate-fade-in">
                          <Button size="sm" className="flex-1 bg-sky-600 hover:bg-sky-700 btn-animate text-xs py-1 h-7">
                            <ShoppingCart className="mr-1.5 h-3 w-3" />
                            Add to Cart
                          </Button>
                          <Button variant="outline" size="sm" className="animate-pulse-soft h-7 w-7 p-0">
                            <Heart className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md hover:bg-sky-100 h-7 w-7 p-0"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md hover:bg-sky-100 h-7 w-7 p-0"
              onClick={nextSlide}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex justify-center mt-4 gap-1.5">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? "bg-sky-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section
        id="popular"
        className={`py-10 bg-gradient-to-br from-sky-50 to-white transition-all duration-1000 ${
          isVisible.popular ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-3">
          <div className="text-center mb-8">
            <h2 className="section-title">Popular Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-xs">Most purchased products by our customers</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularProducts.map((product, index) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-md transition-all duration-300 hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-3">
                  <div className="relative h-36 mb-3">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                    {product.originalPrice > product.price && (
                      <Badge className="absolute top-1 left-1 bg-red-500 text-[10px] py-0 px-1">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-1 right-1 bg-white/80 rounded-full h-6 w-6 p-0"
                    >
                      <Heart className="h-3 w-3" />
                    </Button>
                  </div>
                  <Badge variant="outline" className="mb-1 text-[10px] py-0 px-1">
                    {product.category}
                  </Badge>
                  <h3 className="font-medium text-sm mb-0.5 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mb-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-2.5 w-2.5 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-[10px] text-gray-600 ml-1">({product.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-sky-600">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-gray-500 line-through ml-1.5">₹{product.originalPrice}</span>
                      )}
                    </div>
                    <Button size="sm" className="bg-sky-600 hover:bg-sky-700 h-6 w-6 p-0">
                      <ShoppingCart className="h-2.5 w-2.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-6">
            <Button size="sm" className="bg-sky-600 hover:bg-sky-700 h-7 text-xs">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section
        id="promo"
        className={`py-10 bg-white transition-all duration-1000 ${
          isVisible.promo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-3">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white overflow-hidden hover-lift transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold mb-1">Free Health Checkup</h3>
                    <p className="mb-3 text-xs">Book your annual health checkup with our certified doctors</p>
                    <Button variant="secondary" size="sm" className="animate-pulse-soft h-7 text-xs">
                      Book Now
                    </Button>
                  </div>
                  <div className="text-4xl opacity-20 animate-float">🩺</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white overflow-hidden hover-lift transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold mb-1">24/7 Consultation</h3>
                    <p className="mb-3 text-xs">Get instant medical advice from our expert doctors</p>
                    <Button variant="secondary" size="sm" className="animate-pulse-soft h-7 text-xs">
                      <Phone className="mr-1.5 h-3 w-3" />
                      Call Now
                    </Button>
                  </div>
                  <div className="text-4xl opacity-20 animate-float">👨‍⚕️</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section
        id="trust"
        className={`py-10 bg-gradient-to-br from-sky-50 to-white transition-all duration-1000 ${
          isVisible.trust ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-3">
          <div className="text-center mb-8">
            <h2 className="section-title">Why Choose Us?</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="bg-sky-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-soft">
                <Shield className="h-5 w-5 text-sky-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">100% Authentic</h3>
              <p className="text-gray-600 text-xs">All medicines are sourced directly from manufacturers</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="bg-sky-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-soft">
                <Truck className="h-5 w-5 text-sky-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Fast Delivery</h3>
              <p className="text-gray-600 text-xs">Same day delivery available in major cities</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="bg-sky-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-soft">
                <Clock className="h-5 w-5 text-sky-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">24/7 Support</h3>
              <p className="text-gray-600 text-xs">Round the clock customer support available</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="bg-sky-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-soft">
                <Phone className="h-5 w-5 text-sky-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Expert Consultation</h3>
              <p className="text-gray-600 text-xs">Free consultation with licensed pharmacists</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
