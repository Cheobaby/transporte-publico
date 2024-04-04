import React, { useState } from 'react';
import { View, TextInput, Button,StyleSheet,Text} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const styles=StyleSheet.create({
  header:{
    width:'100%',   
    height:60,     
    justifyContent:'center',
    alignItems:'center',
    marginTop:30,        
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
  },
})
const Qr = ({navigation}) => {
  const [qrValue, setQrValue] = useState('id:1'); // Valor inicial

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent:'flex-start' }}>
      <View style={styles.header}>
        <Text style={styles.title}>Pago con QR</Text>
      </View>
      <TextInput 
        style={{ height: 40, borderWidth: 1, padding: 10, marginBottom: 20 }}
        onChangeText={text => setQrValue(text)}
        value={qrValue}
      />
      
      <QRCode
        value={qrValue} // El valor que quieres codificar 
        size={250} // Tamaño del QR
        bgColor='black' // Color de fondo del QR 
        fgColor='white' // Color de los elementos del QR
      />
    </View>
  );
};

export default Qr;
