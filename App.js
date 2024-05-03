import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ejemplo usando Ionicons onc
import LoginBus from './screens/LoginBus';
import Lineas from './screens/Lineas';
import Suscripcion from './screens/Suscripcion';
import DetallesPago from "./screens/DetallesPago";
import User from './screens/User';
import Home from './screens/Home';
import MisLugares from './screens/MisLugares';
import Qr from './screens/Qr';
import CodeBar from './screens/CodeBar';
import { createStackNavigator } from "@react-navigation/stack";
import Paradas from "./screens/Paradas";
import Login from './screens/Login';
import CreateAccount from "./screens/CreateAccount";
import BusLocation from "./screens/BusLocation";
import Paypal from './screens/Paypal';
const Stack=createStackNavigator();
const Tab = createBottomTabNavigator();

const MainNavigator = ({ route }) => {
  const { idUser } = route.params;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ idUser: idUser }}
        options={{ tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
          headerShown: false // Oculta la barra de navegación en esta pantalla
        }}
      />
      <Tab.Screen 
        name="Lineas" 
        component={Lineas} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'bus' : 'bus-outline'} size={size} color={color} />
          ),
          headerShown: false // Oculta la barra de navegación en esta pantalla
        }} 
      />
      <Tab.Screen        
        name="Mis lugares"
        component={MisLugares}
        initialParams={{ idUser: idUser }}
        options={{ tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'bookmark' : 'bookmark-outline'} size={size} color={color} />
          ),
          headerShown: false // Oculta la barra de navegación en esta pantalla
        }}
      />
      <Tab.Screen        
        name="Suscripción"
        component={Suscripcion}
        options={{ tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={size} color={color} />
          ),
          headerShown: false // Oculta la barra de navegación en esta pantalla
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={User}
        options={{ tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
          ),
          headerShown: false // Oculta la barra de navegación en esta pantalla
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (        
    <NavigationContainer>
      <Stack.Navigator>     
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }}/>        
        <Stack.Screen name="acount" component={CreateAccount} options={{ headerShown: false }}/>         
        <Stack.Screen name="Login" component={LoginBus} options={{ headerShown: false }}/>
        <Stack.Screen name="Qr" component={Qr} options={{ headerShown: false }}/>
        <Stack.Screen name="codebar" component={CodeBar} options={{ headerShown: false }}/> 
        <Stack.Screen name="Paradas" component={Paradas} options={{ headerShown: false }}/>
        <Stack.Screen name="user" component={User} options={{ headerShown: false }}/>     
        <Stack.Screen name="buslocation" component={BusLocation} options={{ headerShown: false }}/>         
        <Stack.Screen name="paypal" component={Paypal} options={{ headerShown: false }}/>         
        <Stack.Screen 
          name="Main" 
          component={MainNavigator} 
          options={{ headerShown: false }}
        />     
      </Stack.Navigator>
    </NavigationContainer>
  );
}



