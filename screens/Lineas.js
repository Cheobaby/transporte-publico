import React from "react";
import {StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, StatusBar, Button,TouchableOpacity} from 'react-native';

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

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Origen',
      origin:'Boulevares del cimatario',
      destination:'Fracc Vistana Flores',
      rute_number:'07',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Origen',
      origin:'Puertas de San Miguel',      
      destination:'Doctores del bosque',
      rute_number:'08',      
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Origen',
      origin:'San juan de los cabos',
      destination:'Azucenas del rio',
      rute_number:'04',
    },
  ];
  

  const Item = ({title,origin,destination,rute_number}) => (
    <View style={styles.item}>
        <View style={{width:'75%',height:80}}>
            <Text style={styles.origen}>{title}</Text>
            <Text>{origin}</Text>
            <Text style={styles.origen}>Destino</Text> 
            <Text>{destination}</Text>   
        </View>  
        <View style={{width:'25%',height:80,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={{width:60,height:40,borderRadius:18,borderColor:'blue',backgroundColor:'#5DC6DE',borderWidth:2,justifyContent:'center'}}>
                <Text style={{color:'white',alignSelf:'center',textAlign:'center'}}>{rute_number}</Text>
            </TouchableOpacity>
        </View>  
    </View>
  );

const Lineas = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lineas</Text>
            <Text style={styles.subtitle}>Encuentra todas las lineas de los autobuses</Text>
            <TextInput placeholder="Orden numerico"
            style={styles.input}/>

            <SafeAreaView style={styles.flatList}>
                <FlatList
                    data={DATA}
                    renderItem={({item}) => <Item title={item.title} origin={item.origin} destination={item.destination} rute_number={item.rute_number} />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </View>
    );
};

export default Lineas;
