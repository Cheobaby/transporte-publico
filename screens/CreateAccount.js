import React, { useState } from 'react';
import {View,Text,StyleSheet,Dimensions,StatusBar,Image,TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CreateAccount = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = () => {
      const data = {
        username: username,
        email: email,
        tel: tel,
        password: password,
      };
      console.log(data.username, data.email, data.tel, data.password);
  
      axios
        .post('http://192.168.100.28:8080/registerUser', data)
        .then((response) => {
          alert('Usuario creado correctamente');
        })
        .catch((error) => {
          alert('Error al crear el usuario');
        });
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={require('../assets/log.png')}
          />
          <Text style={{ marginHorizontal: 30, fontSize: 22, fontWeight: 'bold' }}>Crear una cuenta</Text>
          <Text style={{ marginHorizontal: 30, fontSize: 13, marginTop: 7 }}>Crea tu cuenta y comienza a disfrutar de viajes sin complicaciones.</Text>
        </View>
        <View style={styles.body}>
          <Text>Ingrese su nombre</Text>
          <TextInput
            placeholder='Jhon Dalton'
            style={styles.inputs}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
  
          <Text>Ingrese un correo electrónico</Text>
          <TextInput
            placeholder='JhonExample32@hotmail.com'
            style={styles.inputs}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text>Ingrese un numero de teléfono</Text>
          <TextInput
            placeholder='4422323189'
            keyboardType='numeric'
            style={styles.inputs}
            value={tel}
            onChangeText={(text) => setTel(text)}
          />
          <Text>Ingrese una contraseña</Text>
          <TextInput
            secureTextEntry
            style={styles.inputs}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => { navigation.navigate('login') }}>
            <Text style={{ fontWeight: 'bold', color: 'blue' }}>Ingresa aquí</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
    },
    header:{       
        width:windowWidth,
        height:windowHeight*0.27,        
        justifyContent:'center',  
    },
    image:{
        width:windowHeight*0.30,
        height:windowHeight*0.10,
    },
    body:{
        width:windowWidth*0.83,        
        height:windowHeight*0.55,
    },
    inputs:{
        borderRadius:8,    
        borderColor:'blue',
        height:windowHeight*0.06,
        marginTop:10,
        marginVertical:10,
        paddingHorizontal:15,
        backgroundColor:'#c3d4fa',
    },
    button:{
        backgroundColor:'blue',
        alignItems:'center',
        borderRadius:8,
        height:windowHeight*0.05,
        justifyContent:'center',
        marginTop:15,
    },
    footer:{
        width:windowWidth*0.83,        
        flexDirection:'row',
    },
});

export default CreateAccount;