"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Heart, Truck, Shield, Clock, ArrowLeft, Plus, Minus, Share2, Home } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

// Mock product data - in a real app, this would come from an API
const product = {
  id: 1,
  name: "Paracetamol 500mg Tablets",
  price: 12.99,
  originalPrice: 15.99,
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
  rating: 4.5,
  reviews: 128,
  category: "Pain Relief",
  brand: "HealthCare Plus",
  inStock: true,
  stockCount: 45,
  prescription: false,
  description: "Effective pain relief and fever reducer for adults and children over 12 years.",
  longDescription:
    "Paracetamol is a widely used over-the-counter pain reliever and fever reducer. It is effective for treating mild to moderate pain including headache, toothache, muscle aches, and menstrual cramps. It also helps reduce fever associated with colds and flu.",
  activeIngredient: "Paracetamol 500mg",
  dosage:
    "Adults and children over 12 years: Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
  warnings:
    "Do not exceed the recommended dose. Consult your doctor if symptoms persist. Keep out of reach of children.",
  sideEffects:
    "Side effects are rare but may include nausea, rash, or allergic reactions. Stop use and consult a doctor if you experience any adverse effects.",
  manufacturer: "HealthCare Pharmaceuticals Ltd.",
  expiryDate: "12/2025",
  batchNumber: "HC2024001",
}

const relatedProducts = [
  {
    id: 2,
    name: "Ibuprofen 400mg",
    price: 18.99,
    originalPrice: 22.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.3,
    category: "Pain Relief",
    inStock: true,
  },
  {
    id: 3,
    name: "Aspirin 325mg",
    price: 9.99,
    originalPrice: 12.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.1,
    category: "Pain Relief",
    inStock: true,
  },
  {
    id: 4,
    name: "Thermometer Digital",
    price: 15.99,
    originalPrice: 19.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    category: "Medical Devices",
    inStock: true,
  },
]

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2024-01-15",
    comment: "Very effective for headaches. Works quickly and lasts for hours.",
    verified: true,
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4,
    date: "2024-01-10",
    comment: "Good quality product. Fast delivery and well packaged.",
    verified: true,
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 5,
    date: "2024-01-08",
    comment: "Always keep these in my medicine cabinet. Reliable pain relief.",
    verified: true,
  },
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
      })
    }
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    })
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-sky-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-sky-600">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" asChild className="hover:bg-white/50 transition-all duration-300">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <div className="h-6 w-px bg-gray-300"></div>
          <Button variant="ghost" asChild className="hover:bg-white/50 transition-all duration-300">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-96 object-cover rounded-lg border"
              />
              {product.originalPrice > product.price && (
                <Badge className="absolute top-4 left-4 bg-red-500">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
              {product.prescription && (
                <Badge className="absolute top-4 right-4 bg-orange-500">Prescription Required</Badge>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? "border-sky-600" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-sky-600">₹{Math.round(product.price * 80)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">₹{Math.round(product.originalPrice * 80)}</span>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Brand:</span>
                  <span className="text-gray-600">{product.brand}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Stock:</span>
                  <span className={`text-sm ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                    {product.inStock ? `${product.stockCount} available` : "Out of stock"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Active Ingredient:</span>
                  <span className="text-gray-600">{product.activeIngredient}</span>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)} disabled={quantity >= 10}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-sky-600 hover:bg-sky-700"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Wishlist
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-8 w-8 text-sky-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-gray-500">Orders over $25</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-sky-600 mx-auto mb-2" />
                <p className="text-sm font-medium">100% Authentic</p>
                <p className="text-xs text-gray-500">Verified products</p>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 text-sky-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Same Day</p>
                <p className="text-xs text-gray-500">In major cities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <Card className="mb-12 bg-white/90 backdrop-blur-sm border-sky-100 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="dosage">Dosage & Usage</TabsTrigger>
                <TabsTrigger value="warnings">Warnings</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-medium mb-2">Product Details</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>
                          <strong>Manufacturer:</strong> {product.manufacturer}
                        </li>
                        <li>
                          <strong>Batch Number:</strong> {product.batchNumber}
                        </li>
                        <li>
                          <strong>Expiry Date:</strong> {product.expiryDate}
                        </li>
                        <li>
                          <strong>Active Ingredient:</strong> {product.activeIngredient}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Storage Instructions</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>Store in a cool, dry place</li>
                        <li>Keep below 25°C</li>
                        <li>Protect from light and moisture</li>
                        <li>Keep out of reach of children</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="dosage" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Dosage & Usage Instructions</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-700">{product.dosage}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Important Usage Guidelines:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Take with or without food</li>
                      <li>Swallow tablets whole with water</li>
                      <li>Do not crush or chew tablets</li>
                      <li>Space doses evenly throughout the day</li>
                      <li>Complete the full course as directed</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="warnings" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Warnings & Precautions</h3>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-red-800 font-medium mb-2">Important Safety Information:</p>
                    <p className="text-red-700">{product.warnings}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Possible Side Effects:</h4>
                      <p className="text-gray-600 text-sm">{product.sideEffects}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Who Should Not Take This Medicine:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>Children under 12 years (unless directed by a doctor)</li>
                        <li>People with severe liver or kidney disease</li>
                        <li>Those allergic to paracetamol</li>
                        <li>People taking other paracetamol-containing medicines</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} out of 5 ({product.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{review.name}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full">
                    Load More Reviews
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      width={200}
                      height={200}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  </Link>
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {relatedProduct.category}
                  </Badge>
                  <Link href={`/products/${relatedProduct.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-sky-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(relatedProduct.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({relatedProduct.rating})</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-sky-600">₹{Math.round(relatedProduct.price * 80)}</span>
                      {relatedProduct.originalPrice > relatedProduct.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{Math.round(relatedProduct.originalPrice * 80)}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button className="w-full bg-sky-600 hover:bg-sky-700" size="sm">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
