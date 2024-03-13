import React from "react";
import {StyleSheet, Text, View, StatusBar, Button,TouchableOpacity,Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',     
        backgroundColor:'#4F5866',   
    },
    header:{
        width:'100%',
        height:'45%',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    footer:{
        width:'100%',
        backgroundColor:'#FFFFFF',
        height:'45%',        
        borderTopEndRadius:37,
        borderTopStartRadius:37,
        alignItems:'center',
    },
    title:{
        marginStart:40,
        marginTop:20,
        fontSize:20,
        fontWeight:'bold',  
        width:'100%',
    },
    labelSettings:{
        flexDirection:'row',
        width:'90%',        
        height:50,
        alignItems:'center',        
    },
    image:{
        width:150,
        height:150,
        borderRadius:75,
    },
    nameUser:{
        marginTop:10,
        fontSize:18,
        fontWeight:'bold',
        color:'#FFFFFF',
    },
    emailText:{
        marginTop:10,
        color:'#FFFFFF',
    },
    optionsIcons:{
        marginTop:10,       
        width:'65%',
        height:70,
        flexDirection:'row',        
    },
    buttons:{
        backgroundColor:'#FFFFFF',
        width:60,
        height:60,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
    },
    helpIcon:{
        backgroundColor:'#FFFFFF',
        width:60,
        height:60,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
        marginStart:130,
    },
    nameButtons:{
        flexDirection:'row',
        width:'100%',
    },
});

const User=()=>{
    return (
        <View style={styles.container}>  
            <TouchableOpacity style={{width:'100%',marginStart:35,marginVertical:5}}>
                <Ionicons name="arrow-back" size={39} color="white" />
            </TouchableOpacity>      
            <View style={styles.header}>
                <Image style={styles.image} source={require('../assets/perfil.png')}/>
                <Text style={styles.nameUser}>David Jerome</Text>
                <Text style={styles.emailText}>David@gmail.com</Text>
                <View style={styles.optionsIcons}>
                    <TouchableOpacity style={styles.buttons}>
                        <Ionicons name="notifications-outline" size={25} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.helpIcon}>
                        <Ionicons name="help-circle-sharp" size={35}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.nameButtons}>
                    <Text style={{color:'#FFFFFF',fontWeight:'bold',marginStart:50}}>Notificaciones</Text>
                    <Text style={{color:'#FFFFFF',fontWeight:'bold',paddingLeft:130}}>Ayuda</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.title}>Configuración</Text>
                <View style={styles.labelSettings}>
                    <Ionicons name="call" size={30}/>
                    <Text style={{marginStart:20,fontSize:15}}>Número de Teléfono</Text>
                    <Text style={{paddingLeft:70, color:'#FF0000'}}>Añadir número</Text>
                </View>
                <View style={styles.labelSettings}>
                    <Ionicons name="pencil-sharp" size={30}/>
                    <Text style={{marginStart:20,fontSize:15}}>Editar Perfil</Text>
                    <Text style={{paddingLeft:182, color:'#FF0000'}}>Editar</Text>
                </View>
                <View style={styles.labelSettings}>
                    <Ionicons name="notifications" size={30}/>
                    <Text style={{marginStart:20,fontSize:15}}>Configurar Notificaciones</Text>
                    <Text style={{paddingLeft:86, color:'#FF0000'}}>Editar</Text>
                </View>
                <View style={styles.labelSettings}>
                    <Ionicons name="exit-outline" size={30}/>
                    <Text style={{marginStart:20,fontSize:15}}>Cerrar Sesión</Text>                    
                </View>
            </View>
        </View>
    );
};

export default User;