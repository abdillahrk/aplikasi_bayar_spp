import React, { useState } from 'react';
import { Pressable, StyleSheet, SafeAreaView, View, Text, Image, Platform, Button, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import Scale from "../../../transforms/Scale";
import { launchImageLibrary } from 'react-native-image-picker';
import receipt from "../../../api/Payment/Receipt";
import upload from "../../../api/Payment/Upload"


const ReceiptScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [kode_unik, setKodeUnik] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeKode = (val) => {
    setKodeUnik(val.toString());
  }

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo'
    }
    launchImageLibrary(options, (response) => {
      console.log({ response })
      if (response && response.hasOwnProperty('assets')) {
        setPhoto(response.assets[0]);
      }
    });
  };

  const handleUploadPhoto = async () => {
    try {
      let data = new FormData();
      data.append('image', {
        name: photo.fileName,
        type: photo.type,
        uri: photo.uri
      })
      showToast1()
      console.log(data)
      const response = await receipt.post('transfer/upload/gambar', data)
      if (response) {
        console.log(response, kode_unik)
        let body = await upload.put('transfer',
          {
            kode_unik: kode_unik,
            image_name: response.data.file.image_name,
            image_url: response.data.file.image_url
          });
          showToast()
        navigation.navigate('HowtoPayScreen')
      } else if(error){
        setErrorMessage('Ukuran file harus < 2 MB')
      }
    } catch (error) {
      setErrorMessage('Pastikan ukuran file < 2 MB dan Kode unik diisi')
    }
  };

  const showToast1 = () => {
    ToastAndroid.showWithGravity(
      "Mohon Tunggu..",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  };

  const showToast = () => {
    ToastAndroid.showWithGravity(
      "Bukti Pembayaran telah diunggah.",
      ToastAndroid.LONG,
      ToastAndroid.CENTER
    );
  };

  return (
    <View style={[styles.container, { alignContent: 'center' }]}>
      <Text style={{ fontSize: Scale(20), fontWeight: 'bold' }}>Bukti Pembayaran</Text>
      {errorMessage? <Text style={{color: 'red'}}>{errorMessage}</Text>: null}
      <View style={{ flex: 1 }}>
        <TextInput style={[styles.input, { marginTop: 20 }]}
          placeholder='Masukkan Kode Unik'
          keyboardType='numeric'
          maxLength={3}
          onChangeText={handleChangeKode}
          value={kode_unik}
        />
        {/* {photo && (
        <>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      )} */}
        <Image
          source={{ uri: photo && photo.uri }}
          style={{ width: Scale(300), height: Scale(300), alignItems: 'center' }}
        />
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleChoosePhoto}
          >
            <Text style={styles.textStyle}>Browse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleUploadPhoto}
          >
            <Text style={styles.textStyle}>Lanjut</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: Scale(65),
    backgroundColor: 'white',
    marginHorizontal: Scale(5),
    marginBottom: Scale(5)
  },
  input: {
    height: 40,
    backgroundColor: '#adadad',
    color: '#000000',
    marginVertical: 5,
    marginHorizontal: 5
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

export default ReceiptScreen;