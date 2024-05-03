import React, { useState, useEffect } from "react";
import {StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, StatusBar, Button,TouchableOpacity} from 'react-native';
import axios from 'axios';
import Paradas from "./Paradas";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',        
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        width: '100%',
        paddingLeft: 40,
        marginTop: 50,
    },
    subtitle: {
        fontSize: 15,
        width: '100%',        
        paddingLeft: 40,        
        marginTop: 5, // Añade un margen superior para separar los títulos de los subtítulos
    },
    input: {
        width: '80%',
        height: 45,
        borderColor: '#ABABAB',
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: '#E6FAF4',
        paddingLeft: 15,
        marginTop: 10,
    },
    flatList: {        
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        width:'90%',
    },
    item: {        
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius:10,
        borderWidth:1,
        flexDirection:'row',
    },
    origen:{
        fontSize: 15,
        fontWeight: 'bold',
        width: '100%',
    },
});

const API_URL = 'http://10.13.10.191:8080/buses/'; // Remplaza con la URL de tu ap
const browserApi = 'http://10.13.10.191:8080/browseBuses/'; // Remplaza con la URL de tu API  

const Lineas = ({navigation}) => {
    const [routes, setRoutes] = useState([]);

    const Item = ({ title, origin, destination, rute_number }) => (
        <View style={styles.item}>
            <View style={{ width: '75%', height: 80 }}>
                <Text style={styles.origen}>Origen</Text>
                <Text>{origin}</Text>
                <Text style={styles.origen}>Destino</Text>
                <Text>{destination}</Text>
            </View>
            <View style={{ width: '25%', height: 80, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ width: 60, height: 40, borderRadius: 18, borderColor: 'blue', backgroundColor: '#5DC6DE', borderWidth: 2, justifyContent: 'center' }}
                onPress={()=>{navigation.navigate("buslocation",{rute_number,title})}}>
                    <Text style={{ color: 'white', alignSelf: 'center', textAlign: 'center' }}>{title}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setRoutes(response.data);
            })
            .catch(error => {
                console.error('Error fetching routes:', error);
            });
    }, []);

    const browser = (text) => {
        if(text.trim() === ""){
            axios.get(API_URL)
            .then(response => {
                // Maneja la respuesta como desees                
                setRoutes(response.data);
            })
            .catch(error => {
                console.error('Error browsing buses:', error);
            });
        } else {
            axios.get(browserApi + text)
            .then(response => {
                // Maneja la respuesta como desees
                console.log(response.data);
                setRoutes(response.data);
            })
            .catch(error => {
                console.error('Error browsing buses:', error);
            });
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lineas</Text>
            <Text style={styles.subtitle}>Encuentra todas las lineas de los autobuses</Text>
            <TextInput placeholder="Orden numerico" style={styles.input} onChangeText={(text)=>browser(text)}/>

            <SafeAreaView style={styles.flatList}>
                <FlatList
                    data={routes}
                    renderItem={({ item }) => <Item title={item.nombre} origin={item.origen} destination={item.destino} rute_number={item.id_ruta.toString()} />}
                    keyExtractor={item => item.id_ruta.toString()}
                />
            </SafeAreaView>
        </View>
    );
};

export default Lineas;
