"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Truck, Shield, Tag, ShoppingBag, Home } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const { toast } = useToast()

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      })
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleRemoveItem = (id: number, name: string) => {
    removeItem(id)
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    })
  }

  const handleApplyPromo = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(total * 0.1)
      toast({
        title: "Promo code applied!",
        description: "You saved 10% on your order.",
      })
    } else if (promoCode.toLowerCase() === "welcome5") {
      setDiscount(5)
      toast({
        title: "Promo code applied!",
        description: "You saved $5 on your order.",
      })
    } else if (promoCode) {
      toast({
        title: "Invalid promo code",
        description: "Please check your promo code and try again.",
        variant: "destructive",
      })
    }
  }

  const subtotal = total
  const shipping = subtotal > 2000 ? 0 : 499
  const tax = (subtotal - discount) * 0.08
  const finalTotal = subtotal - discount + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild className="bg-sky-600 hover:bg-sky-700">
              <Link href="/products">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Start Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
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
              Continue Shopping
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600">
              {items.length} item{items.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card
                key={item.id}
                className="bg-white/90 backdrop-blur-sm border-sky-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {item.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">Qty:</span>
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 min-w-[2rem] text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-semibold text-sky-600">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">₹{item.price.toFixed(2)} each</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={clearCart} className="text-red-600 border-red-200 hover:bg-red-50">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Cart
              </Button>
              <Button variant="outline" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Tag className="mr-2 h-4 w-4" />
                  Promo Code
                </h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button onClick={handleApplyPromo} variant="outline">
                    Apply
                  </Button>
                </div>
                <div className="mt-3 text-xs text-gray-500">Try: SAVE10 or WELCOME5</div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{Math.round(subtotal * 80)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{Math.round(discount * 80)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {shipping === 0 ? <span className="text-green-600">Free</span> : `₹${Math.round(shipping * 80)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>₹{Math.round(tax * 80)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-sky-600">₹{Math.round(finalTotal * 80)}</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-sky-600 hover:bg-sky-700" size="lg" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>

                {shipping > 0 && (
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Add ₹{Math.round((2000 - subtotal) * 80)} more for free shipping
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-sky-600" />
                    <div>
                      <p className="font-medium text-sm">Free Delivery</p>
                      <p className="text-xs text-gray-500">On orders over $2000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-sky-600" />
                    <div>
                      <p className="font-medium text-sm">Secure Payment</p>
                      <p className="text-xs text-gray-500">SSL encrypted checkout</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
