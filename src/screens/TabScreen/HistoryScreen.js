import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{useState, useEffect} from "react";
import { Text, StyleSheet,View, FlatList, RefreshControl, ActivityIndicator } from "react-native";
import history from "../../api/History";
import Scale from "../../transforms/Scale";
import moment from "moment";

const HistoryScreen = () => {
  const [transaksi,setTransaksi] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);    
    wait(2000).then(() => setRefreshing(false));
    if(transaksi.length > 0){
      try{
        const nis = await AsyncStorage.getItem('@nis');
        // console.log(nis);
        const response = await history.get(`transaksi/riwayat/${nis}`);
        console.log(response.data.transaksi);
        setTransaksi(response.data.transaksi);
      }catch (error) {
        console.log(error);
      }
    }
  }, [refreshing]);

  const historyApi = async () => {   
    try{
      const nis = await AsyncStorage.getItem('@nis');
      // console.log(nis);
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
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            renderItem={({item}) => {
                return (
                  <View style={styles.container}>
                    <Text style={styles.title}>{item.tanggal_transaksi}</Text>
                    <View style={styles.containerDetail}>
                      <View style={styles.description}>
                      <Text style={styles.description}>{moment().month(item.bulan - 1).format('MMMM')} {item.tahun_ajaran}</Text>
                      </View>
                      <View style={styles.nominal}>
                      <Text style={styles.nominal}>{item.status_transaksi}</Text>
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
    backgroundColor: 'white',
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
