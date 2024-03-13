import React from "react";
import {StyleSheet,View,StatusBar,Text,FlatList,SafeAreaView,TouchableOpacity, Button} from 'react-native';

const styles=StyleSheet.create({
    container:{
        flex:1,
        marginTop: StatusBar.currentHeight || 0,

    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        marginStart:35,
        marginTop:50,
    },
    subtitle:{
        marginStart:35,
        fontSize:16,
    },
    item: {        
        padding: 20,
        marginVertical: 8,
        marginStart:35,
        width:'83%',
        height:125,
        borderRadius:8,
        flexDirection:'row',
        borderWidth:2,
        borderColor:'#A1F3DA',
    },
    payment:{
        fontSize:17,
        fontWeight:'bold',
        color:'#3ED8EA',
    },
    buttonView:{        
        width:'100%',
        height:100,                
        alignItems:'center',
        justifyContent:'center',
        marginVertical:80,        
    },
    button:{
        borderRadius:8,
        backgroundColor:'#161D1D',
        height:50,
        width:'65%',
        justifyContent:'center',
    },
    cost:{
        fontWeight:'bold',
        fontSize:20,
    },
});

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      payment: 'Mensualmente',
      cost:'600 MXN/Mensual',
      description:'Obtenga accesso ilimatado al transporte durante 1 mes.',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      payment: 'Semanal(Ahorra 50 pesos)',
      cost:'600 MXN/Mensual',
      description:'Obtenga accesso ilimatado al transporte durante 1 semana.',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      payment: 'Estandar',
      cost:'600 MXN/Mensual',
      description:'Continua pagando una tarifa de 11.00 pesos MXN.',
    },
  ];

  const Item = ({payment,cost,description}) => (
    <View style={styles.item}>
        <View style={{width:'80%',height:60}}>
            <Text style={styles.payment}>{payment}</Text>
            <Text style={styles.cost}>{cost}</Text>
            <Text>{description}</Text>
        </View>
        <View style={{width:'20%',height:60,justifyContent:'center',alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity style={{borderRadius:30,borderWidth:2,backgroundColor:'green',width:30,height:30}}>
                <Text style={{textAlign:'center',alignItems:'center',fontWeight:'bold'}}>✓</Text>
            </TouchableOpacity>
        </View>
    </View>
  );

const Suscripcion=()=>{

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Suscripción</Text>
            <Text style={styles.subtitle}>Tu Suscripción</Text>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={({item}) => <Item payment={item.payment} cost={item.cost} description={item.description}/>}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.button}>
                    <Text style={{color:'#FFFFFF',textAlign:'center',fontWeight:'bold',fontSize:16}}>Cambiar plan</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    );
};

export default Suscripcion;

