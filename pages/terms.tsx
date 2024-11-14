import RootLayout from "@/components/Layouts/RootLayout"

export default function TermsOfService() {
  return (
    <RootLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <div className="prose max-w-none">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">By accessing or using Vegas Christian Gifts services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Products and Services</h2>
            <p className="mb-4">All products are subject to availability. We reserve the right to discontinue any product at any time. Prices are subject to change without notice.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Orders and Payment</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Orders are subject to acceptance and availability</li>
              <li>Prices are in USD unless otherwise noted</li>
              <li>Payment must be received prior to shipment</li>
              <li>Sales tax will be added where applicable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Shipping and Delivery</h2>
            <p className="mb-4">We aim to process and ship orders within 1-3 business days. Delivery times vary by location and shipping method selected.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Returns and Refunds</h2>
            <p className="mb-4">Products may be returned within 30 days of delivery. Items must be unused and in original packaging. Custom orders are non-refundable.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="mb-4">All content, designs, and materials on this website are protected by copyright and other intellectual property laws.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Contact Information</h2>
            <p className="mb-4">For questions about these Terms of Service, please contact us at:</p>
            <p>Email: legal@vegaschristiangifts.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </section>
        </div>
      </div>
    </RootLayout>
  )
}
