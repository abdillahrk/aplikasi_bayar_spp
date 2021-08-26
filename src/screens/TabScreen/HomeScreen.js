import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect, useCallback} from "react";
import { Text, StyleSheet, StatusBar, View, ScrollView, RefreshControl, SafeAreaView, Pressable} from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import history from "../../api/History";
import Scale from "../../transforms/Scale";
import InfoSantri from '../../components/home/InfoSantri'
import StatusSpp from "../../components/home/StatusSpp"
import TunggakanScreen from "../TabScreen/TunggakanScreen";
import moment from "moment"
import info from "../../api/Home/InfoSantri"
import statusSpp from "../../api/Home/StatusSpp"
import transfers from "../../api/Home/Transfer"


const HomeScreen = ({navigation}) => {
  const tableHead = ['Tgl', 'Bulan', 'SPP', 'Infaq', 'Jumlah', 'Paraf']
  const [transaksi, setTransaksi] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [infoSantri, setInfoSantri] = useState([])
  const [status, setStatus] = useState([]);
  const [transfer, setTransfer] = useState([]);


  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(async() => {
    setRefreshing(true);    
    wait(2000).then(() => setRefreshing(false));
    if(transaksi && transaksi.length > 0){
      try{
        let nis = await AsyncStorage.getItem('@nis')
        const response = await history.get(`transaksi/kartu/${nis}`);
        console.log(response.data.transaksi);
        setTransaksi(_mapDataTransaksi(response.data.transaksi));
      }catch (error) {
        console.log(error);
      }
    } else if (transaksi == null){
      setTransaksi([])
    }
    try{
      const nis = await AsyncStorage.getItem('@nis')
      const response = await statusSpp.get(`santri/status/${nis}`);
      console.log(response.data);
      setStatus(response.data)
    }catch(error){
        console.log(error);
    }
    try{
      let id = await AsyncStorage.getItem('@nis')
      const response = await info.get(`santri/${id}`)
      console.log(response.data)
      setInfoSantri(response.data.santri)
    }catch(error){
        console.log(error)
    }
    try{
      let nis = await AsyncStorage.getItem('@nis')
      const response = await transfers.get(`transfer/${nis}`)
      console.log(response.data)
      setTransfer(response.data)
    }catch(error){
        console.log(error)
    }
  }, [refreshing]);

  const sppApi = async () => {
    // if (transaksi.length > 0){
    try{
      let nis = await AsyncStorage.getItem('@nis')
      const response = await history.get(`transaksi/kartu/${nis}`);
      console.log(response);
      setTransaksi(_mapDataTransaksi(response.data.transaksi));
    }catch (error) {
      console.log(error);
    }
    // }else{
    //   // setTransaksi([])
    // }
  }
  const statusSppApi = async () => {
    try{
      const nis = await AsyncStorage.getItem('@nis')
      const response = await statusSpp.get(`santri/status/${nis}`);
      console.log(response.data);
      setStatus(response.data)
    }catch(error){
        console.log(error);
    }
  }
  const infoApi = async () => {
    try{
        let id = await AsyncStorage.getItem('@nis')
        const response = await info.get(`santri/${id}`)
        console.log(response.data)
        setInfoSantri(response.data.santri)
    }catch(error){
        console.log(error)
    }
  }

  const transferApi = async () => {
    try{
        let nis = await AsyncStorage.getItem('@nis')
        const response = await transfers.get(`transfer/${nis}`)
        console.log(response.data)
        setTransfer(response.data)
    }catch(error){
        console.log(error)
    }
  }

  const _mapDataTransaksi = (data) => {
    if(data.length>0){
      let datas = []
      for(let i = 0; i< data.length; i++){
        let temp = []
        temp = [moment((data[i].tanggal_transaksi)).format("DD-MMM"), moment().month(data[i].bulan - 1).format('MMM') , data[i].spp, data[i].infaq, data[i].total_bayar, data[i].paraf]
        datas.push(temp)
      }
      return datas
    }
  }

  useEffect(() => {
    sppApi()
    infoApi()
    statusSppApi()
    transferApi()
  }, [refreshing])
  
  console.log({transaksi})
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
        <InfoSantri nama_santri={infoSantri.nama_santri} nis={infoSantri.nis} nama_kelas={infoSantri.nama_kelas}/>
        <StatusSpp status={status.status} tunggakan={status.tunggakan} />
        <View style={{alignContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>
        <Pressable
          onPress = {() => {navigation.navigate(TunggakanScreen)}}
        >
          <Text style={{fontSize: Scale(15), color: '#00F' }}> Lihat Tunggakan</Text>
        </Pressable>
        </View>
        {transfer?<Text style={{color: 'red'}}>{transfer.message}</Text> : null}
        <View style={styles.tabelSppContainer}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
            <Rows data={ transaksi || []} textStyle={styles.text}/>
          </Table>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container : {
    flex:1,
    padding: Scale(5)
  },
  tabelSppContainer: {
    marginVertical: 10,
    flexDirection: 'column'
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
