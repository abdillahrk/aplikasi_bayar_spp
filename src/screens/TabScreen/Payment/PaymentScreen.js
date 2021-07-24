import React, { useState, useRef } from "react";
import { StyleSheet, SafeAreaView, TextInput, Button, View, Modal, Text, Pressable } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Scale from "../../../transforms/Scale";
import payment from "../../../api/Payment/Payment";
import ReceiptScreen from "../Payment/ReceiptScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("1")
  // const [nis, setNis] = useState('');
  const [jumlah_bulan, setJumlahBulan] = useState('');
  const [spp, setSpp] = useState(35000);
  const [infaq, setInfaq] = useState(15000);
  const [total_transfer, setTotalTransfer] = useState(spp + infaq);
  const [kode_transfer, setKodeTransfer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const paymentApi = async () => {
    try {
      const nis = await AsyncStorage.getItem('@nis')
      const response = await payment.post('transfer', {
        nis: nis,
        jumlah_bulan: parseInt(jumlah_bulan),
        spp: parseInt(spp),
        infaq: parseInt(infaq),
        total_transfer: parseInt(total_transfer),
      });

      setModalVisible(true);
      setKodeTransfer(response.data.kode_transfer);
      // AsyncStorage.setItem("@kode_unik", response.data.kode_transfer);

    } catch (error) {
      setErrorMessage('Bulan wajib diisi')
    }
  }

  // const handleChangeNis = (val) => {
  //   setNis(val);
  // };

  const handleChangeBulan = (val = 0) => {
    let month = val === '' ? 1 : parseInt(val)
    let valSpp = month * 35000
    let valInfaq = month * 15000
    let total = valSpp + valInfaq
    console.log(month, spp, infaq, isNaN(val), val)
    setSpp(valSpp)
    setInfaq(valInfaq)
    setTotalTransfer(total)
    setJumlahBulan(month);
  };

  const handleChangeSpp = (val) => {
    setSpp(jumlah_bulan * 35000);
  };

  const handleChangeInfaq = (event) => {
    setInfaq(jumlah_bulan * 15000);
  };

  const handleChangeTotal = (event) => {
    setTotalTransfer(spp + infaq);
  };

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  return (
    <SafeAreaView style={styles.container}>
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
            <Text style={[styles.modalText, {fontSize: 20}]}>Kode Unik</Text>
            <Text style={[styles.modalText, {fontSize: 40, color: '#666666'}]}>{kode_transfer}</Text>
            <Text style={[styles.modalText, {fontSize: 10, color: '#666666'}]}>Kode unik hanya berlaku 1 hari</Text>
            <Pressable
              style={[styles.button, styles.buttonLanjut]}
              onPress={() => {
                navigation.navigate(ReceiptScreen)
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>Lanjut</Text>
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
      <View style={styles.container}>
      {errorMessage? <Text style={{color: 'red'}}>{errorMessage}</Text>: null}
        <View>
          {/* <TextInput style={styles.input}
            placeholder='Masukkan NIS Anda'
            keyboardType="default"
            maxLength={9}
            returnKeyType='next'
            autoCorrect={false}
            onChangeText={handleChangeNis}
            value={nis}
          /> */}
          {/* <Picker style={styles.input}
            ref={pickerRef}
            selectedValue={jumlah_bulan}
            style={{}}
            onValueChange={handleChangeBulan}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
          </Picker> */}
          <TextInput style={[styles.input, {marginTop: 20}]}
            defaultValue={0}
            placeholder='Masukkan Jumlah Bulan'
            keyboardType='numeric'
            maxLength={2}
            returnKeyType='next'
            onChangeText={handleChangeBulan}
            value={jumlah_bulan.toString()}
          />
          <TextInput style={styles.input}
            placeholder='SPP'
            keyboardType='numeric'
            returnKeyType='next'
            editable={false}
            defaultValue="35000"
            value={spp.toString()}
          />
          <TextInput style={styles.input}
            placeholder='Infaq'
            keyboardType='numeric'
            returnKeyType='next'
            editable={false}
            defaultValue="15000"
            value={infaq.toString()}
          />
          <TextInput style={styles.input}
            placeholder='Total transfer'
            keyboardType='numeric'
            editable={false}
            returnKeyType='next'
            defaultValue='50000'
            value={total_transfer.toString()}
          />
          <Button
            title="Lanjut"
            color="#368756"
            onPress={() => paymentApi()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: Scale(50),
    width: Scale(400),
    backgroundColor: '#E8E8E8',
    color: '#000000',
    marginBottom: 20,
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
      width: (0),
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
    width: 200,
    alignItems: 'center',
    marginVertical: 5
  },
  buttonLanjut: {
    backgroundColor: "#ffffff",
  },
  buttonLanjut: {
    backgroundColor: "#368756",
  }
});

export default PaymentScreen;
