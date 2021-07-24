import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Scale from "../../transforms/Scale";
import info from "../../api/Home/InfoSantri"
import AsyncStorage from '@react-native-async-storage/async-storage';

const InfoSantri = () => {
    const [infoSantri, setInfoSantri] = useState([])
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
    useEffect(() => {
        infoApi()
    }, [])
    return (
        <View style={styles.santriContainer}>
            <Text style={styles.infoSantri}>{infoSantri.nama_santri}</Text>
            <Text style={styles.infoSantri}>{infoSantri.nis}</Text>
            <Text style={styles.infoSantri}>{infoSantri.nama_kelas}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    santriContainer : {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginVertical: Scale(5),
        marginHorizontal: Scale(5),
        width: Scale(400)
    },
    infoSantri : {
        flexDirection: 'column',
        alignItems: 'flex-start',
        fontFamily: 'Roboto',
        fontSize: Scale(20),
        color: '#000000',
        fontWeight: 'bold'
    }
});

export default InfoSantri;

