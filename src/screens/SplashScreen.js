import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';
import Scale from "../transforms/Scale";

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
    //State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setAnimating(false);
        //Check if user_id is set or not
        //If not then send for Authentication
        //else send to Home Screen
        AsyncStorage.getItem('@token').then((value) =>
          navigation.replace(
            value === null ? 'Login' : 'MainTabScreen'
          ),
        );
        AsyncStorage.getItem('@token').then((value) => 
        console.log(value)
        );
      }, 5000);
    }, []);
  
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/logo.png')}
          style={{height: 150, width: 150, resizeMode: 'contain', margin: 30}}
        />
        <Text style={styles.title}>SM</Text>
        <Text style={styles.desc}>SPP</Text>
        <Text style={styles.desc}>Mubarokulhuda</Text>
        <ActivityIndicator
          animating={animating}
          color="#FFFFFF"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#368756',
    },
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
    title : {
        fontWeight : 'bold',
        fontSize : 50,
        color: 'white'
    },
    desc : {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    }
});

export default SplashScreen;