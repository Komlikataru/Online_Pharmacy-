"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Truck, MapPin, User, Mail, Phone, ArrowLeft, Lock, CheckCircle, Home } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { toast } = useToast()

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  const [deliveryOption, setDeliveryOption] = useState("standard")
  const [sameAsBilling, setSameAsBilling] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = total
  const tax = subtotal * 0.08
  const shippingCost =
    deliveryOption === "express" ? 799 : deliveryOption === "overnight" ? 1599 : subtotal > 2000 ? 0 : 499
  const finalTotal = subtotal + tax + shippingCost

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Mock order processing
    setTimeout(() => {
      setIsProcessing(false)
      clearCart()
      toast({
        title: "Order placed successfully!",
        description: "You will receive a confirmation email shortly.",
      })
      // In a real app, you would redirect to an order confirmation page
    }, 2000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
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
            <Link href="/cart">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-600">Complete your order</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <Card className="bg-white/90 backdrop-blur-sm border-sky-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          className="pl-10"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="address"
                        className="pl-10"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select
                        value={shippingInfo.state}
                        onValueChange={(value) => setShippingInfo({ ...shippingInfo, state: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Options */}
              <Card className="bg-white/90 backdrop-blur-sm border-sky-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="mr-2 h-5 w-5" />
                    Delivery Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="standard" id="standard" />
                      <div className="flex-1">
                        <Label htmlFor="standard" className="font-medium">
                          Standard Delivery
                        </Label>
                        <p className="text-sm text-gray-500">5-7 business days</p>
                      </div>
                      <span className="font-medium">{subtotal > 2000 ? "Free" : "₹499"}</span>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="express" id="express" />
                      <div className="flex-1">
                        <Label htmlFor="express" className="font-medium">
                          Express Delivery
                        </Label>
                        <p className="text-sm text-gray-500">2-3 business days</p>
                      </div>
                      <span className="font-medium">₹799</span>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="overnight" id="overnight" />
                      <div className="flex-1">
                        <Label htmlFor="overnight" className="font-medium">
                          Overnight Delivery
                        </Label>
                        <p className="text-sm text-gray-500">Next business day</p>
                      </div>
                      <span className="font-medium">₹1,599</span>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="bg-white/90 backdrop-blur-sm border-sky-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardholderName">Cardholder Name</Label>
                        <Input
                          id="cardholderName"
                          value={cardInfo.cardholderName}
                          onChange={(e) => setCardInfo({ ...cardInfo, cardholderName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardInfo.cardNumber}
                          onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={cardInfo.expiryDate}
                            onChange={(e) => setCardInfo({ ...cardInfo, expiryDate: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox id="sameAsBilling" checked={sameAsBilling} onCheckedChange={setSameAsBilling} />
                    <Label htmlFor="sameAsBilling" className="text-sm">
                      Billing address same as shipping address
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="w-15 h-15 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {item.category}
                        </Badge>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                          <span className="font-medium">₹{Math.round(item.price * item.quantity * 80)}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{Math.round(subtotal * 80)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>
                        {shippingCost === 0 ? <span className="text-green-600">Free</span> : `₹${shippingCost}`}
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
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Lock className="h-4 w-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-700"
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Place Order
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 mt-3 text-center">
                    By placing your order, you agree to our Terms of Service and Privacy Policy
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
