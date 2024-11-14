import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../utils/firebase'
import { collection, getDocs } from 'firebase/firestore'
import slugify from 'slugify'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const productsRef = collection(db, 'products')
      const snapshot = await getDocs(productsRef)
      const products = snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          slug: slugify(data.name || '', { lower: true })
        }
      })
      
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
