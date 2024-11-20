import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const initiateCheckout = async (items: any[]) => {
  try {
    // Get Stripe instance
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');

    // Create checkout session
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    const { sessionId } = await response.json();

    // Redirect to Stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error('Error initiating checkout:', error);
    throw error;
  }
};

export default stripePromise;
