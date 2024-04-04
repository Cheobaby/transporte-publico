import React from 'react';
import { View, StyleSheet,Text} from 'react-native';
import Barcode from 'react-native-barcode-svg';


export default function CodeBar() {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight:'bold',}}>Escane el código de barra en el dispositivo</Text>
      <Barcode value="123456789" format="CODE128" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});



