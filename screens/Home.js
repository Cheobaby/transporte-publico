import React from "react";
import {Text,TextInput, View,StyleSheet,Button,Image, ImageBackground} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ejemplo usando Ionicons
import Lineas from './Lineas';
import User from './User';

const Tab = createBottomTabNavigator();

const Home=({navigation})=>{
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={'#3B98E0'} />
            )
          }} 
        />
        <Tab.Screen 
          name="Lineas" 
          component={Lineas} 
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Ionicons name={focused ? 'bus' : 'bus-outline'} size={size} color={color} />
            )
          }} 
        />
        <Tab.Screen
        name="Perfil"
        component={User}
        options={{
          tabBarIcon:({focused,color,size})=>(
            <Ionicons name={focused?'person':'person-outline'} size={size} color={color}/>
          )
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Home;