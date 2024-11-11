import { useState } from 'react';
import { useRouter } from 'next/router';
import BranchLayout from '@/components/Layouts/BranchLayout';
import { Button } from '@/components/ui/button';

// Types for our checkout process
interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

// Mock order summary data (will be replaced with actual cart data later)
const mockOrderSummary = {
  subtotal: 199.97,
  shipping: 9.99,
  tax: 20.00,
  total: 229.96,
  items: [
    { id: 1, name: "Vegas Nights Sneakers", price: 89.99, quantity: 1 },
    { id: 2, name: "Neon Lights T-Shirt", price: 29.99, quantity: 2 },
    { id: 3, name: "Casino Royale Hoodie", price: 49.99, quantity: 1 }
  ]
};

export default function CheckoutPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handleConfirmOrder = () => {
    // Here we would typically process the payment and create the order
    alert('Order placed successfully!');
    router.push('/');
  };

  return (
    <BranchLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Checkout Steps */}
          <div className="mb-8">
            <div className="flex justify-center items-center space-x-4">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-pink-600' : 'text-gray-400'}`}>
                <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold">
                  1
                </span>
                <span className="ml-2">Shipping</span>
              </div>
              <div className="w-16 h-1 bg-gray-200">
                <div className={`h-full ${currentStep >= 2 ? 'bg-pink-600' : 'bg-gray-200'}`} />
              </div>
              <div className={`flex items-center ${currentStep >= 2 ? 'text-pink-600' : 'text-gray-400'}`}>
                <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold">
                  2
                </span>
                <span className="ml-2">Payment</span>
              </div>
              <div className="w-16 h-1 bg-gray-200">
                <div className={`h-full ${currentStep >= 3 ? 'bg-pink-600' : 'bg-gray-200'}`} />
              </div>
              <div className={`flex items-center ${currentStep >= 3 ? 'text-pink-600' : 'text-gray-400'}`}>
                <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold">
                  3
                </span>
                <span className="ml-2">Confirm</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Checkout Form */}
            <div className="md:col-span-2">
              {currentStep === 1 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                          value={shippingDetails.firstName}
                          onChange={(e) => setShippingDetails({...shippingDetails, firstName: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                          value={shippingDetails.lastName}
                          onChange={(e) => setShippingDetails({...shippingDetails, lastName: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                        value={shippingDetails.email}
                        onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                        value={shippingDetails.address}
                        onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                          value={shippingDetails.city}
                          onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                          value={shippingDetails.state}
                          onChange={(e) => setShippingDetails({...shippingDetails, state: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                          value={shippingDetails.zipCode}
                          onChange={(e) => setShippingDetails({...shippingDetails, zipCode: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Country</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                          value={shippingDetails.country}
                          onChange={(e) => setShippingDetails({...shippingDetails, country: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
                      Continue to Payment
                    </Button>
                  </form>
                </div>
              )}

              {currentStep === 2 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                        value={paymentDetails.nameOnCard}
                        onChange={(e) => setPaymentDetails({...paymentDetails, nameOnCard: e.target.value})}
                      />
                    </div>
                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="w-1/2 bg-gray-600 hover:bg-gray-700"
                      >
                        Back
                      </Button>
                      <Button type="submit" className="w-1/2 bg-pink-600 hover:bg-pink-700">
                        Review Order
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {currentStep === 3 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6">Order Review</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Shipping Details</h3>
                      <p>{shippingDetails.firstName} {shippingDetails.lastName}</p>
                      <p>{shippingDetails.address}</p>
                      <p>{shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}</p>
                      <p>{shippingDetails.country}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
                      <p>Card ending in {paymentDetails.cardNumber.slice(-4)}</p>
                      <p>Expires: {paymentDetails.expiryDate}</p>
                    </div>
                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="w-1/2 bg-gray-600 hover:bg-gray-700"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={handleConfirmOrder}
                        className="w-1/2 bg-pink-600 hover:bg-pink-700"
                      >
                        Place Order
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {mockOrderSummary.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <p>Subtotal</p>
                      <p>${mockOrderSummary.subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Shipping</p>
                      <p>${mockOrderSummary.shipping.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Tax</p>
                      <p>${mockOrderSummary.tax.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                      <p>Total</p>
                      <p>${mockOrderSummary.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BranchLayout>
  );
}
