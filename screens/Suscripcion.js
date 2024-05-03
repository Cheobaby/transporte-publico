import React, { useEffect, useState } from 'react';
import { StyleSheet, View, StatusBar, Text, FlatList, SafeAreaView, TouchableOpacity, Dimensions, Modal, Button } from 'react-native';
import axios from 'axios';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginStart: 35,
        marginTop: 50,
        alignSelf: 'flex-start',
    },
    subtitle: {
        marginStart: 35,
        fontSize: 13,
        fontWeight: 'bold',
        color: 'green',
        alignSelf: 'flex-start',
    },
    item: {
        padding: 20,
        marginVertical: 7,
        width: windowWidth * 0.82,
        height: windowHeight * 0.21,
        borderRadius: 8,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#A1F3DA',
        alignItems: 'center',
    },
    payment: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#3ED8EA',
    },
    buttonView: {
        width: windowWidth,
        height: windowHeight * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 8,
        backgroundColor: '#161D1D',
        height: 50,
        width: '65%',
        justifyContent: 'center',
    },
    cost: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    bodyFlatList: {
        width: windowWidth * 0.90,
        height: windowHeight * 0.65,
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalViewSettings: {
        width: windowWidth * 0.65,
        height: windowHeight * 0.30,
        borderRadius: 15,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

const Suscripcion = ({ navigation }) => {
    //const API_URL = 'http://10.13.10.191:8080/getPackages'; // Remplaza con la URL de tu ap
    const API_URL = 'http://dtai.uteq.edu.mx/~noemar210/movixScript/getSuscripcion.php'; // Remplaza con la URL de tu ap
    const [packages, setPackages] = useState([]);
    const [checked, setChecked] = useState('unchecked');
    const [modal, setModal] = useState(false);
    const [idPackage,setIdPackage]=useState(0);
    const [packagePrice,setPackagePrice]=useState(0);
    /*useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setPackages(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching routes:', error);
            });
    }, []);*/


    useEffect(() => {
            fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                setPackages(data);
                console.log('Datos recibidos:', data); // Esto imprimirá los datos por consola
            })
            .catch((error) => console.error('Error al obtener los datos:', error));
    }, []);


    const Item = ({ id, nombre, precio, duracion, descripcion }) => (
        <View style={styles.item}>
            <View style={{ width: windowWidth * 0.61, justifyContent: 'flex-start' }}>
                <Text style={styles.payment}>{nombre}</Text>
                <Text style={styles.cost}>{precio} MXN/{duracion}</Text>
                <Text>{descripcion}</Text>
            </View>
            <View style={{ width: '20%', height: 60, justifyContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <RadioButton
                    value={id}
                    status={checked === id ? 'checked' : 'unchecked'}
                    onPress={() => { setChecked(id), setIdPackage(id),setPackagePrice(precio); }}
                />
            </View>
        </View>
    );
    const datos = {
        id: idPackage,
        price: packagePrice
      };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Suscripción</Text>
            <Text style={styles.subtitle}>¡Subscríbete ahora y ahorra en tus viajes diarios con nuestras ofertas exclusivas!</Text>
            <SafeAreaView style={styles.bodyFlatList}>
                <FlatList
                    data={packages}
                    renderItem={({ item }) => <Item id={item.id_paquete} nombre={item.nombre} precio={item.precio} duracion={item.duracion} descripcion={item.descripcion} />}
                    keyExtractor={item => item.id_paquete.toString()}
                />
            </SafeAreaView>
            <View style={styles.buttonView}>
                <TouchableOpacity onPress={() => { setModal(!modal) }} style={styles.button}>
                    <Text style={{ color: '#FFFFFF', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Cambiar plan</Text>
                </TouchableOpacity>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modal}
                        onRequestClose={() => {
                            setModal(!modal);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalViewSettings}>
                                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Elige un método de pago</Text>
                                <TouchableOpacity onPress={() => {setModal(!modal),navigation.navigate('paypal',{datos})}} style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, paddingHorizontal: 18, color: 'blue', backgroundColor: '#93b4ff', borderRadius: 4 }}>Paypal</Text>
                                    <Icon size={22} color={'blue'} name="logo-paypal"></Icon>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, paddingHorizontal: 10, color: 'green', backgroundColor: '#79fc88', borderRadius: 4 }}>Mercado Pago</Text>
                                    <Icon size={22} color={'green'} name="wallet"></Icon>
                                </TouchableOpacity>
                                <Button title='Cancelar' onPress={() => { setModal(!modal) }} />
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </View>

    );
};

export default Suscripcion;
















