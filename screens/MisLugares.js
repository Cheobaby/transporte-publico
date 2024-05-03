import { StyleSheet, Text, View, TouchableOpacity, Dimensions, SafeAreaView, FlatList, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as React from 'react';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';


const { width, height } = Dimensions.get('window');


const MisLugares = ({ navigation, route }) => {
  const [origin, setOrigin] = React.useState({
    latitude: 20.6594077,
    longitude: -100.3382577,
  });


  const [locationAddress, setLocationAddress] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [lat, setLat] = React.useState(null);
  const [long, setLong] = React.useState(null);
  const [addressName, setAddressName] = React.useState(null);
  const [nameAddress, setNameAddress] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalSettings, setModalSettings] = React.useState(false);
  const [modalUpdate, setModalUpdate] = React.useState(false);
  const [id, setId] = React.useState(0);
  const mapRef = React.useRef(null);


  React.useEffect(() => {
    getLocationPermission();
  }, [])


  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    setOrigin(current);
    getAddressFromLocation(current);
  }


  async function getAddressFromLocation(coords) {
    let address = await Location.reverseGeocodeAsync(coords);
    setLocationAddress(address[0]);
    console.log("Nombre de la ubicación:", address[0].formattedAddress);
    console.log("Latitud:", coords.latitude);
    console.log("Longitud:", coords.longitude);
    setAddressName(address[0].formattedAddress);
    setLat(coords.latitude);
    setLong(coords.longitude);
  }


  // Función para imprimir la dirección de la ubicación en la consola
  React.useEffect(() => {
    if (locationAddress) {
      console.log("Dirección de la ubicación:", locationAddress);
    }
  }, [locationAddress]);


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://10.13.10.191:8080/getSavedLocations/${route.params.idUser}`);
        setData(response.data);
      } catch (error) {
        console.log('Error al obtener los datos de la API:', error);
      }
    };
    fetchData();
  }, [modalVisible, modalSettings]);




  const handleAddressPress = (location) => {
    const selectedLocation = {
      latitude: parseFloat(location.latitud),
      longitude: parseFloat(location.longitud),
    };
    setOrigin(selectedLocation);
    getAddressFromLocation(selectedLocation);

    // Animar el mapa hacia la ubicación seleccionada
    mapRef.current.animateToRegion({
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.06,
    }, 1000);
  };


  const renderItem = ({ item }) => (
    <View style={{ ...styles.item, width: width * 0.9, marginHorizontal: 15, height: height * 0.14 }}>
      <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => { setModalSettings(true), setId(item.id) }}>
          <Icon name="settings-outline" size={30}></Icon>
        </TouchableOpacity>
      </View>
      <View style={{ width: '80%', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => handleAddressPress(item)}>
          <Text style={{ fontWeight: 'bold' }}>{item.nombre}</Text>
          <Text>{item.location_name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


  const handleSubmit = async () => {
    const dataLocation = {
      nombre: nameAddress,
      id: route.params.idUser,
      lat: lat,
      long: long,
      nameLocation: addressName
    };
    axios
      .post('http://10.13.10.191:8080/saveLocation', dataLocation)
      .then((response) => {
        if (response.data != 0) {
          setModalVisible(false);
          setNameAddress('');
          alert("Dirección guardada con exito");
        }
      })
      .catch((error) => {
        //console.log('Error al iniciar sesión');
        alert("Error al guardar la localización");
      });
  };


  const updateName = async () => {
    const data = { nombre: nameAddress };
    axios
      .put(`http://10.13.10.191:8080/updateLocation/${id}`, data)
      .then((response) => {
        if (response.data != 0) {
          setModalSettings(!modalSettings);
          setModalUpdate(!modalUpdate);
          setNameAddress('');
          alert("Chambio realizado");
        }
      })
      .catch((error) => {
        //console.log('Error al iniciar sesión');
        alert("Hubo un error");
      });
  };


  const deleteLocation = async () => {
    axios
      .delete(`http://10.13.10.191:8080/deleteSavedLocation/${id}`)
      .then((response) => {
        if (response.data != 0) {
          setModalSettings(!modalSettings);
          alert("Lugar eliminado");
        }
      })
      .catch((error) => {
        //console.log('Error al iniciar sesión');
        alert("Intentalo de nuevo hubo un error");
      });
  };


  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 35, marginStart: 20, marginVertical: 10 }}>Mis lugares</Text>
      </View>
      <View style={styles.body}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.06,
          }}
        >
          <Marker
            draggable
            coordinate={origin}
            onDragEnd={(event) => {
              const newCoords = event.nativeEvent.coordinate;
              setOrigin(newCoords);
              getAddressFromLocation(newCoords);
            }}
          />
          <MapViewDirections apikey={'api-key'} />
        </MapView>
      </View>
      <View style={styles.list}>
        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold', marginVertical: 10, marginHorizontal: 20 }}>Guardadas</Text>
        <View style={{ height: 210, width: width * 0.95, alignItems: 'center' }}>
          <SafeAreaView>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
          </SafeAreaView>
        </View>
      </View>
      <View style={{ marginTop: 35 }}>
        <TouchableOpacity onPress={() => { setModalVisible(true) }} style={{ marginTop: 15, backgroundColor: 'blue', width: width * 0.4, borderRadius: 10, height: 40, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold' }}>Agregar</Text>
        </TouchableOpacity>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.headerModal}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Nombre de tu ubicación</Text>
                </View>
                <Text style={{ alignSelf: 'flex-start', marginHorizontal: 20, color: 'white', marginVertical: 8, fontWeight: 'bold' }}>Nombre:</Text>
                <TextInput style={{
                  backgroundColor: '#ededed', width: width * 0.80, height: 30, borderRadius: 7, paddingHorizontal: 15, shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
                  value={nameAddress}
                  onChangeText={(nameAddress) => { setNameAddress(nameAddress) }} />
                <TouchableOpacity style={{ backgroundColor: '#0008ff', borderRadius: 6, marginTop: 16, width: width * 0.35, height: 30, justifyContent: 'center' }}
                  onPress={handleSubmit}>
                  <Text style={{ color: 'white', alignSelf: 'center' }}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalSettings}
            onRequestClose={() => {
              setModalSettings(!modalSettings);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalViewSettings}>
                <TouchableOpacity onPress={() => { setModalUpdate(!modalUpdate) }} style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15, paddingHorizontal: 18 }}>Editar</Text>
                  <Icon size={22} color={'blue'} name="create-outline"></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteLocation} style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15, paddingHorizontal: 10 }}>Eliminar</Text>
                  <Icon size={22} color={'red'} name="trash-outline"></Icon>
                </TouchableOpacity>
                <Button title='Cancelar' onPress={() => { setModalSettings(!modalSettings) }} />
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalUpdate}
            onRequestClose={() => {
              setModalUpdate(!modalUpdate);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalUpdateLocations}>
                <View style={styles.headerUpdateSettings}>
                  <Text style={{ fontWeight: 'bold', color: 'white' }}>Actualizar</Text>
                </View>
                <Text style={{ alignSelf: 'flex-start', marginHorizontal: 20, color: 'white', marginVertical: 8, fontWeight: 'bold' }}>Nombre:</Text>
                <TextInput style={{
                  backgroundColor: '#ededed', width: width * 0.80, height: 30, borderRadius: 7, paddingHorizontal: 15, shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
                  value={nameAddress}
                  onChangeText={(nameAddress) => { setNameAddress(nameAddress) }} />
                <View style={{ flexDirection: 'row', width: width * 0.80, height: height * 0.05, alignItems: 'center', justifyContent: 'space-evenly', marginTop: 25 }}>
                  <Button color={'blue'} title='Guardar' onPress={updateName} />
                  <Button color={'red'} title='Cancelar' onPress={() => { setModalUpdate(!modalUpdate), setModalSettings(!modalSettings) }} />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#EBECF4',
  },
  title: {
    backgroundColor: '#2447E5',
    width,
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  body: {
    width,
    height: height * 0.4,
  },
  map: {
    width,
    height: height * 0.4,
  },
  list: {
    width,
    height: height * 0.29,
  },
  item: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C3CAC1',
    backgroundColor: '#ffffff',
    marginVertical: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  headerModal: {
    width: width * 0.90,
    height: height * 0.05,
    backgroundColor: 'blue',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: width * 0.90,
    height: height * 0.22,
    backgroundColor: '#a8bfff',
    borderRadius: 15,
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
  modalViewSettings: {
    width: width * 0.45,
    height: height * 0.20,
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
  headerUpdateSettings: {
    width: width * 0.90,
    height: height * 0.05,
    backgroundColor: 'blue',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalUpdateLocations: {
    height: height * 0.25,
    width: width * 0.90,
    borderRadius: 15,
    backgroundColor: '#a8bfff',
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



export default MisLugares;















