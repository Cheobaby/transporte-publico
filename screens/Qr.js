import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  qr:{
    marginTop:40,
  },
})
const Qr = ({ navigation, route }) => {
  data = {
    Id: route.params.id,
    Token: route.params.token,
    Metodo: 'Efectivo',
    Empresa: 'Movix'
  };
  const { id, token, metodo = 'Efectivo', empresa = 'Movix' } = route.params;
  const dataString = `Id:${route.params.id}\nToken:${route.params.token}\nMetodo:${metodo}\nEmpresa:${empresa}`;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      <View style={styles.header}>
        <Text style={styles.title}>Pago con QR</Text>
      </View>
      <View style={styles.qr}>
        <QRCode
          value={dataString}
          size={250} // Tamaño del QR
          bgColor='black' // Color de fondo del QR 
          fgColor='white' // Color de los elementos del QR
        />
      </View>
    </View>
  );
};

export default Qr;
