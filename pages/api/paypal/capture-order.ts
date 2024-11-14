// import type { NextApiRequest, NextApiResponse } from 'next';
// import { PayPalClient, Environment, OrdersCaptureRequest } from '@paypal/checkout-server-sdk';

// const clientId = process.env.PAYPAL_CLIENT_ID;
// const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// // Create PayPal client
// const environment = new Environment(clientId, clientSecret);
// const client = new PayPalClient(environment);

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }

//   const { orderID } = req.body;

//   if (!orderID) {
//     return res.status(400).json({ error: 'Order ID is required' });
//   }

//   try {
//     const request = new OrdersCaptureRequest(orderID);
//     const response = await client.execute(request);

//     if (response.statusCode === 200 || response.statusCode === 201) {
//       return res.status(200).json({ status: 'success', data: response.result });
//     } else {
//       return res.status(response.statusCode).json({ error: 'Failed to capture payment', details: response.result });
//     }
//   } catch (error) {
//     console.error('Error capturing payment:', error);
//     return res.status(500).json({ error: 'An error occurred while processing the payment' });
//   }
// }
