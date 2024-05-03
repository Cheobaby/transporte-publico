import { StyleSheet, Text, View, TouchableOpacity, Dimensions, SafeAreaView, FlatList,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as React from 'react';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
const { width, height } = Dimensions.get('window');


const BusLocation = ({ navigation, route }) => {
  const [busDirection, setBusDirection] = React.useState(1);
  const [buttonBusDirection, setButtonBusDirection] = React.useState('Ida');
  const [data, setData] = React.useState([]);
  const mapViewRef = React.useRef(null);
  const [cantPersonas,setCantPersonas]=React.useState('');

  const [origin, setOrigin] = React.useState({
    latitude: 20.581436,
    longitude: -100.390633,
  });
  const [busLocation, setBusLocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });
  const [locationAddress, setLocationAddress] = React.useState(null);


  // Función para imprimir la dirección de la ubicación en la consola
  React.useEffect(() => {
    if (locationAddress) {
      //console.log("Dirección de la ubicación:", locationAddress);
    }
  }, [locationAddress]);


  const fetchData = async () => {
    try {
      const response = await axios.get(`http://10.13.10.191:8080/getBusStops/${route.params.rute_number}/${busDirection}`);
      setData(response.data);
      //console.log(response.data);
    } catch (error) {
      console.log('Error al obtener los datos de la API:', error);
    }
  };


  React.useEffect(() => {
    if (data.length > 0 && mapViewRef.current) {
      const coordinates = data.map((item) => ({
        latitude: parseFloat(item.latitud),
        longitude: parseFloat(item.longitud),
      }));
      mapViewRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [data]);

  const getBusLocation = async () => {
    try {
      const response = await axios.get('http://10.13.10.191:8080/gpsLocation');
      const { Latitud, Longitud,Movimiento} = response.data;
      setBusLocation({
        latitude: parseFloat(Latitud),
        longitude: parseFloat(Longitud),        
      });
      setCantPersonas(Movimiento);
      //console.log("Cantidad Personas ",Movimiento);
      //console.log(response.data);            
    } catch (error) {
      console.log('Error al obtener los datos de la ubicacion del bus:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
    getBusLocation();
  }, [buttonBusDirection, busDirection,cantPersonas]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      getBusLocation();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);


  const Item = ({ title, lat, long }) => (
    <TouchableOpacity
      onPress={() => {
        const selectedLocation = {
          latitude: parseFloat(lat),
          longitude: parseFloat(long),
        };
        setOrigin(selectedLocation);
        mapViewRef.current.animateToRegion(
          {
            ...selectedLocation,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          },
          1000
        );
      }}
    >
      <View style={styles.rowLines}>
        <Icon size={30} color={'blue'} name="bus"></Icon>
        <Text style={{ marginLeft: 10, color: '#0e5928' }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 19 }}>Localización de paradas</Text>
      </View>
      <View style={styles.body}>
        <MapView ref={mapViewRef} style={styles.map}>
          <Marker draggable coordinate={origin} onDragEnd={(direction) => { setOrigin(direction.nativeEvent.coordinate) }} />
          <Marker coordinate={busLocation} icon={require('../assets/busLocation.png')} />
          {data.map((item) => (
            <Marker
              key={item.id_parada}
              coordinate={{
                latitude: parseFloat(item.latitud),
                longitude: parseFloat(item.longitud),
              }}
              icon={require('../assets/BusStop.png')}               
            />
          ))}
          {data.map((item, index) => {
            if (index < data.length - 1) {
              const origin = {
                latitude: parseFloat(item.latitud),
                longitude: parseFloat(item.longitud),
              };
              const destination = {
                latitude: parseFloat(data[index + 1].latitud),
                longitude: parseFloat(data[index + 1].longitud),
              };
              return (
                <MapViewDirections
                  key={index}
                  origin={origin}
                  destination={destination}
                  apikey={'api-key'}
                  strokeWidth={3}
                  strokeColor="#229dff"
                />
              );
            }
          })}
        </MapView>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerTitle}>
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>Paradas {route.params.title}</Text>
          <Text style={{ marginLeft: 20, color: 'blue' }}>Cant: {cantPersonas}</Text>
          <Text style={{ marginLeft: 20, color: 'blue' }}>Dirección:</Text>          
          <TouchableOpacity onPress={() => { setBusDirection(busDirection === 1 ? 2 : 1), setButtonBusDirection(buttonBusDirection === 'Ida' ? 'Vuelta' : 'Ida') }} style={styles.busButtonDirection}>
            <Icon size={23} color={'blue'} name="compass-outline"></Icon>
            <Text style={{ marginLeft: 3, color: 'blue' }}>{buttonBusDirection}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerList}>
          <SafeAreaView style={{ width: width * 0.90, height: height * 0.28 }}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                  <Item title={item.nombre} lat={item.latitud} long={item.longitud} />
                )}
                keyExtractor={(item) => item.id_parada.toString()}
            />
          </SafeAreaView>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    width: width,
    height: height * 0.10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14d0ff',
  },
  body: {
    width: width,
    height: height * 0.55,
  },
  footerTitle: {
    width: width * 0.90,
    height: height * 0.06,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    width: width,
    height: height,
    backgroundColor: '#cdfaff',
    alignItems: 'center',
  },
  containerList: {
    width: width * 0.90,
    height: height * 0.28,
  },
  map: {
    width: width,
    height: height * 0.55,
  },
  busButtonDirection: {
    backgroundColor: '#09b03f',
    width: width * 0.22,
    height: height * 0.04,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  rowLines: {
    height: height * 0.10,
    flexDirection: 'row',
    borderRadius: 7,
    backgroundColor: '#7cf9a3',
    marginVertical: 4,
    alignItems: 'center',
  },
  markerImage: {
    width: 10, // Ancho deseado
    height: 10, // Alto deseado
    resizeMode: 'contain'
  },
});


export default BusLocation;




