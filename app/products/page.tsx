"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, ShoppingCart, Heart, Filter, Grid, List, Search, Home } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

const products = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 12.99,
    originalPrice: 15.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    reviews: 128,
    category: "Pain Relief",
    brand: "HealthCare",
    inStock: true,
    prescription: false,
    description: "Effective pain relief and fever reducer",
  },
  {
    id: 2,
    name: "Vitamin D3 Tablets",
    price: 24.99,
    originalPrice: 29.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    reviews: 89,
    category: "Vitamins",
    brand: "VitaLife",
    inStock: true,
    prescription: false,
    description: "Essential vitamin D3 supplement for bone health",
  },
  {
    id: 3,
    name: "Cough Syrup 100ml",
    price: 8.99,
    originalPrice: 11.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.3,
    reviews: 67,
    category: "Cold & Cough",
    brand: "CoughCare",
    inStock: true,
    prescription: false,
    description: "Soothing cough syrup for dry and wet cough",
  },
  {
    id: 4,
    name: "Blood Pressure Monitor",
    price: 89.99,
    originalPrice: 109.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    reviews: 156,
    category: "Medical Devices",
    brand: "MediTech",
    inStock: true,
    prescription: false,
    description: "Digital blood pressure monitor with memory",
  },
  {
    id: 5,
    name: "Insulin Pen",
    price: 45.99,
    originalPrice: 55.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
    reviews: 234,
    category: "Diabetes Care",
    brand: "DiabCare",
    inStock: true,
    prescription: true,
    description: "Easy-to-use insulin pen for diabetes management",
  },
  {
    id: 6,
    name: "Omega-3 Fish Oil",
    price: 19.99,
    originalPrice: 24.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.4,
    reviews: 92,
    category: "Supplements",
    brand: "OceanHealth",
    inStock: true,
    prescription: false,
    description: "High-quality omega-3 fatty acids for heart health",
  },
  {
    id: 7,
    name: "Antiseptic Cream",
    price: 6.99,
    originalPrice: 8.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.2,
    reviews: 45,
    category: "Skin Care",
    brand: "SkinGuard",
    inStock: false,
    prescription: false,
    description: "Antibacterial cream for cuts and wounds",
  },
  {
    id: 8,
    name: "Thermometer Digital",
    price: 15.99,
    originalPrice: 19.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    reviews: 78,
    category: "Medical Devices",
    brand: "TempCheck",
    inStock: true,
    prescription: false,
    description: "Fast and accurate digital thermometer",
  },
]

const categories = [
  "All",
  "Pain Relief",
  "Vitamins",
  "Cold & Cough",
  "Medical Devices",
  "Diabetes Care",
  "Supplements",
  "Skin Care",
]
const brands = [
  "All",
  "HealthCare",
  "VitaLife",
  "CoughCare",
  "MediTech",
  "DiabCare",
  "OceanHealth",
  "SkinGuard",
  "TempCheck",
]
const priceRanges = [
  { label: "Under ₹800", min: 0, max: 800 },
  { label: "₹800 - ₹2,000", min: 800, max: 2000 },
  { label: "₹2,000 - ₹4,000", min: 2000, max: 4000 },
  { label: "₹4,000 - ₹8,000", min: 4000, max: 8000 },
  { label: "Over ₹8,000", min: 8000, max: Number.POSITIVE_INFINITY },
]

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedBrand, setSelectedBrand] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null)
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [prescriptionOnly, setPrescriptionOnly] = useState(false)

  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    let filtered = products

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Brand filter
    if (selectedBrand !== "All") {
      filtered = filtered.filter((product) => product.brand === selectedBrand)
    }

    // Price range filter
    if (selectedPriceRange) {
      filtered = filtered.filter(
        (product) => product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max,
      )
    }

    // Stock filter
    if (inStockOnly) {
      filtered = filtered.filter((product) => product.inStock)
    }

    // Prescription filter
    if (prescriptionOnly) {
      filtered = filtered.filter((product) => product.prescription)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, selectedBrand, selectedPriceRange, sortBy, inStockOnly, prescriptionOnly])

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const ProductCard = ({ product }: { product: (typeof products)[0] }) => (
    <Card
      className={`group hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in ${!product.inStock ? "opacity-60" : ""}`}
    >
      <CardContent className="p-0">
        <div className="relative">
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </Link>
          {product.originalPrice > product.price && (
            <Badge className="absolute top-2 left-2 bg-red-500">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Badge>
          )}
          {product.prescription && <Badge className="absolute top-2 right-2 bg-orange-500">Rx</Badge>}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-md"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4">
          <Badge variant="secondary" className="mb-2 text-xs">
            {product.category}
          </Badge>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-gray-900 mb-1 hover:text-sky-600 transition-colors">{product.name}</h3>
          </Link>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>

          <div className="flex items-center gap-2 mb-2">
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
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-sky-600">₹{Math.round(product.price * 80)}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">₹{Math.round(product.originalPrice * 80)}</span>
              )}
            </div>
            <span className="text-xs text-gray-500">{product.brand}</span>
          </div>

          <Button
            className="w-full bg-sky-600 hover:bg-sky-700"
            disabled={!product.inStock}
            onClick={() => handleAddToCart(product)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const ProductListItem = ({ product }: { product: (typeof products)[0] }) => (
    <Card className={`group hover:shadow-lg transition-shadow ${!product.inStock ? "opacity-60" : ""}`}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={120}
                height={120}
                className="w-24 h-24 object-cover rounded-lg"
              />
            </Link>
            {!product.inStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span className="text-white text-xs font-semibold">Out of Stock</span>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <Badge variant="secondary" className="mb-1 text-xs">
                  {product.category}
                </Badge>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-sky-600 transition-colors">{product.name}</h3>
                </Link>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              </div>
              <Button variant="ghost" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 mb-2">
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
              <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
              <span className="text-xs text-gray-500">• {product.brand}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-sky-600">₹{Math.round(product.price * 80)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">₹{Math.round(product.originalPrice * 80)}</span>
                )}
                {product.prescription && <Badge className="bg-orange-500 text-xs">Rx</Badge>}
              </div>
              <Button
                className="bg-sky-600 hover:bg-sky-700"
                disabled={!product.inStock}
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Find the right healthcare products for your needs</p>
        </div>

        {/* Back to Home Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" asChild className="hover:bg-white/50 transition-all duration-300">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 border border-sky-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-4 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`w-64 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Brand</h4>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`price-${index}`}
                        checked={selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max}
                        onCheckedChange={(checked) => {
                          setSelectedPriceRange(checked ? range : null)
                        }}
                      />
                      <label htmlFor={`price-${index}`} className="text-sm text-gray-600">
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Filters */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="in-stock" checked={inStockOnly} onCheckedChange={setInStockOnly} />
                  <label htmlFor="in-stock" className="text-sm text-gray-600">
                    In Stock Only
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="prescription" checked={prescriptionOnly} onCheckedChange={setPrescriptionOnly} />
                  <label htmlFor="prescription" className="text-sm text-gray-600">
                    Prescription Required
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                    setSelectedBrand("All")
                    setSelectedPriceRange(null)
                    setInStockOnly(false)
                    setPrescriptionOnly(false)
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredProducts.map((product) =>
                  viewMode === "grid" ? (
                    <ProductCard key={product.id} product={product} />
                  ) : (
                    <ProductListItem key={product.id} product={product} />
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
