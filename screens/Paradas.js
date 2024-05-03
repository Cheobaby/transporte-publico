import React, { useEffect, useState } from 'react';
import {Button, StyleSheet,Text,View,Dimensions,StatusBar,SafeAreaView,VirtualizedList,} from 'react-native';
import axios from 'axios';
const { width, height } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',  
        marginTop: StatusBar.currentHeight || 0,      
    },
    header:{
        width,
        height:70,
        justifyContent:'center',
    },
    body:{
        width,
        height,        
        alignItems:'center',
    },
    item:{        
        width:windowWidth*0.85,
        height,        
    },
    list:{
        backgroundColor:'#e8f5ff',    
        marginVertical:5,    
        borderWidth:1,
        borderColor:'#5698ff',
        height:windowHeight*0.14,
        borderRadius:10,
    },
});


const Paradas = ({ navigation, route }) => {
    const ruteNumber = route.params.rute_number.toString();
    const API = `http://10.13.10.191:8080/getBusStops/${ruteNumber}`;
    const [data, setData] = useState([]);    

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(API);
            setData(response.data);
            //setCont(1); // Reinicia el valor de cont a 1 después de obtener los datos
          } catch (error) {
            console.error('Error al obtener datos de la API:', error);
          }
        };
      
        fetchData();        
    }, []);
      
  
      const renderItem = ({ item }, index=0) => (
        <View style={styles.list}>
          <Text style={{ fontWeight: 'bold', fontSize: 15,marginHorizontal:20}}>Parada</Text>
          <Text style={{marginHorizontal:20}}>{item.nombre}</Text>
        </View>        
      );
                  
  
    const getItem = (data, index) => {
      return data[index];
    };
  
    const getItemCount = (data) => {
      return data.length;
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontWeight: 'bold', fontSize: 25, marginHorizontal: 30 }}>Paradas</Text>
          <Text style={{ fontSize: 13, marginHorizontal: 30 }}>Estas son las paradas de la ruta {route.params.title}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.item}>
            <SafeAreaView style={styles.container}>
              <VirtualizedList
                initialNumToRender={4}
                renderItem={renderItem}
                keyExtractor={(item) => item.id_parada.toString()} // Usar el id_parada como clave única
                getItemCount={() => getItemCount(data)}
                getItem={(data, index) => getItem(data, index)}
                data={data} // Pasar los datos obtenidos de la API a la lista virtualizada
              />
            </SafeAreaView>
          </View>
        </View>
      </View>
    );
  };

export default Paradas;