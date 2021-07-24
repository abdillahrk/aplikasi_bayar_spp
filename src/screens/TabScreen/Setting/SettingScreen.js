import React from "react";
import { Text, StyleSheet, View, SafeAreaView, StatusBar, Pressable } from "react-native";
import Scale from "../../../transforms/Scale";
import ChangePasswordScreen from "./ChangePasswordScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingScreen = ({navigation}) => {

  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate('SplashScreen');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <View style={{flexDirection: 'row'}}>
        <Pressable onPress={() => navigation.navigate(ChangePasswordScreen)} style={styles.passwordContainer}>
            <Text style={styles.password}>Ganti Sandi</Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => handleLogout() } style={styles.passwordContainer}>
            <Text style={styles.password}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container : {
    flex:1,
    padding: Scale(5),
    flexDirection: 'column'
  },
  santriContainer : {
    backgroundColor : 'red',
    alignItems: 'flex-start',
    marginVertical: Scale(5),
    height: Scale(105),
    width: Scale(400)
  },
  infoSantri : {
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontFamily: 'Roboto',
    fontSize: Scale(18),
    color: '#000000'
  },
  passwordContainer: {
    backgroundColor : 'green',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: Scale(40),
    marginVertical: Scale(5),
    paddingVertical: Scale(5),
    height: Scale(50),
    width: Scale(400)
  },
  password: {
    fontSize: Scale(20),
    paddingVertical: Scale(7),
    paddingHorizontal: Scale(10)
  }
});

export default SettingScreen;
