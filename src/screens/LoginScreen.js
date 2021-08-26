import React, { useState, useEffect } from "react";
import {
    Text, StyleSheet, Image, View, TextInput, SafeAreaView, Button, ToastAndroid, TouchableOpacity
} from "react-native";
import login from "../api/Login";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Scale from "../transforms/Scale";

const LoginScreen = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // useEffect(() => {
    //     console.log(username)
    // }, [username])

    const loginApi = async () => {
        // AsyncStorage.setItem("token", "kjasdkjabfkjsdfkjasdfksdafu");
        try {
            const response = login.post('santri/login', {
                username: username,
                password: password
            });
            AsyncStorage.setItem("@token", (await response).data.token);
            AsyncStorage.setItem("@nis", (await response).data.username);
            console.log(response);
            console.log((await response).data);
            showToastWithGravity();
            props.navigation.navigate("MainTabScreen");
        } catch (error) {
            console.log(error)
            setErrorMessage('NIS atau Password Salah')
        }
    }

    const handleChangeUsername = (val) => {
        setUsername(val);
    };

    const handleChangePassword = (val) => {
        setPassword(val);
    };

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
          "Login Berhasil",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../assets/logo.png')}>
                    </Image>
                </View>
                <View>
                    <Text style={styles.title}>SPP Mubarokulhuda</Text>
                    {errorMessage? <Text style={{color: 'red'}}>{errorMessage}</Text>: null}
                    <TextInput style={styles.input}
                        placeholder='Masukkan NIS Anda'
                        keyboardType='numeric'
                        maxLength={9}
                        returnKeyType='next'
                        autoCorrect={false}
                        onChangeText={handleChangeUsername}
                        value={username}
                    />
                    <TextInput style={styles.input}
                        placeholder='Masukkan Password'
                        textContentType='password'
                        secureTextEntry={true}
                        onChangeText={handleChangePassword}
                        value={password}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => loginApi()}
                    >
                        <Text style={styles.textStyle}>Masuk</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    logo: {
        width: Scale(150),
        height: Scale(150),
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        marginVertical: 10,
        opacity: 0.9,
        fontFamily: 'Roboto'
    },
    input: {
        height: 40,
        backgroundColor: '#adadad',
        color: '#000000',
        marginVertical: 10,
        paddingHorizontal: 10,
        width: 250
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#368756",
        alignItems: 'center',
        marginVertical: 5
    }
});

export default LoginScreen;