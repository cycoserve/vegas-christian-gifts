import type { NextApiRequest, NextApiResponse } from 'next';
import paypal from '@paypal/checkout-server-sdk';

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error('PayPal credentials are not configured in environment variables');
}

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
if (process.env.NODE_ENV === 'production') {
  environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
}

const client = new paypal.core.PayPalHttpClient(environment);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { orderID } = req.body;

  try {
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    const response = await client.execute(request);
    
    if (response.result.status === 'COMPLETED') {
      return res.status(200).json({ 
        status: 'success', 
        data: response.result 
      });
    } else {
      return res.status(400).json({ 
        error: 'Payment not completed' 
      });
    }
  } catch (error) {
    console.error('Error capturing payment:', error);
    return res.status(500).json({ 
      error: 'An error occurred while processing the payment' 
    });
  }
}
