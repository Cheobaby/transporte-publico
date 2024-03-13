import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ejemplo usando Ionicons
import LoginBus from './screens/LoginBus';
import CrearCuenta from "./screens/CrearCuenta";
import Lineas from './screens/Lineas';
import Suscripcion from './screens/Suscripcion';
import DetallesPago from "./screens/DetallesPago";
import User from './screens/User';
import Home from './screens/Home';


export default function App() {
  return(    
    <CrearCuenta/>
  );
}



