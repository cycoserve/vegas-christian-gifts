import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextApiRequest, NextApiResponse } from 'next'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateApiKey(req: NextApiRequest, res: NextApiResponse, next: () => Promise<void>) {
  const apiKey = req.headers['x-api-key']
  
  const validApiKey = process.env.API_ACCESS_KEY || process.env.NEXT_PUBLIC_API_ACCESS_KEY;
  if (!apiKey || apiKey !== validApiKey) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  return next()
}