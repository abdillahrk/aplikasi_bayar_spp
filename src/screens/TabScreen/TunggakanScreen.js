import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect, useCallback} from "react";
import { Text, StyleSheet, StatusBar, View, FlatList, RefreshControl} from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import history from "../../api/History";
import Scale from "../../transforms/Scale";
import tunggakans from "../../api/Home/Tunggakan";


const TunggakanScreen = () => {
  const [tunggakan, setTunggakan] = useState([]);
  const [id, setId] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);    
    wait(2000).then(() => setRefreshing(false));
    if(tunggakan.length > 0){
        try{
            let nis = await AsyncStorage.getItem('@nis')
            const response = await tunggakans.get(`santri/tunggakan/${nis}`)
            console.log(response.data)
            setTunggakan(response.data.tunggakan)
        }catch(error){
            console.log(error)
        }
    }
  }, [refreshing]);

  const tunggakanApi = async () => {
    try{
        let nis = await AsyncStorage.getItem('@nis')
        const response = await tunggakans.get(`santri/tunggakan/${nis}`)
        console.log(response)
        // setTunggakan(Object.assign({}, response.data.tunggakan))
        setTunggakan(response.data.tunggakan)
    }catch(error){
        console.log(error)
    }
  }
  useEffect(() => {
    tunggakanApi()
  }, [refreshing])

  return (
    <View>
        <FlatList
            keyExtractor={tunggakan => tunggakan}
            data={tunggakan}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            renderItem={({item}) => {
                return (
                  <View style={styles.container}>
                    <Text style={styles.description}>{item}</Text>
                  </View>
                );
            }}
        />
        {/* <Text>{tunggakan}</Text> */}
        {/* <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>]
            <Rows data={tunggakan} textStyle={styles.text}/>
        </Table> */}
    </View>     
  );
};

const styles = StyleSheet.create({
    container: {
        height: Scale(40),
        backgroundColor: 'white',
        marginHorizontal: Scale(10),
        marginBottom: Scale(5),
        paddingHorizontal: Scale(5),
        paddingVertical: Scale(5),
        backgroundColor : 'white'
    },
    description: {
        color: '#000',
        fontSize: Scale(20)
    },
    text: { 
      margin: 3,
       textAlign: 'center' 
    }
});

export default TunggakanScreen;
