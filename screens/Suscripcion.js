import React, { useEffect, useState } from 'react';
import {StyleSheet,View,StatusBar,Text,FlatList,SafeAreaView,TouchableOpacity,Dimensions} from 'react-native';


const windowWidth=Dimensions.get('window').width;
const windowHeight=Dimensions.get('window').height;


const styles=StyleSheet.create({
    container:{
        flex:1,
        marginTop: StatusBar.currentHeight || 0,
        alignItems:'center',


    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        marginStart:35,
        marginTop:50,
        alignSelf:'flex-start',
    },
    subtitle:{
        marginStart:35,
        fontSize:13,
        fontWeight:'bold',
        color:'green',
        alignSelf:'flex-start',
    },
    item: {        
        padding: 20,
        marginVertical: 7,
        width:windowWidth*0.82,
        height:windowHeight*0.20,
        borderRadius:8,
        flexDirection:'row',
        borderWidth:2,
        borderColor:'#A1F3DA',        
        alignItems:'center',
    },
    payment:{
        fontSize:17,
        fontWeight:'bold',
        color:'#3ED8EA',
    },
    buttonView:{        
        width:windowWidth,
        height:windowHeight*0.08,                
        alignItems:'center',
        justifyContent:'center',            
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
    bodyFlatList:{
        width:windowWidth*0.90,
        height:windowHeight*0.65,
        alignItems:'center',              
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
        <View style={{width:windowWidth*0.61,justifyContent:'flex-start'}}>
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
    const [data, setData] = useState([]);    


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Suscripción</Text>
            <Text style={styles.subtitle}>¡Subscríbete ahora y ahorra en tus viajes diarios con nuestras ofertas exclusivas!</Text>
            <SafeAreaView style={styles.bodyFlatList}>
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







