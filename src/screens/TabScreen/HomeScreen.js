import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect} from "react";
import { Text, StyleSheet, StatusBar, View, ScrollView, RefreshControl, SafeAreaView, TouchableOpacity} from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import history from "../../api/History";
import Scale from "../../transforms/Scale";
import InfoSantri from '../../components/home/InfoSantri'
import StatusSpp from "../../components/home/StatusSpp"
import moment from "moment"


const HomeScreen = () => {
  const tableHead = ['Tgl', 'Bulan', 'SPP', 'Infaq', 'Jumlah', 'Paraf']
  const [tableData, setData] = useState([]);
  const [transaksi, setTransaksi] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);


  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const sppApi = async () => {
    try{
      let nis = await AsyncStorage.getItem('@nis')
      const response = await history.get(`transaksi/kartu/${nis}`);
      console.log(response.data.transaksi);
      setTransaksi(_mapDataTransaksi(response.data.transaksi));
    }catch (error) {
      console.log(error);
    }
  }

  const _mapDataTransaksi = (data) => {
    if(data.length>0){
      let datas = []
      for(let i = 0; i< data.length; i++){
        let temp = []
        temp = [data[i].tanggal_transaksi, moment().month(data[i].bulan - 1).format('MMM') , data[i].spp, data[i].infaq, data[i].total_bayar, data[i].paraf]
        datas.push(temp)
      }
      return datas
    }
  }

  useEffect(() => {
    sppApi()
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <InfoSantri />
        <StatusSpp />
        <View style={styles.tabelSppContainer}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
            { transaksi && 
            <Rows data={transaksi} textStyle={styles.text}/>
            }            
          </Table>
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container : {
    flex:1,
    padding: Scale(5),
    flexDirection: 'column'
  },
  tabelSppContainer: {
    marginVertical: 10
  },
  head: { 
    height: 40, 
    backgroundColor: '#3B945E'
  },
  text: { 
    margin: 3,
     textAlign: 'center' 
  },
  scrollView: {
    flex: 1
  },
});

export default HomeScreen;
