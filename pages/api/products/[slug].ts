import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../utils/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import slugify from 'slugify'
import type { Product } from '../../../types/product'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { slug } = req.query
      
      if (!slug || typeof slug !== 'string') {
        return res.status(400).json({ error: 'Invalid slug' })
      }

      const productsRef = collection(db, 'products')
      const snapshot = await getDocs(productsRef)
      const product = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as Product))
        .find(product => slugify(product.name || '', { lower: true }) === slug)

      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
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
