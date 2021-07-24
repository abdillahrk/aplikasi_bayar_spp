import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState} from "react";
import { Text, StyleSheet, View, SafeAreaView, StatusBar, Button, Pressable, TextInput, Modal } from "react-native";
import changePassword from "../../../api/Settting/ChangePassword"
import Scale from "../../../transforms/Scale";

const ChangePasswordScreen = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordBaru, setPasswordBaru] = useState('');
    // const [passwordBaru2, setPasswordBaru2] = useState('');

    const changePasswordApi = async () => {
      try {
          const nis = await AsyncStorage.getItem('@nis')
          const response = await changePassword.put(`santri/password/${nis}`, {
              password_lama: password,
              password_baru: passwordBaru
          });
          console.log((await response).data);
          props.navigation.navigate("SettingScreen")
      } catch (error) {
          console.log(error);
      }
    }

    const handleChangePasswordLama = (val) => {
        setPassword(val);
    };
    
    const handleChangePasswordBaru = (val) => {
        setPasswordBaru(val);
    };

    const handleChangePasswordBaru2 = (val) => {
        setPasswordBaru2(val);
    };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Warning !</Text>
            <Text style={styles.modalText}>Yakin ingin mengubah Password Anda ?</Text>
            <Pressable
              style={[styles.button, styles.buttonLanjut]}
              onPress={() => changePasswordApi()}
            >
              <Text style={styles.textStyle}>Ya</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonKembali]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Kembali</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View>
        <TextInput style={styles.input}
            placeholder='Password Saat Ini'
            keyboardType="default"
            maxLength={9}
            returnKeyType='next'
            autoCorrect={false}
            onChangeText={handleChangePasswordLama}
            value={password}
        />
        <TextInput style={styles.input}
            placeholder='Password Baru'
            keyboardType="default"
            maxLength={9}
            returnKeyType='next'
            autoCorrect={false}
            onChangeText={handleChangePasswordBaru}
            value={passwordBaru}
        />
        {/* <TextInput style={styles.input}
            placeholder='Ulangi Password Baru'
            keyboardType="default"
            maxLength={9}
            returnKeyType='next'
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={handleChangePasswordBaru2}
            value={passwordBaru2}
        /> */}
        <Button
            title="Lanjut"
            color="#368756"
            onPress={() => setModalVisible(true)}
          />
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
  passwordContainer : {
    backgroundColor : 'red',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: Scale(5),
    height: Scale(105),
    width: Scale(400)
  },
  input: {
    height: 40,
    backgroundColor: '#adadad',
    color: '#000000',
    marginVertical: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: Scale(100),
    alignItems: 'center'

  },
  buttonLanjut: {
    backgroundColor: "#ffffff"
  },
  buttonLanjut: {
    backgroundColor: "#368756"
  }
});

export default ChangePasswordScreen;
