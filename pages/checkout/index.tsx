import { useState } from 'react'
import { useCart } from '../../lib/cartContext'
import { Button } from "../../components/ui/button"
import RootLayout from '../../components/Layouts/RootLayout'
import MetaData from '../../components/headers/MetaData'
import { toast } from '../../components/ui/use-toast'
import { initiateCheckout } from '../../lib/stripe'
import { ShippingAddressForm, type ShippingFormData } from '@/components/forms/ShippingAddressForm'

export default function Component() {
  const { cartItems, getCartTotal } = useCart()
  const subtotal = getCartTotal()
  const [shippingAddress, setShippingAddress] = useState<ShippingFormData | null>(null)

  const handleShippingSubmit = async (data: ShippingFormData) => {
    setShippingAddress(data)
  }

  const handleCheckout = async () => {
    if (!shippingAddress) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in your shipping address before proceeding to payment.",
        duration: 3000,
      });
      return;
    }

    try {
      await initiateCheckout(cartItems);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Checkout Error",
        description: "There was a problem initiating checkout. Please try again.",
        duration: 5000,
      });
    }
  };

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
        <div className="min-h-screen bg-gray-50 pt-8 pb-12">
          <main className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-6">Shipping Information</h3>
                  <ShippingAddressForm 
                    onSubmit={handleShippingSubmit}
                    submitLabel={shippingAddress ? "Update Address" : "Continue to Payment"}
                    className="space-y-6"
                  />
                </div>
              </div>

              <div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center pb-4 border-b border-gray-100">
                        <div className="relative">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                          <span className="absolute -top-2 -right-2 bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                        </div>
                        <div className="ml-4">
                          <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-500">Calculated at next step</span>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-medium text-gray-900">Total</span>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">USD</span>
                          <span className="text-xl font-semibold text-gray-900 ml-1">${subtotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button 
                      onClick={handleCheckout}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                      disabled={!shippingAddress}
                    >
                      {!shippingAddress ? 'Enter Shipping Address' : 'Proceed to Payment'}
                    </Button>
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