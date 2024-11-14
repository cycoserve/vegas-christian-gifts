import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../utils/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { slug } = req.query
      
      if (!slug || typeof slug !== 'string') {
        return res.status(400).json({ error: 'Product ID is required' })
      }

      const productRef = doc(db, 'products', slug)
      const productSnap = await getDoc(productRef)

      if (!productSnap.exists()) {
        return res.status(404).json({ error: 'Product not found' })
      }

      const product = {
        id: productSnap.id,
        ...productSnap.data()
      }

      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch product' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
