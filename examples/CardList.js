import React from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CarList = () => {
  const carData = [
    { id: '1', name: 'Carro 1', imageSource: require('./assets/logo.png') },
    { id: '2', name: 'Carro 2', imageSource: require('./assets/logo.png') },
    { id: '3', name: 'Carro 3', imageSource: require('./assets/logo.png') },
    // Agrega más datos de carros según sea necesario
  ];

  const renderItem = ({ item }) => (
    <View style={styles.carContainer}>
      <Image source={item.imageSource} style={styles.carImage} />
      <Text style={styles.carName}>{item.name}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ver Detalles</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={carData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth:2,
  },
  carContainer: {
    marginBottom: 16,
  },
  carImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CarList;
