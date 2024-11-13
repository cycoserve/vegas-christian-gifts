# PayPal Implementation for Vegas Christian Gifts

## Overview
This document outlines the steps and requirements for integrating PayPal into the Vegas Christian Gifts store to enable payment processing.

## Steps for PayPal Integration:

1. **Setup PayPal Developer Account:**
   - Create a PayPal Developer account if not already done.
   - Obtain Client ID and Secret from the PayPal Developer Dashboard.

2. **Configure PayPal SDK:**
   - Install the PayPal SDK for Node.js:
     ```bash
     npm install @paypal/checkout-server-sdk
     ```
   - Update `package.json` to include this dependency.

3. **Environment Setup:**
   - Set up environment variables for PayPal Client ID and Secret in `.env.local`:
     ```plaintext
     PAYPAL_CLIENT_ID=your_client_id
     PAYPAL_CLIENT_SECRET=your_client_secret
     ```

4. **Create PayPal Order:**
   - Implement an API endpoint to create a PayPal order. This can be done in `pages/api/paypal/create-order.ts`:
     ```typescript
     import { PayPalClient } from '@paypal/checkout-server-sdk';

     export default async function handler(req, res) {
       if (req.method === 'POST') {
         const paypalClient = new PayPalClient({
           clientId: process.env.PAYPAL_CLIENT_ID,
           clientSecret: process.env.PAYPAL_CLIENT_SECRET,
           environment: 'sandbox' // or 'live' for production
         });

         const request = new OrdersCreateRequest();
         request.prefer('return=representation');
         request.requestBody({
           intent: 'CAPTURE',
           purchase_units: [{
             amount: {
               currency_code: 'USD',
               value: '100.00' // Example amount
             }
           }]
         });

         try {
           const response = await paypalClient.execute(request);
           res.status(200).json({ orderID: response.result.id });
         } catch (err) {
           res.status(500).json({ error: err.message });
         }
       } else {
         res.setHeader('Allow', ['POST']);
         res.status(405).end(`Method ${req.method} Not Allowed`);
       }
     }
     ```

5. **Capture Payment:**
   - Implement an API endpoint to capture the payment once the user completes the PayPal transaction. This can be done in `pages/api/paypal/capture-order.ts`:
     ```typescript
     import { PayPalClient } from '@paypal/checkout-server-sdk';

     export default async function handler(req, res) {
       if (req.method === 'POST') {
         const paypalClient = new PayPalClient({
           clientId: process.env.PAYPAL_CLIENT_ID,
           clientSecret: process.env.PAYPAL_CLIENT_SECRET,
           environment: 'sandbox' // or 'live' for production
         });

         const request = new OrdersCaptureRequest(req.body.orderID);
         request.prefer('return=representation');

         try {
           const response = await paypalClient.execute(request);
           res.status(200).json({ status: response.result.status });
         } catch (err) {
           res.status(500).json({ error: err.message });
         }
       } else {
         res.setHeader('Allow', ['POST']);
         res.status(405).end(`Method ${req.method} Not Allowed`);
       }
     }
     ```

6. **Frontend Integration:**
   - Update the checkout page (`pages/checkout/index.tsx`) to include the PayPal button:
     ```typescript
     import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

     function Checkout() {
       const createOrder = (data, actions) => {
         return actions.order.create({
           purchase_units: [{
             amount: {
               value: '100.00' // Example amount
             }
           }]
         });
       };

       const onApprove = (data, actions) => {
         return actions.order.capture().then(function(details) {
           // Handle successful payment
         });
       };

       return (
         <PayPalScriptProvider options={{ "client-id": process.env.PAYPAL_CLIENT_ID }}>
           <PayPalButtons
             createOrder={createOrder}
             onApprove={onApprove}
           />
         </PayPalScriptProvider>
       );
     }

     export default Checkout;
     ```

7. **Testing:**
   - Test the integration in the PayPal Sandbox environment before going live.
   - Ensure all error handling and user feedback mechanisms are in place.

8. **Go Live:**
   - Once testing is complete, switch the environment to 'live' in the PayPal SDK configuration.

## Additional Considerations:
- **Security:** Ensure all sensitive data like API keys are stored securely using environment variables.
- **Error Handling:** Implement robust error handling for all PayPal API calls.
- **User Experience:** Provide clear instructions and feedback to users during the payment process.

## Conclusion
This implementation will enable Vegas Christian Gifts to accept payments through PayPal, providing a seamless checkout experience for customers. Ensure all steps are followed meticulously to avoid any issues during the payment process.
