import RootLayout from "@/components/Layouts/RootLayout"

export default function Accessibility() {
  return (
    <RootLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Accessibility Statement</h1>
        <div className="prose max-w-none">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Our Commitment</h2>
            <p className="mb-4">Vegas Christian Gifts is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Conformance Status</h2>
            <p className="mb-4">The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. We strive to meet WCAG 2.1 Level AA standards.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Accessibility Features</h2>
            <p className="mb-4">Our website includes the following accessibility features:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Alt text for all images</li>
              <li>Proper heading structure</li>
              <li>Descriptive links</li>
              <li>Color contrast compliance</li>
              <li>Keyboard navigation support</li>
              <li>Resizable text</li>
              <li>ARIA labels where appropriate</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Assistive Technologies</h2>
            <p className="mb-4">Our website is designed to be compatible with the following assistive technologies:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Screen readers</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Known Issues</h2>
            <p className="mb-4">While we strive for WCAG 2.1 Level AA compliance, some content may not yet meet all standards. We are actively working to identify and resolve any accessibility issues.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Feedback</h2>
            <p className="mb-4">We welcome your feedback on the accessibility of Vegas Christian Gifts. Please let us know if you encounter accessibility barriers:</p>
            <p>Email: accessibility@vegaschristiangifts.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </section>
        </div>
      </div>
    </RootLayout>
  )
}
