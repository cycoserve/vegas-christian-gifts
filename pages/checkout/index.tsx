import MetaData from '@/components/headers/MetaData';
import { PayPalButtons } from '@paypal/react-paypal-js';

export default function CheckoutPage() {
  const totalAmount = 100; // Replace with cart total calculation

  return (
    <>
      <MetaData
        title="Checkout | Vegas Christian Gifts"
        description=""
        keywords=""
        url="https://www.vegaschristiangifts.com/about"
        imageUrl="https://www.vegaschristiangifts.com/assets/about-image.jpg"
        siteName="Vegas Christian Gifts"
        locale="en_US"
        themeColor="#EC4899"
      />
      <div>
        <h2>Checkout</h2>
        <p>Total: ${totalAmount}</p>
        <PayPalButtons
          style={{ layout: 'vertical' }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: { value: totalAmount.toString() }
                }
              ]
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details: { payer: { name: { given_name: string; }; }; }) => {
              alert("Transaction completed by " + details.payer.name.given_name);
              // Save order in Firestore here
            });
          }}
        />
      </div>
    </>
  );
}
