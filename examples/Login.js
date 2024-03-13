import React from "react";
import {Text,TextInput, View,StyleSheet,Button,Image} from 'react-native';

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',    
        backgroundColor:'#3DF0A1',    
    }, 
    title:{
        fontSize:40,
        fontWeight:'bold',             
    },
    labelName:{   
        width:'100%',
        marginTop:40,     
        alignItems:'flex-end',
        padding:5,
        paddingLeft:46,
    },
    input:{       
        fontSize:20,        
        borderWidth:2,  
        padding:10,
        width:'80%',   
        borderRadius:10,   
        backgroundColor:'#3DF0A1'
    },
    imagen:{
        width:'100%',
        height:200,  
    },
    footer:{                
        width:'100%',
        position:'absolute',
        bottom:0,
    },
    imageFooter:{                
        width:'100%',
        height:100,
    },
});

const Login=()=>{
    return (
        <View style={styles.container}>
            <Image style={styles.imagen} source={require('./assets/logo.png')}/>
            <Text style={styles.title}>Login</Text>
            <Text>Sing in to continue</Text>
            <Text style={styles.labelName}>NAME</Text>
            <TextInput
            placeholder="Enter your name"
            style={styles.input}/>
            <Text style={{width:'100%',paddingLeft:46,padding:10}}>PASSWORD</Text>
            <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            />
            <View style={{padding:10,width:'84%',marginTop:15}}>
                <Button title="Log in" color={'#F6F005'}/>
            </View>
            <View style={styles.footer}>
                <Image style={styles.imageFooter} source={require('./assets/footer01.png')}/>
            </View>
            
        </View>
    );
};

export default Login;