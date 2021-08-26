import React, {useState} from "react";
import { Text, StyleSheet, View, SafeAreaView, StatusBar, Pressable, Modal } from "react-native";
import Scale from "../../../transforms/Scale";
import ChangePasswordScreen from "./ChangePasswordScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    AsyncStorage.clear();
    setModalVisible(!modalVisible)
    navigation.navigate('SplashScreen');
  }

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
            <Text style={styles.modalText}>Anda yakin keluar dari aplikasi ?</Text>
            <Pressable
              style={[styles.button, styles.buttonLanjut]}
              onPress={() => handleLogout()}
            >
              <Text style={styles.textStyle}>Ya</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonKembali]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Tidak</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{flexDirection: 'row'}}>
        <Pressable onPress={() => navigation.navigate(ChangePasswordScreen)} style={styles.passwordContainer}>
            <Text style={styles.password}>Ganti Sandi</Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => setModalVisible(true) } style={styles.passwordContainer}>
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
  passwordContainer: {
    backgroundColor : 'white',
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

export default SettingScreen;
