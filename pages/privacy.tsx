import RootLayout from "@/components/Layouts/RootLayout"

export default function PrivacyPolicy() {
  return (
    <RootLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name and contact information</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information</li>
              <li>Order history</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Process your orders and payments</li>
              <li>Send order confirmations and updates</li>
              <li>Respond to your questions and requests</li>
              <li>Improve our products and services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="mb-4">We do not sell or rent your personal information to third parties. We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Shipping partners to deliver your orders</li>
              <li>Payment processors to handle transactions</li>
              <li>Service providers who assist our operations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Security</h2>
            <p className="mb-4">We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Contact Us</h2>
            <p className="mb-4">If you have questions about this Privacy Policy, please contact us at:</p>
            <p>Email: privacy@vegaschristiangifts.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </section>
        </div>
      </div>
    </RootLayout>
  )
}
