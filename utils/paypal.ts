interface PayPalOrderResponse {
  id: string;
  status: string;
}

interface CreateOrderData {
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
}

export const createPayPalOrder = async (data: CreateOrderData): Promise<PayPalOrderResponse> => {
  try {
    const response = await fetch('/api/paypal/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create PayPal order');
    }

    return response.json();
  } catch (error) {
    console.error('PayPal order creation error:', error);
    throw error;
  }
};

export const capturePayPalOrder = async (orderId: string): Promise<any> => {
  try {
    const response = await fetch('/api/paypal/capture-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId }),
    });

    if (!response.ok) {
      throw new Error('Failed to capture PayPal order');
    }

    return response.json();
  } catch (error) {
    console.error('PayPal order capture error:', error);
    throw error;
  }
};
