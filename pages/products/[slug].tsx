import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '@/components/Layouts/RootLayout'
import { useCart } from '@/lib/cartContext'
import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

export default function ProductPage() {
  const router = useRouter()
  const { slug } = router.query
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    if (slug) {
      fetch(`/api/products/${slug}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            throw new Error(data.error)
          }
          setProduct(data)
        })
        .catch(error => {
          console.error('Failed to fetch product:', error)
        })
    }
  }, [slug])

  if (!product) {
    return <div>Loading...</div>
  }

  const updateQuantity = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta))
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0]
    })

    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart`,
      duration: 2000,
    })
  }

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-96">
            <Image 
              src={product.images[0]} 
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(-1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button 
              className="w-full"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}