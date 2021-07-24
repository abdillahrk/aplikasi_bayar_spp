import React, { useState } from 'react';
import { Pressable, StyleSheet, SafeAreaView, View, Text, Image, Platform, Button, TextInput, TouchableOpacity } from 'react-native';
import Scale from "../../../transforms/Scale";
import { launchImageLibrary } from 'react-native-image-picker';
import receipt from "../../../api/Payment/Receipt";
import upload from "../../../api/Payment/Upload"

// const createFormData = (image, body = {}) => {
//   let data = new FormData();
//   data.append('image', image)

//   data.append('photo', {
//     name: photo.fileName,
//     type: photo.type,
//     uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
//   });

//   Object.keys(body).forEach((key) => {
//     data.append(key, body[key]);
//   });

//   return data;
// };

const ReceiptScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [kode_unik, setKodeUnik] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeKode = (val) => {
    setKodeUnik(val.toString());
  }

  const handleChoosePhoto = () => {
    console.log("button")
    const options = {
      mediaType: 'photo'
    }
    launchImageLibrary(options, (response) => {
      if (response) {
        setPhoto(response.assets[0]);
      }
    });
  };

  const handleUploadPhoto = async () => {
    console.log('lalala')
    try {
      let data = new FormData();
      data.append('image', {
        name: photo.fileName,
        type: photo.type,
        uri: photo.uri
      })
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
        navigation.navigate('PaymentScreen')
      }
    } catch (error) {
      setErrorMessage('Kode unik dan Bukti Pembayaran harus diisi')
    }
  };

  return (
    <View style={[styles.container, { alignContent: 'center' }]}>
      <Text style={{ fontSize: Scale(20), fontWeight: 'bold' }}>Bukti Pembayaran</Text>
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
          {/* <TouchableOpacity>
          
        </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#E8E8E8' }]}
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
          {/* <Button title="Choose Photo" onPress={handleChoosePhoto} /> */}
          {/* <Button title="Upload Photo" onPress={handleUploadPhoto} /> */}
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