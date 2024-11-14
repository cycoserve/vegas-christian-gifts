import { useState, useEffect } from 'react'
import { useCart } from '@/lib/cartContext'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import RootLayout from '@/components/Layouts/RootLayout'
import MetaData from '@/components/headers/MetaData'
import { toast } from '@/components/ui/use-toast'
// import { Icons } from "@/components/icons"

export default function Component() {
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const { cartItems, getCartTotal } = useCart()
  const subtotal = getCartTotal()

  return (
    <>
      <MetaData
        title="Checkout - Vegas Christian Gifts"
        description="Complete your purchase of faith-inspired products and gifts at Vegas Christian Gifts. Secure checkout for a seamless shopping experience."
        keywords="checkout, secure checkout, Vegas Christian Gifts, Christian gifts, faith-inspired products, purchase"
        url="https://www.vegaschristiangifts.com/checkout"
        imageUrl="https://www.vegaschristiangifts.com/assets/checkout-image.jpg"
        siteName="Vegas Christian Gifts"
        locale="en_US"
      />

      <RootLayout>
        <div className="min-h-screen bg-white">
          <main className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Checkout</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Billing Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="John" />
                      </div>
                      <div>
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Doe" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="1234 Main St" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Las Vegas" />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="89101" />
                      </div>
                    </div>
                  </div>
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
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                  {paymentMethod === 'paypal' ? (
                    <PayPalScriptProvider options={{ 
                      "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                      currency: "USD",
                      components: "buttons,marks"
                    }}>
                      <PayPalButtons
                        createOrder={async () => {
                          const response = await fetch('/api/paypal/create-order', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              items: cartItems,
                              total: subtotal
                            }),
                          });
                          const order = await response.json();
                          return order.id;
                        }}
                        onApprove={async (data) => {
                          const response = await fetch('/api/paypal/capture-order', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              orderID: data.orderID,
                            }),
                          });
                          const orderData = await response.json();
                          if (orderData.status === 'success') {
                            toast({
                              title: "Payment successful",
                              description: "Thank you for your purchase!",
                              duration: 5000,
                            });
                          }
                        }}
                      />
                    </PayPalScriptProvider>
                  ) : (
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-600 font-semibold">
                      Place Order
                    </Button>
                  )}
                </div>
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>Your order is protected by our secure payment system</p>
                  <div className="flex justify-center space-x-4 mt-4">
                    {/* <Icons.visa className="h-8 w-auto text-blue-600" />
                <Icons.mastercard className="h-8 w-auto text-blue-600" />
                <Icons.paypal className="h-8 w-auto text-blue-600" /> */}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </RootLayout>
    </>
  )
}