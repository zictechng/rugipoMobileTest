import React, {
  useContext,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  Button,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { StatusBar } from "expo-status-bar";
import { UserContext } from "../components/UserContext";
import {
  Ionicons,
  Entypo,
  SimpleLineIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NumberValueFormat } from "../components/FormatValue";
import { gs, colors } from "../styles";
// import { SafeAreaView } from "react-native-safe-area-context";
import client from "../api/client";

let stopFetchMore = true;
const ListFooterComponent = () => (
  <Text
    style={{
      fontSize: 16,
      fontFamily: "_semiBold",
      textAlign: "center",
      padding: 5,
    }}
  >
    <ActivityIndicator size="large" color={colors.secondaryColor1} />
    
  </Text>
);
const HistoryScreen = () => {
  
  const navigation = useNavigation();

  const [
    loginState,
    setLoginState,
    isLoading,
    setIsLoading,
    myDetails,
    setMyDetails,
  ] = useContext(UserContext);


  const [fetchLoading, setFetchLoading] = useState();
  const [recordLoading, setRecordLoading] = useState(false);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [noMoreRecord, setNoMoreRecord] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const setData = async () => {
    //setRecordLoading(true);
    setLoadingMore(true);
    try {
      const res = await client.get(
        `api/all_history/${myDetails._id}?page=${currentPage}`
      );
      if (
        !Array.isArray(res.data) ||
        res.data.length === 0 ||
        res.data.status === "401" 
      ) {
       
        setAllDataFetched(false);
        return setLoadingMore(false);
      }
      setTransactions([...res.data]);
    } catch (e) {
      console.log(e);
    } finally {
      //setRecordLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreRecord = async () => {
    if (loadingMore || allDataFetched) return;

    setCurrentPage(currentPage + 1);
    try {
      setLoadingMore(true);
      const res = await client.get(
        `api/all_history/${myDetails._id}?page=${currentPage + 1}`
      );

      if (
        !Array.isArray(res.data) ||
        res.data.length === 0 ||
        res.data.status === "401" ||
        res.data.status === "404"
      ) {
        setAllDataFetched(true);
        setNoMoreRecord(true)
        setLoadingMore(false);
       return;
      }

      setTransactions([...transactions, ...res.data]);
      
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingMore(false);
    }
  };

  
  useEffect(() => {
    setData();
  }, []);


  // flat list data here
  const recentTranDataInfo = ({ item , index }) => (
    <TouchableOpacity style={styles.recentTransaction}
        onPress={() =>{
          
        }}  key={index} >
      
        <View style={{flexDirection:'row', alignItems:'center'}}>
          
          <View>
          {item.transac_nature =='Debit'? <Ionicons name="ios-arrow-down-circle-sharp"
            size={30} color="#ea3372" marginLeft={8}/> : <Ionicons name="ios-arrow-up-circle-sharp"
            size={30} color="#09d97b" marginLeft={8}/>}
          </View>
            
          {/* text */}
          <View style={{flexDirection:'column',
            justifyContent:'flex-start', marginLeft: 10}}>
          <Text style={{fontFamily:'_semiBold',
              color:'#aaa', fontSize:13, marginTop: 5}}>{item.tran_type} | {item.transac_nature}</Text>
            <Text style={{fontFamily:'_semiBold', fontSize:13, marginBottom: 5}}>{item.transac_nature =='Debit'? '-' : '+'}<NumberValueFormat value={item.amount} /></Text>
          </View>
        </View>

        {/* price Send and indicator */}
          <View style={{flexDirection:'column',
            backgroundColor:'#fff', alignItems:'center',
              justifyContent:'center'}}>
            {/* navigation Icon */}
        
            {/* date and navigation sign*/}
              <View style={{flexDirection:'row', alignItems:'center',
                justifyContent:'center'}}>
                <Text style={{fontFamily:'_semiBold', fontSize:10, color:"#aaa"}}>{moment(item.creditOn).format("DD/mm/YYYY hh:mm:ss")}</Text>
                <FontAwesome name="angle-right"
              size={25} color="#aaa" style={{marginLeft:10}} />
              </View>

        </View>
    </TouchableOpacity>
  );


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
    <StatusBar
      style="light" translucent={true} backgroundColor='transparent'animated={true} />


         {/* header of the screen */}
      <LinearGradient
        colors={[colors.secondaryColor2, colors.secondaryColor2]}
        start={[0, 0]}
        end={[1, 1]}
        style={{ elevation: 30, shadowColor: '#930D2F'}}
      >
        <View style={[gs.rowBetween, { marginTop: 18, marginHorizontal: 10 }]}>
          <TouchableOpacity
            style={styles.circleIconLeft}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" color={colors.text} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleIconLeft1}>
            <Text
              style={{ fontSize: 22, fontFamily: "_semiBold", color: "#fff" }}
            >
              History
            </Text>
          </TouchableOpacity>
          <View style={styles.nameView}></View>

          {/* <Text style = {styles.text}>{new Date().toString().slice(0,11)}</Text> */}
        </View>
      </LinearGradient>

        {/* This show a dash round line */}
          <View style={styles.placeholder}>
            <View style={styles.placeholderInset}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                  {!loadingMore && transactions.length < 1 ?
                 <View style={{marginHorizontal: 20}}>
                
                  <>
                    <Text
                      style={{
                        fontFamily: "_regular",
                        fontSize: 16,
                        color: "#aaa",
                        flexShrink: 1,
                      }}
                    >
                      No history records
                    </Text>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <Ionicons
                        name="file-tray-outline"
                        size={30}
                        color="#aaa"
                        marginLeft={8}
                      />
                    </View>
                  </>
               </View> 
               : null}
                </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 60,
            }}
          >
            <FlatList
              keyExtractor={(item, idx) => idx}
              data={transactions}
              renderItem={recentTranDataInfo}
              onEndReached={loadMoreRecord}
              onEndReachedThreshold={0.5} // Adjust this threshold as needed
              onScrollBeginDrag={() => {
                stopFetchMore = false;
              }}
              ListFooterComponent={() =>
                loadingMore ? <ListFooterComponent />:

                <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 30 }}>
                {transactions.length && noMoreRecord ? <Text
                      style={{
                        fontFamily: "_regular",
                        fontSize: 16,
                        color: "#777",
                        flexShrink: 1,
                      }}
                    >
                      No more history
                    </Text>
                    : null
                }
              </View>    
              }
            />
          </View>
              </View>
          </View>


    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    constrainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc',
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    circleIconLeft1: {
      borderColor: colors.secondaryColor1,
      alignItems: "center",
      justifyContent: "center",
    },
    circleIconLeft: {
      borderRadius: 100,
      overflow: "hidden",
      borderColor: "#B8950A",
      width: 35,
      height: 35,
      marginVertical: 10,
      backgroundColor: "#B8950A",
      alignItems: "center",
      justifyContent: "center",
    },
    nameView: {
      flexDirection: "column",
      marginVertical: 10,
      marginHorizontal: 10,
    },
    placeholder: {
      flex: 1,
      height: 500,
      padding: 20,
    },
    placeholderInset: {
      borderWidth: 4,
      borderColor: colors.secondaryColor2,
      borderStyle: "dashed",
      borderRadius: 9,
      flex: 1,
    },
    recentTransaction:{
      flexDirection:'row',
      borderWidth:1, borderColor:'#ddd',
      borderRadius:15, justifyContent:'space-between',
      marginHorizontal: 10,
      backgroundColor: "#fff",
      paddingRight:10, 
      marginBottom:10,
      height: "auto",
    },
})

export default HistoryScreen;
