import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{useState, useEffect} from "react";
import { Text, StyleSheet,View, FlatList } from "react-native";
import history from "../../api/History";
import Scale from "../../transforms/Scale";

const HistoryScreen = () => {
  const [transaksi,setTransaksi] = useState([]);
  const historyApi = async () => {   
    try{
      const nis = await AsyncStorage.getItem('@nis');
      console.log(nis);
      const response = await history.get(`transaksi/riwayat/${nis}`);
      console.log(response.data.transaksi);
      setTransaksi(response.data.transaksi);
    }catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    historyApi()
  }, [])
  return (
    <View>
        <FlatList
            keyExtractor={transaksi => transaksi.id_transaksi}
            data={transaksi}
            renderItem={({item}) => {
                return (
                  <View style={styles.container}>
                    <Text style={styles.title}>{item.tanggal_transaksi}</Text>
                    <View style={styles.containerDetail}>
                      <View style={styles.description}>
                      <Text style={styles.description}>SPP & Infaq</Text>
                      </View>
                      <View style={styles.nominal}>
                      <Text style={styles.nominal}>Rp. {item.total_bayar}</Text>
                      </View>
                    </View>
                  </View>
                );
            }}
        />
    </View>                
  );
};

const styles = StyleSheet.create({
  container: {
    height: Scale(65),
    marginHorizontal: Scale(10),
    marginBottom: Scale(5),
    paddingHorizontal: Scale(5),
    paddingVertical: Scale(5)
  },
  containerDetail: {
    backgroundColor : 'white',
    marginVertical: Scale(5),
    flexDirection: 'row'
  },
  title: {
    color:'#adadad', 
    fontSize: Scale(15), 
    fontFamily: 'Roboto'
  },
  description: {
    color: 'black',
    fontSize: Scale(20), 
    fontFamily: 'Roboto',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    width: Scale(290)
  },
  nominal: {
    color: 'black',
    fontSize: Scale(20), 
    fontFamily: 'Roboto',
    width: Scale(110),
    alignContent: 'center',
    alignItems: 'center'
  }
});

export default HistoryScreen;
