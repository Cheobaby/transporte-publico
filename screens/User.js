import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Modal, Pressable, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from "react-native-gesture-handler";
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const User = ({ navigation }) => {
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [tel, setTel] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const getUserData = async () => {
        try {
            const id = await AsyncStorage.getItem('id');
            const nombre = await AsyncStorage.getItem('nombre');
            const correo = await AsyncStorage.getItem('correo');
            const tel = await AsyncStorage.getItem('tel');
            setId(id);
            setCorreo(correo);
            setNombre(nombre);
            setTel(tel);
        } catch (error) {
            console.log('Error al obtener los datos de usuario:', error);
        }
    };
    const removeUserData = async () => {
        try {
            await AsyncStorage.removeItem('id');
            await AsyncStorage.removeItem('nombre');
            await AsyncStorage.removeItem('correo');
            await AsyncStorage.removeItem('tel');
            /*console.log('Datos de usuario eliminados exitosamente');
            console.log(nombre);
            console.log(correo);*/
            navigation.navigate('login');
        } catch (error) {
            console.log('Error al eliminar los datos de usuario:', error);
        }
    };
    useEffect(() => {
        getUserData();
    }, []);

    /*const handleSubmit=()=>{        
        const data={            
            nombre:nombre,
            correo: correo,
            tel:tel,
        };        
  
        axios
          .put(`http://10.13.10.191:8080/updateDataUser/${id}`, data)
          .then((response) => {    
            updateChanges();
            setModalVisible(false);
            alert('Datos actualizados');
          })
          .catch((error) => {
            alert('Error al actualizar datos');
          });
    };*/


    const handleSubmit = () => {
        const url = 'http://dtai.uteq.edu.mx/~noemar210/T-210/Movix/webservice/camiones/updateData'; // Asegúrate de usar tu URL correcta
        const datosParaEnviar = {
          id: id,
          nombre: nombre,
          correo: correo,
          tel: tel,
        };
      
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: Object.keys(datosParaEnviar)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(datosParaEnviar[key]))
            .join('&')
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          updateChanges();
          setModalVisible(false);
          alert('Datos actualizados');
        })
        .catch(error => {
          console.error('Error:', error);
        });
    };
      

    const updateChanges = async () => {

        await AsyncStorage.setItem('nombre', nombre);
        await AsyncStorage.setItem('correo', correo);
        await AsyncStorage.setItem('tel', tel);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ width: '100%', marginLeft: windowWidth * 0.05, marginVertical: windowHeight * 0.01 }}>
                <Ionicons name="arrow-back" size={windowWidth * 0.1} color="white" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Image style={styles.image} source={require('../assets/perfil.png')} />
                <Text style={styles.nameUser}>{nombre}</Text>
                <Text style={styles.emailText}>{correo}</Text>
                <View style={styles.optionsIcons}>
                    <TouchableOpacity style={styles.buttons}>
                        <Ionicons name="notifications-outline" size={windowWidth * 0.07} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.helpIcon}>
                        <Ionicons name="help-circle-sharp" size={windowWidth * 0.1} />
                    </TouchableOpacity>
                </View>
                <View style={styles.nameButtons}>
                    <Text style={styles.whiteText}>Notificaciones</Text>
                    <Text style={styles.whiteTextAyuda}>Ayuda</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.title}>Configuración</Text>
                <View style={styles.labelSettings}>
                    <Ionicons name="pencil-sharp" size={windowWidth * 0.08} />
                    <Text style={styles.labelText}>Editar Perfil</Text>
                    <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                        <Text style={{ color: '#FF0000', marginLeft: windowWidth * 0.45, }}>Editar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.labelSettings}>
                    <Ionicons name="call" size={windowWidth * 0.08} />
                    <Text style={styles.labelText}>{tel}</Text>
                </View>

                <View style={styles.labelSettings}>
                    <Ionicons name="notifications" size={windowWidth * 0.08} />
                    <Text style={styles.labelText}>Configurar Notificaciones</Text>
                    <TouchableOpacity>
                        <Text style={{ color: '#FF0000', marginLeft: windowWidth * 0.20 }}>Editar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.labelSettings}>
                    <TouchableOpacity onPress={removeUserData}>
                        <Ionicons name="exit-outline" size={windowWidth * 0.08} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={removeUserData}>
                        <Text style={styles.labelText}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: windowWidth * 0.90, height: windowHeight * 0.42, backgroundColor: '#288cff', justifyContent: 'flex-start', alignItems: 'center', borderRadius: 15 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 15 }}>EDITAR DATOS</Text>
                                <Text style={styles.labelModal}>Nombre</Text>
                                <TextInput style={styles.textInputModal} value={nombre} onChangeText={(nombre) => { setNombre(nombre) }} />
                                <Text style={styles.labelModal}>Correo electrónico</Text>
                                <TextInput style={styles.textInputModal} value={correo} onChangeText={(correo) => { setCorreo(correo) }} />
                                <Text style={styles.labelModal}>Número de teléfono</Text>
                                <TextInput style={styles.textInputModal} value={tel} keyboardType="numeric" onChangeText={(tel) => { setTel(tel) }} />
                                <Button title="Guardar cambios" color={'#133e95'} style={{ marginTop: 20 }} onPress={handleSubmit} />
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#4F5866',
    },
    header: {
        width: '100%',
        height: '45%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    footer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        height: '45%',
        borderTopEndRadius: windowWidth * 0.08,
        borderTopStartRadius: windowWidth * 0.08,
        alignItems: 'center',
    },
    title: {
        marginStart: windowWidth * 0.1,
        marginTop: windowHeight * 0.02,
        fontSize: windowWidth * 0.05,
        fontWeight: 'bold',
        width: '100%',
    },
    labelSettings: {
        flexDirection: 'row',
        width: '90%',
        height: windowHeight * 0.08,
        alignItems: 'center',
    },
    labelText: {
        marginStart: windowWidth * 0.05,
        fontSize: windowWidth * 0.04,
    },

    image: {
        width: windowWidth * 0.4,
        height: windowWidth * 0.4,
        borderRadius: windowWidth * 0.2,
    },
    nameUser: {
        marginTop: windowHeight * 0.01,
        fontSize: windowWidth * 0.06,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    emailText: {
        marginTop: windowHeight * 0.01,
        color: '#FFFFFF',
    },
    optionsIcons: {
        marginTop: windowHeight * 0.01,
        width: '65%',
        height: windowHeight * 0.1,
        flexDirection: 'row',
    },
    buttons: {
        backgroundColor: '#FFFFFF',
        width: windowWidth * 0.15,
        height: windowWidth * 0.15,
        borderRadius: windowWidth * 0.075,
        justifyContent: 'center',
        alignItems: 'center',
    },
    helpIcon: {
        backgroundColor: '#FFFFFF',
        width: windowWidth * 0.15,
        height: windowWidth * 0.15,
        borderRadius: windowWidth * 0.075,
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: windowWidth * 0.35,
    },
    nameButtons: {
        flexDirection: 'row',
        width: '100%',
    },
    whiteText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginStart: windowWidth * 0.12,
    },
    whiteTextAyuda: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: windowWidth * 0.22,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    textInputModal: {
        backgroundColor: '#d7ecff',
        width: windowWidth * 0.75,
        borderRadius: 5,
        marginVertical: 12,
        paddingHorizontal: 17,
    },
    labelModal: {
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginHorizontal: 26, color: 'white',
    },
});

export default User;
