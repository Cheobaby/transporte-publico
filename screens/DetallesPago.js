import React from "react";
import {View,Text,Image,StyleSheet,StatusBar} from 'react-native';

const DetallesPago=()=>{
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalles de pago</Text>
            <View style={styles.description}>
                <Image style={styles.image} source={require('../assets/pay.png')}/>
                <Text style={{fontSize:15}}>Transacción exitosa</Text>
                <Text style={styles.price}>11.00 MXN</Text>
                <View style={styles.descriptionPayment}>
                    <Text style={styles.origintittle}>Ruta/Origen</Text>
                    <Text style={{fontWeight:'bold',fontSize:17,marginVertical:10}}>T55 / Lomas de la san jeronimo</Text>
                    <Text style={{fontSize:17}}>Hora: <Text style={{fontWeight:'bold'}}>17:05</Text></Text>
                    <Text style={{fontSize:17,marginTop:10}}>Fecha: <Text style={{fontWeight:'bold'}}>03/03/2024</Text></Text>
                    <Text style={{fontSize:17,marginTop:5,paddingVertical:10,borderBottomWidth: 3,borderBottomColor:'#51F4F7',width:'100%'}}>Método de pago: <Text style={{fontWeight:'bold'}}>Código QR</Text></Text>
                </View>
            </View>
        </View>
    );
};

const styles=StyleSheet.create({
    container:{
        flex:1,
        marginTop: StatusBar.currentHeight || 0,
        alignItems:'center',
    },
    title:{
        marginTop:35,        
        fontSize:30,
        fontWeight:'bold',
    },
    description:{
        marginTop:25,
        borderWidth:2,        
        borderColor:'#51F4F7',
        width:'88%',
        height:'62%',
        borderRadius:10,
        alignItems:'center',
    },
    image:{
        marginTop:20,
        width:180,
        height:180,
    },
    price:{
        fontSize:45,
        fontWeight:'bold',
        borderBottomWidth: 3,         
        borderColor: '#51F4F7',
        width:'86%',
        textAlign:'center',
    },
    descriptionPayment:{
        width:'88%',
        alignItems:'flex-start',
    },
    origintittle:{
        marginTop:10,
        fontSize:17,
    },
});

export default DetallesPago;

