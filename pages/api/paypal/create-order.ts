import type { NextApiRequest, NextApiResponse } from 'next';
import paypal from '@paypal/checkout-server-sdk';

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error('PayPal credentials are not properly configured in environment variables');
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

  const { items, total } = req.body;

  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: total.toString()
        },
        description: 'Vegas Christian Gifts Purchase'
      }]
    });

    const order = await client.execute(request);
    res.status(200).json({ id: order.result.id });
  } catch (error) {
    console.error('Failed to create order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
}
