import React, { useState,useEffect} from "react";
import {Text, View,StyleSheet,Button,Image,Dimensions,StatusBar,TouchableOpacity,SafeAreaView,VirtualizedList} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ejemplo usando Ionicons
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const getItem = (_data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Ruta ${index + 1}`,
});

const getItemCount = _data => 50;

const Item = ({title}) => (
  <View style={styles.item}>    
    <Ionicons name="cash-outline" size={50}></Ionicons>    
    <View style={{justifyContent:'center',alignItems:'center',width:80,height:80}}>
      <Text style={{fontWeight:'bold'}}>{title}</Text>
      <Text>10:47</Text>
    </View>
    <Text style={{fontWeight:'bold',textAlign:'left'}}>11 MXN</Text>
  </View>
);

const Home=({navigation,route})=>{    
  const [nombreUsuario,setnombreUsuario]=useState('');
  const [token,setToken]=useState('');
  const [id,setId]=useState(0);
  const userData = async () => {
    try {
      const response = await axios.get(`http://10.13.10.191:8080/getUserById/${route.params.idUser}`);
      console.log("DATA RESPONSE ", response.data);
      setnombreUsuario(response.data[0].nombre);    
      setToken(response.data[0].token);
      setId(route.params.idUser);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      userData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <TouchableOpacity style={{width:60,height:60,borderRadius:30,marginHorizontal:30}}>
            <Image style={styles.imagen} source={require('../assets/perfil.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize:15,fontWeight:'bold',fontSize:20}}>Bienvenido <Text style={{color:'#06c6a3'}}>{nombreUsuario}</Text></Text>
        </View>
        <View style={styles.card}>
          <LinearGradient
            colors={['#0093E9', '#15e252']} // Colores del gradiente
            style={styles.backgroundImage}
            start={{ x: 0, y: 0 }} // Inicio del gradiente
            end={{ x: 1, y: 0 }} // Fin del gradiente
          >
          {/* Contenido de tu aplicación aquí */}
          <Text style={{color:'#FFFFFF',fontWeight:'bold',fontSize:20,padding:20}}>Saldo disponible</Text>
          <Text style={{color:'#FFFFFF',fontWeight:'bold',fontSize:40,paddingRight:30,marginTop:20,alignSelf:'flex-end'}}>$2000</Text>
        </LinearGradient>        
        </View>
      </View>
      <View style={styles.body}>
          <Text style={{padding:20,fontWeight:'bold',fontSize:17,}}>Pagar con</Text>
          <View style={styles.firstRow}>
            <TouchableOpacity style={styles.items} onPress={() => navigation.navigate("Qr", {id,token})}>
                <Ionicons name="qr-code-outline" size={35}></Ionicons>
                <Text style={{fontWeight:'bold'}}>QR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.items} onPress={()=>{navigation.navigate("codebar")}}>
                <Ionicons name="barcode-outline" size={35}></Ionicons>
                <Text style={{fontWeight:'bold'}}>Codigo de barras</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.items}>
                <Ionicons name="shuffle-outline" size={35}></Ionicons>                
                <Text style={{fontWeight:'bold'}}>NFC</Text>
              </TouchableOpacity>
          </View>
          <Text style={{padding:20,fontWeight:'bold',fontSize:17,}}>Historial</Text>
          
          <View style={styles.flatlist}>
            <SafeAreaView>
              <VirtualizedList
                initialNumToRender={4}
                renderItem={({item}) => <Item title={item.title} />}
                keyExtractor={item => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
              />
            </SafeAreaView>
          </View>
      </View>
    </View>
  );
};

const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'#ededed',
  },
  header:{
    width,
    height:310,    
  },
  body:{
    width,
    height,
    borderTopStartRadius:25,
    borderTopEndRadius:25,
    backgroundColor:'#FFFFFF',
  },
  title:{
    width,
    height:85,    
    marginTop: StatusBar.currentHeight || 0,
    flexDirection:'row',    
    alignItems:'center',
  },
  imagen:{
    width:60,
    height:60,
    borderRadius:30,
  },
  card:{    
    width:windowWidth*0.85,
    height:160,    
    marginHorizontal:30,
    marginTop:10,    
  },
  backgroundImage:{
    flex:1,
    borderRadius:10,
  },
  firstRow:{
    flexDirection:'row',      
    width,
    height:120,
    justifyContent:'space-around',
    alignItems:'center',
  },
  items:{    
    width:100,
    height:100,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',   
    backgroundColor:'#7cd4fd',
  },
  flatlist:{  
    backgroundColor: '#FFFFFF',
    width,
    height,    
    alignItems:'center',
  },
    item: {
    borderWidth:2,
    borderColor:'#70ffa3',
    backgroundColor:'#aeffca',
    padding: 20,
    marginVertical: 8,
    width:windowWidth*0.93,
    borderRadius:13,
    height:100,    
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',

  },
})

export default Home;