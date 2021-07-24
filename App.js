import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import {createAppContainer} from 'react-navigation';

// import HomeScreen from "./src/screens/TabScreen/HomeScreen";
// import PaymentScreen from "./src/screens/TabScreen/Payment/PaymentScreen";
// import HistoryScreen from "./src/screens/TabScreen/HistoryScreen";
// import SettingScreen from "./src/screens/TabScreen/SettingScreen";

import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MainTabScreen from "./src/screens/MainTabScreen";


// const Auth = () => {
//   return (
//     <Stack.Navigator initialRouteName="LoginScreen">
//       <Stack.Screen
//         name="LoginScreen"
//         component={LoginScreen}
//         options={{headerShown: false}}
//       />
//     </Stack.Navigator>
//   );
// };


// const navigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Login: LoginScreen,
//     Splash: SplashScreen,
//     History: HistoryScreen,
//     Payment: PaymentScreen
//   },
//   {
//     initialRouteName: "Payment",
//     defaultNavigationOptions: {
//       title: "Bayar SPP",
//     },
//   }
// );

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="MainTabScreen"
          component={MainTabScreen}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
// export default createAppContainer(navigator);
// export default MyTabs;
