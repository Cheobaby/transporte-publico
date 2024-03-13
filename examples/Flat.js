import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,  
  TouchableOpacity,
} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>    
      <View style={{flexDirection:'row'}}>
        <Text style={styles.title}>{title}</Text>          
        <Button title='Click'
        style={{alignSelf:'flex-end'}}/>
      </View>
    <View style={{width:'40%',height:35,alignSelf:'flex-end'}}>      
      <Button title='Click'/>
    </View>   
  </View>
);

const Flat = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
      <View style={{justifyContent:'center',alignItems:'center'}}>
       <TouchableOpacity style={{backgroundColor:'blue',width:200,height:50,borderRadius:10}}>
          <Text>Click</Text>
       </TouchableOpacity>
      </View>      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,       
  },
  title: {
    fontSize: 32,
    paddingRight:100,
  },
});

export default Flat;





