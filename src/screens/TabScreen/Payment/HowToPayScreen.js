import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import Scale from "../../../transforms/Scale";
import PaymentScreen from "../Payment/PaymentScreen";
import ReceiptScreen from "../Payment/ReceiptScreen";


const HowToPayScreen = ({ navigation }) => {
  
  return (
    <View style={[styles.container, { alignContent: 'center' }]}>
        <Text style={{ fontSize: Scale(20), fontWeight: 'bold' }}>Cara bayar SPP via ATM</Text>
        <View >
            <Text style={{fontSize: Scale(17)}}>1. Isi formulir Pembayaran SPP (Tekan tombol Bayar SPP)</Text>
            <Text style={{fontSize: Scale(17)}}>2. Isi jumlah bulan yang akan dibayar</Text>
            <Text style={{fontSize: Scale(17)}}>3. Tekan tombol Lanjut</Text>
            <Text style={{fontSize: Scale(17)}}>
                4. Setelah menekan tombol Lanjut, maka akan keluar Kode Unik (Kode Unik ini berlaku 1 hari)
            </Text>
            <Text style={{fontSize: Scale(17)}}>
                5. Melakukan pembayaran via ATM sesuai dengan nominal dan sertakan kode unik pada 3 digit terakhir 
                nominal
            </Text>
            <Text style={{fontSize: Scale(17)}}>
                (Misal: Anda akan membayar 1 bulan serta kode unik anda adalah '032' maka 
                nominal yang harus dibayar adalah 50.032)
            </Text>
            <Text style={{fontSize: Scale(17)}}>
                6. Upload bukti transfer dengan menekan tombol Upload Bukti Transfer
            </Text>
            <Text style={{fontSize: Scale(17)}}>
                7. Masukkan kode unik dan upload bukti transfer yang sudah anda foto
            </Text>
            <Text style={{fontSize: Scale(17)}}>
                8. Tekan tombol lanjut dan Tunggu konfirmasi pembayaran oleh Admin
            </Text>
        </View>
        <View style={{marginTop: Scale(25)}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {navigation.navigate(PaymentScreen)}}
          >
            <Text style={styles.textStyle}>Bayar SPP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {navigation.navigate(ReceiptScreen)}}
          >
            <Text style={styles.textStyle}>Upload Bukti Transfer</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: Scale(65),
    backgroundColor: 'white',
    marginHorizontal: Scale(10),
    marginBottom: Scale(5)
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

export default HowToPayScreen;