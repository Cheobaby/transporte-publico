import React from "react";
import {View,StyleSheet,style} from 'react-native'
const MyComponent = () => {
    return (
      <View style={{ height: '100%' }}>
        <View style={{ backgroundColor: 'red', flex: 1 }} />
        <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'blue', width: 100, height: 50 }} />
      </View>
    );
  };
  
export default MyComponent;  