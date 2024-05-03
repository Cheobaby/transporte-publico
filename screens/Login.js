import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,Dimensions,StatusBar,Image,TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
    },
    header:{       
        width:windowWidth,
        height:windowHeight*0.30,        
        justifyContent:'center',  
    },
    image:{
        width:windowHeight*0.30,
        height:windowHeight*0.10,
    },
    body:{
        width:windowWidth,
        height:windowHeight*0.40,        
        justifyContent:'flex-start',  
        alignItems:'center',
    },
    textInputs:{
        backgroundColor:'#c3d4fa',
        
        height:windowHeight*0.065,
        width:windowWidth*0.85,
        marginHorizontal:30,
        borderRadius:10,
        paddingHorizontal:13,
        marginVertical:8,
    },
    forgotPass:{        
        width:windowWidth*0.85,
        height:windowHeight*0.07,
        marginTop:15,
        flexDirection:'row',  
        justifyContent:'space-around',                     
    },
});

const Login=({navigation})=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const saveUserData = async (id, nombre, correo,tel) => {
        try {
          await AsyncStorage.setItem('id', id);
          await AsyncStorage.setItem('nombre', nombre);
          await AsyncStorage.setItem('correo', correo);
          await AsyncStorage.setItem('tel', tel);
          console.log('Datos de usuario guardados exitosamente');
        } catch (error) {
          console.log('Error al guardar los datos de usuario:', error);
        }
    };
    const limpiarTexto=()=>{
        setEmail('');
        setPassword('');
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
          limpiarTexto();
        });
      
        return unsubscribe;
    }, [navigation]);
      

    const handleSubmit = async () => {
        const credentials = {
          email: email,
          password: password,
        };              
        axios
          .post('http://10.13.10.191:8080/startSesion', credentials)
          .then((response) => {
            //console.log(response.data);
            //navigation.navigate('Main');
            //console.log(response.data[0].email); este si sirve
            if(response.data[0].id_cliente!=0){
                //console.log("acceso");                      
                id=response.data[0].id_cliente;                         
                nombre=response.data[0].nombre;  
                correo=response.data[0].email;  
                tel=response.data[0].telefono; 
                token=response.data[0].token;                
                saveUserData(id.toString(),nombre,correo,tel);
                //console.log(id);

                //id_cli=response.data[0].id_cliente;                
                navigation.navigate('Main', { idUser: id});
            }
          })
          .catch((error) => {
            //console.log('Error al iniciar sesión');
            alert("Credenciales invalidas");
          });
    };      

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.image}
                    source={require('../assets/log.png')}
                />
                <Text style={{marginHorizontal:30,fontSize:22,fontWeight:'bold',}}>¡Bienvenido a de nuevo!</Text>
                <Text style={{marginHorizontal:30,fontSize:13,marginTop:7}}>Utilice el siguiente formulario para acceder a su cuenta</Text>
            </View>
            <View style={styles.body}>
                <Text style={{textAlign:'left',color:'#676767',fontSize:12,marginVertical:7,width:windowWidth*0.80}}>Dirección de correo electrónico</Text>
                <TextInput
                    style={styles.textInputs}
                    placeholder='Ingres tu correo electrónico aquí'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Text style={{textAlign:'left',color:'#676767',fontSize:12,marginVertical:7,width:windowWidth*0.80}}>Contraseña</Text>
                <TextInput
                    style={styles.textInputs}
                    placeholder='Contraseña' 
                    secureTextEntry
                    leftIcon={<Icon name="lock" size={20} color="#aaa"/>}
                    value={password}
                    onChangeText={(text) => setPassword(text)}/>   

                <View style={styles.forgotPass}>
                    <TouchableOpacity style={{borderColor:'#2853ff',width:windowWidth*0.5,height:windowHeight*0.06,borderRadius:10,justifyContent:'center',alignItems:'center',backgroundColor:'#880689'}}>
                        <Text style={{color:'white'}}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity style={{borderWidth:1,borderColor:'#2853ff',width:windowWidth*0.31,height:windowHeight*0.06,borderRadius:10,justifyContent:'center',alignItems:'center',backgroundColor:'#1734b6'}}
                    onPress={handleSubmit}>
                        <Text style={{color:'white'}}>Iniciar sesión</Text>
                    </TouchableOpacity>                      
                </View>                 
                <Text style={{marginTop:20}}>Utilice una red social para continuar</Text>
                <TouchableOpacity style={{marginTop:20,width:windowWidth*0.20,height:windowHeight*0.05,backgroundColor:'#eeff0d',borderRadius:10,justifyContent:'center',alignItems:'center',borderColor:'black',borderWidth:1}}>
                    <Text style={{color:'#10279f',fontWeight:'bold',fontSize:15}}>Google</Text>
                </TouchableOpacity>
                <View style={{width,height:windowHeight*0.05,marginTop:10,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Text>¿No tienes cuenta? </Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate('acount')}}>
                        <Text style={{fontWeight:'bold',color:'blue'}}>Crear Cuenta</Text>
                    </TouchableOpacity>
                </View> 
            </View>
        </View>
    );
};

export default Login;
