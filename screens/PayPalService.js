import { PayPalPayment } from 'react-native-paypal-wrapper';

const PayPalService = {
  processPayment: async (amount, currency, description) => {
    const paymentOptions = {
      amount: amount,
      currency: currency,
      description: description,
      intent: 'sale',
    };

    const payment = new PayPalPayment(paymentOptions, 'ZW7K43F3XWSMY');

    try {
      const confirmation = await payment.start();
      console.log(confirmation);
      return confirmation;
    } catch (error) {
      console.error(error);
    }
  },
};

export default PayPalService;
