import MetaData from "@/components/headers/MetaData"
import RootLayout from "@/components/Layouts/RootLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cross, Heart, Gift, Leaf, Globe, Phone } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <MetaData
        title="About Us - Vegas Christian Gifts"
        description="Discover the story behind Vegas Christian Gifts. We are dedicated to providing quality, faith-inspired gifts that uplift and inspire. Learn more about our mission, values, and the team committed to serving you."
        keywords="Christian gifts, faith-inspired gifts, about Vegas Christian Gifts, mission, values, faith-based store"
        url="https://www.vegaschristiangifts.com/about"
        imageUrl="https://www.vegaschristiangifts.com/assets/about-image.jpg"
        siteName="Vegas Christian Gifts"
        locale="en_US"
        themeColor="#EC4899"
      />
      <RootLayout>
        <div className="min-h-screen bg-white">
          <div className="container mx-auto px-4 py-12">
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                At Vegas Christian Gifts, we believe in the power of faith and nature to bring joy, peace, and inspiration to people&apos;s lives. Our mission is to create unique, meaningful gifts that celebrate God&apos;s creation and help spread His love to others.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <Cross className="h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Faith-Inspired</h3>
                    <p className="text-center text-gray-600">Our products are designed to reflect Christian values and inspire spiritual growth.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <Heart className="h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
                    <p className="text-center text-gray-600">Each item is crafted with care, attention to detail, and a spirit of devotion.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center p-6">
                    <Gift className="h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Perfect Gifts</h3>
                    <p className="text-center text-gray-600">Our products make meaningful presents for any occasion, spreading joy and faith.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Story</h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <p className="text-lg text-gray-700 mb-4">
                    Vegas Christian Gifts was born from a passion for combining the beauty of nature with the strength of faith. Our journey began when our founder, inspired by the diverse flora of the Nevada desert, saw an opportunity to create miniature gardens that could serve as daily reminders of God&apos;s love and grace.
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    What started as a small, home-based business has grown into a thriving company, dedicated to crafting high-quality, faith-inspired gifts that bring joy to people across the country. Our mini flower pots, featuring carefully selected trees and cacti, along with our custom-engraved wooden plates, have become beloved items in many Christian homes.
                  </p>
                  <p className="text-lg text-gray-700">
                    Today, we continue to innovate and expand our product line, always with the goal of helping people nurture their faith and share God&apos;s love with others.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Founder working on mini flower pots"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Mini Flower Pots</h3>
                    <p className="text-gray-700 mb-4">
                      Our signature mini flower pots are more than just decorative items. Each one is a tiny ecosystem, carefully designed to represent different aspects of faith and spiritual growth. From miniature olive trees symbolizing peace to resilient cacti representing perseverance, our pots are living reminders of God&apos;s teachings.
                    </p>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>Various plant options: trees, cacti, and herbs</li>
                      <li>Perfect for home, office, or as gifts</li>
                      <li>Low-maintenance and long-lasting</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Custom Engraved Wooden Plates</h3>
                    <p className="text-gray-700 mb-4">
                      Our custom engraved wooden plates add a personal touch to our mini gardens. Each plate can be inscribed with names, Bible verses, or personal messages, making them perfect for commemorating special occasions or offering words of encouragement.
                    </p>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>Made from sustainable, high-quality wood</li>
                      <li>Customizable with names, dates, or Bible verses</li>
                      <li>Adds a personal touch to any gift</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-blue-600 mb-6">Contact Us</h2>
              <div className="flex flex-col md:flex-row gap-8">
                <Card className="flex-1">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Globe className="h-6 w-6 text-blue-600 mr-2" />
                      <span className="text-lg">Visit Us</span>
                    </div>
                    <p className="text-gray-700">
                      123 Faith Street<br />
                      Las Vegas, NV 89101<br />
                      United States
                    </p>
                  </CardContent>
                </Card>
                <Card className="flex-1">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Phone className="h-6 w-6 text-blue-600 mr-2" />
                      <span className="text-lg">Get in Touch</span>
                    </div>
                    <p className="text-gray-700">
                      Phone: (555) 123-4567<br />
                      Email: info@vegaschristiangifts.com
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-8 text-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Contact Us
                </Button>
              </div>
            </section>
          </div>
        </div>
      </RootLayout>
    </>
  )
}