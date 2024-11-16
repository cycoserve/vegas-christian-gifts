import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { CreditCard, ShoppingCartIcon as Paypal } from 'lucide-react'

export function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true)

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Vegas Christian Gifts</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Checkout</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shipping-first-name">First Name</Label>
                    <Input id="shipping-first-name" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="shipping-last-name">Last Name</Label>
                    <Input id="shipping-last-name" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="shipping-email">Email</Label>
                  <Input id="shipping-email" type="email" placeholder="john.doe@example.com" />
                </div>
                <div>
                  <Label htmlFor="shipping-address">Address</Label>
                  <Input id="shipping-address" placeholder="1234 Main St" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shipping-city">City</Label>
                    <Input id="shipping-city" placeholder="Las Vegas" />
                  </div>
                  <div>
                    <Label htmlFor="shipping-zip">ZIP Code</Label>
                    <Input id="shipping-zip" placeholder="89101" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Billing Information</h3>
              <div className="mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useShippingAsBilling}
                    onChange={(e) => setUseShippingAsBilling(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Same as shipping address</span>
                </label>
              </div>
              
              {!useShippingAsBilling && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billing-first-name">First Name</Label>
                      <Input id="billing-first-name" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="billing-last-name">Last Name</Label>
                      <Input id="billing-last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="billing-email">Email</Label>
                    <Input id="billing-email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="billing-address">Address</Label>
                    <Input id="billing-address" placeholder="1234 Main St" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billing-city">City</Label>
                      <Input id="billing-city" placeholder="Las Vegas" />
                    </div>
                    <div>
                      <Label htmlFor="billing-zip">ZIP Code</Label>
                      <Input id="billing-zip" placeholder="89101" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label htmlFor="credit">Credit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
              </RadioGroup>
              {paymentMethod === 'credit' && (
                <div className="mt-4 space-y-4">
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$49.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$4.50</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>$59.49</span>
                </div>
              </div>
              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-600 font-semibold">
                Place Order
              </Button>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Your order is protected by our secure payment system</p>
              <div className="flex justify-center space-x-4 mt-4">
                <CreditCard className="h-8 w-auto text-blue-600" />
                <Paypal className="h-8 w-auto text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-blue-600 text-white py-4 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Vegas Christian Gifts. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
