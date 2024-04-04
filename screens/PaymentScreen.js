import React from 'react';
import { View, Button,StyleSheet } from 'react-native';
import PayPalService from './PayPalService';

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
})

const PaymentScreen = () => {
  const handlePayment = async () => {
    const amount = '10.00';
    const currency = 'USD';
    const description = 'Pago de ejemplo';

    try {
      const confirmation = await PayPalService.processPayment(amount, currency, description);
      console.log('Pago completado:', confirmation);
      // Realizar acciones adicionales después del pago exitoso
    } catch (error) {
      console.error('Error en el pago:', error);
      // Manejar el error del pago
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Realizar pago con PayPal" onPress={handlePayment} />
    </View>
  );
};

export default PaymentScreen;
