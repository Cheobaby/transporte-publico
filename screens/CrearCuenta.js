import React from "react";
import {Text,TextInput, View,StyleSheet,Button,Image, ImageBackground} from 'react-native';

const styles=StyleSheet.create({
    container:{
        flex:1,      
    },
    imageBackGround:{
        justifyContent:'center',
        flex:1,
    },
    image:{
        width:400,
        height:150,
        position:'absolute',
        bottom:640,
    },
    title:{
        fontWeight:'bold',
        fontSize:55,
        width:'100%',    
        textAlign:'center', 
        color:'#FFFFFF',          
    },
    subtitleView:{
        backgroundColor:'blue',
        width:'100%',                
        alignItems:'center',        
    },
    subtitle:{
        fontSize:15,
        color:'#FFFFFF',
        fontWeight:'bold',
        
        textAlign:'center',        
    },
    labels:{
        width:'100%',
        paddingLeft:35,        
        fontWeight:'bold',
        color:'#FFFFFF',
    },
    spaceBeetwenText:{
        marginTop:50,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    inputs:{
        width:'85%', 
        height:40,                 
        fontSize:18,      
        borderRadius:10,
        paddingLeft:10,
        marginTop:7,
        backgroundColor:'#FFFFFF',
        marginVertical:10,
    },
    buttonView:{
        width:'92%',
        paddingLeft:30,
        marginTop:10,
    },
    singUpLabel:{
        paddingLeft:40,
        marginTop:20,
        alignItems:'center',
        color:'#FFFFFF',
        fontSize:15,       
    },
});


const LoginBus=()=>{
    return(
        <View style={styles.container}>
            <ImageBackground source={require('../assets/fondo02.jpg')}
                resizeMode="cover"
                style={styles.imageBackGround}>
                <Image source={require('../assets/log.png')} style={styles.image}/>
                <View style={{alignItems:'center',justifyContent:'center',marginTop:70,}}>
                    <Text style={styles.title}>Crear Cuenta</Text>
                    <Text style={styles.subtitle}>Viaja sin preocupaciones. Regístrate y disfruta del camino.</Text>                                        
                </View>                  
                <View style={styles.spaceBeetwenText}>
                <Text style={styles.labels}>Nombre</Text>
                    <TextInput placeholder="Ingrese su nombre"
                    style={styles.inputs}/>                    
                    <Text style={styles.labels}>Correo Electrónico</Text>
                    <TextInput placeholder="example@gmail.com"
                    style={styles.inputs}/>
                    <Text style={styles.labels}>Teléfono</Text>
                    <TextInput placeholder="Ingrese su numero de teléfono"
                    style={styles.inputs}
                    keyboardType="numeric"/>
                    <Text style={styles.labels}>Contraseña</Text>
                    <TextInput style={styles.inputs}
                    placeholder="Ingrese su contraseña"
                    secureTextEntry/>                    
                </View>      
                <View style={styles.buttonView}>
                    <Button title="Crear Cuenta" />
                    <Text style={styles.singUpLabel}>
                        ¿Ya tienes una cuenta? <Text style={{ fontWeight: 'bold' }}>Iniciar Sesión</Text>
                    </Text>
                </View>
              
            </ImageBackground>
        </View>
    );
};

export default LoginBus;

