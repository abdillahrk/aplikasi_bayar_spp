import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Scale from "../../transforms/Scale";
import statusSpp from "../../api/Home/StatusSpp"

const StatusSpp = ({status, tunggakan}) => {
    // const [status, setStatus] = useState([]);

    // const statusSppApi = async () => {
    //     try{
    //       const nis = await AsyncStorage.getItem('@nis')
    //       const response = await statusSpp.get(`santri/status/${nis}`);
    //       console.log(response.data);
    //       setStatus(response.data)
    //     }catch(error){
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     statusSppApi()
    // }, [])

    return (
        <View style={styles.statusSppContainer}>
          <View style={styles.statusSpp}>
          {status == 1? <Text style={{color: 'black', fontWeight: 'bold', fontSize: Scale(30)}}>Lunas</Text>: null}
          {status == 0?<Text style={{color: 'black', fontWeight: 'bold', fontSize: Scale(23)}}>Belum Lunas</Text>: null}
          {/* <Text style={styles.textSpp}>{status.status}</Text> */}
          <Text style={{fontSize: Scale(13), color: '#969696'}}>Status SPP</Text>
          </View>
          <View style={styles.statusTunggakan}>
          <Text style={styles.textSpp}>{tunggakan}</Text>
          <Text style={{fontSize: Scale(13), color: '#969696'}}>Tunggakan</Text>
          </View>
          <View style={styles.tahunAjar}>
          <Text style={styles.textSpp}>2021</Text>
          <Text style={{fontSize: Scale(13), color: '#969696'}}>Tahun Pelajaran</Text>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    statusSppContainer: {
        backgroundColor : 'white',
        marginTop: 5,
        flexDirection: 'row',
        height: Scale(90),
        width: Scale(405),
        paddingVertical: Scale(15)
    },
    statusSpp: {
        width: Scale(133),
        alignContent: 'center',
        alignItems: 'center',
        color: '#000000'
    },
    statusTunggakan: {
        width: Scale(133),
        alignContent: 'center',
        alignItems: 'center'
    },
    tahunAjar: {
        width: Scale(133),
        alignContent: 'center',
        alignItems: 'center'
    },
    textSpp: {
        fontSize: Scale(30),
        fontWeight: 'bold'
    }
});

export default StatusSpp;