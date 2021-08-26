import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Scale from "../transforms/Scale";

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from "./TabScreen/HomeScreen";
import TunggakanScreen from "./TabScreen/TunggakanScreen";
import HowToPayScreen from "./TabScreen/Payment/HowToPayScreen";
import PaymentScreen from "./TabScreen/Payment/PaymentScreen";
import ReceiptScreen from "./TabScreen/Payment/ReceiptScreen";
import HistoryScreen from "./TabScreen/HistoryScreen";
import SettingScreen from "./TabScreen/Setting/SettingScreen";
import ChangePasswordScreen from "./TabScreen/Setting/ChangePasswordScreen";

const Tab = createMaterialBottomTabNavigator();
  
const Stack = createStackNavigator();

const Home = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="Beranda"
        component={HomeScreen}
      />
      <Stack.Screen
        name="TunggakanScreen"
        component={TunggakanScreen}
        options={{
          title: 'Tunggakan', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const Payment = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="HowtoPayScreen">
      <Stack.Screen
        name="HowtoPayScreen"
        component={HowToPayScreen}
        options={{
          title: 'Cara Bayar SPP', //Set Header Title
        }}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          title: 'Bayar SPP', //Set Header Title
        }}
      />
      <Stack.Screen
        name="ReceiptScreen"
        component={ReceiptScreen}
        options={{
          title: 'Bayar SPP', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const History = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="HistoryScreen">
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{title: 'Riwayat Pembayaran'}}
      />
    </Stack.Navigator>
  );
};

const Setting = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="SettingScreen">
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{title: 'Pengaturan'}}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          title: 'Ganti Sandi', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

function MainTabScreen() {
    return (
        <Tab.Navigator
          //shifting={true}
          activeColor="#004e00"
          inactiveColor="#adadad"
          barStyle={{ backgroundColor: '#ffffff' }}
        >
          <Tab.Screen 
            name="Beranda" 
            component={Home}
            options={{
              // tabBarIcon: () => (
              //   <MaterialCommunityIcons name="home-outline" size={26} />
              // ),
            }}
          />
          <Tab.Screen 
            name="Bayar" 
            component={Payment} 
            options={{
              // tabBarIcon: ({ color }) => (
              //   <MaterialCommunityIcons name="credit-card" color={color} size={26} />
              // ),
            }}
          />
          <Tab.Screen 
            name="Riwayat" 
            component={History} 
            options={{
              // tabBarIcon: ({ color }) => (
              //   <MaterialCommunityIcons name="history" color={color} size={26} />
              // ),
              title: 'Riwayat Pembayaran'
            }}
          />
          <Tab.Screen 
            name="Pengaturan" 
            component={Setting} 
            options={{
              // tabBarIcon: ({ color }) => (
              //   <MaterialCommunityIcons name="account-settings-outline" color={color} size={26} />
              // ),
            }}
          />
        </Tab.Navigator>
    );
}

export default MainTabScreen;