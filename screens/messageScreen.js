import React, { useRef, useState, useContext, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput, 
  Keyboard,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  FlatList,

} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../components/UserContext";
import moment from "moment";
import {
  Ionicons, FontAwesome} from "@expo/vector-icons";
import { gs, colors } from "../styles";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable'
import client from "../api/client";
import NetInfo from "@react-native-community/netinfo";

const MessageScreen = ({route}) => {
  const navigation = useNavigation();
  // function to dismiss the keyboard when clicking out the input field
     dismissKeyboard = () => {
        Keyboard.dismiss();
      };

  const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails, messageNotice, setMessageNotice ] = useContext(UserContext);

  const [recordLoading, setRecordLoading] = useState(false);
  const [recentLoading, setRecentLoading] = useState(false);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [noMoreRecord, setNoMoreRecord] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [noRecordFound, setnoRecordFound] = useState(false);

  // check if device is connected to network
  const [isConnected, setIsConnected] = useState(null);
  const [connectionState, setConnectionState] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  // get user account details here

  useEffect(() => {
    getMessageData();
  }, []);

  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if(state.isConnected === true) {
        setConnectionState(false);
        //console.log("Connected ", isConnected);
      }
      else if(state.isConnected === false) {
        setConnectionState(true);
        console.log("No connection ", isConnected)
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  const getMessageData = async () => {
    if(connectionState === true){
      //alert('Please connect')
      Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'No Internet Connection',
          textBody: 'Sorry, your device is not connected to internet! Please, connect to wifi or mobile data to continue',
          titleStyle: {fontFamily: '_semiBold', fontSize: 18},
          textBodyStyle: {fontFamily: '_regular', fontSize: 14,},
          })
       return
  }
        setRecordLoading(true);
    try {
      const res = await client.get(`api/user_notificationMobile/${myDetails._id}?page=${currentPage}`
      );
     //console.log('Result ', res.data)
      if (
        !Array.isArray(res.data) ||
        res.data.status === "404"
         
      ) {
        setnoRecordFound(true)
        setAllDataFetched(false);
        return setLoadingMore(false);
      }
      setTransactions([...res.data]);
      setMessageNotice(true);
    } catch (e) {
      console.log(e);
    } finally {
      setRecordLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreRecord = async () => {
    if(connectionState === true){
      //alert('Please connect')
      Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'No Internet Connection',
          textBody: 'Sorry, your device is not connected to internet! Please, connect to wifi or mobile data to continue',
          titleStyle: {fontFamily: '_semiBold', fontSize: 18},
          textBodyStyle: {fontFamily: '_regular', fontSize: 14,},
          })
       return
  }
    if (loadingMore || allDataFetched) return;


    setCurrentPage(currentPage + 1);
    try {
      setLoadingMore(true);
      const res = await client.get(
        `api/user_notificationMobile/${myDetails._id}?page=${currentPage + 1}`
      );

      if (
        !Array.isArray(res.data) ||
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

  // flat list data here
 
  const messageSheet = ({ item, index }) => (
    <>
     <Animatable.View style={[styles.rowWrapper, {marginBottom: 20, flexShrink: 1} ]}
                 animation="fadeInUpBig" key={item.index}>
                    <Text style={styles.mobileTitle}>{item.alert_name}</Text>
                    <View style={{flexShrink: 1,  marginRight: 10}}>
                        <Text style={[styles.mobileMessage, {textAlign: 'justify',}]}>{item.alert_nature}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <Text style={styles.mobileMessage}></Text>
                        <Text style={[styles.mobileMessage, {marginRight: 15, color:'#aaa', fontSize: 12, marginBottom: 12}]}>{moment(item.createdOn).format("DD/mm/YYYY hh:mm:ss")}</Text>
                    </View>
                    
        </Animatable.View>
    
    </>
       
        
  )

  const  headerComponents = () =>{
    return  <View style={styles.header}>
        <Text style={styles.subtitle}>
        We keep in-touch always!
    </Text>
</View> 
  }

  const footerComponent = () =>(
    <>
    <View>
        {noMoreRecord ? 
         <View style={{justifyContent: "center",alignItems: "center",}}>
         <Text style={{fontFamily: "_regular",fontSize: 16,color: "#aaa",flexShrink: 1,}}>
            No more notifications
             </Text>
             <View
               style={{ justifyContent: "center", alignItems: "center" }}>
               <FontAwesome
                 name="bell-o"
                 size={30}
                 color="#aaa"
                 marginLeft={8}
               />
             </View>
        </View>
        : 
        <TouchableOpacity 
            activeOpacity={0.10}
            onPress={loadMoreRecord}>
            <View style={[styles.btn, {marginTop: 5, marginHorizontal: 20, marginBottom: 10}]}>
            <Text style={styles.btnText}>Load more</Text>
            </View>
        </TouchableOpacity>
    }
   
    </View>
   
    </>
    
     )

  const footerLoaderComponent = () => (
    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 30 }}>
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
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondaryColor2, overflow: 'hidden',}}>
        <StatusBar backgroundColor={colors.secondaryColor2} style="light" />
        <View style={{ flex: 1, backgroundColor: '#F7F7F7', }}>

         {/* header of the screen */}
        <LinearGradient
        colors={[colors.secondaryColor2, colors.secondaryColor2]}
        start={[0, 0]}
        end={[1, 1]}
        style={{ elevation: 30, shadowColor: '#930D2F'}}>
        <View style={[gs.rowBetween, { marginTop: Platform.OS === "ios" ? 18 : 26, marginHorizontal: 10 }]}>
          <TouchableOpacity
            style={styles.circleIconLeft}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" color={colors.text} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleIconLeft1}>
            <Text
              style={{ fontSize: 22, fontFamily: "_semiBold", color: "#fff" }}>
              Notifications
              
            </Text>
          </TouchableOpacity>
          <View style={styles.nameView}></View>
        </View>
      </LinearGradient>
      
       
      <View>
           
            <View style={{justifyContent: "center",alignItems: "center",}}></View>
             <View style={{  marginTop: 10, marginBottom: 60,}} >
                    
                <FlatList
                    ListHeaderComponent={headerComponents}
                    keyExtractor={(item) => item._id}
                    data={transactions}
                    renderItem={messageSheet}
                    
                    //ListFooterComponent={footerComponent}
                    ListFooterComponent={() =>
                        loadingMore ? footerLoaderComponent():
        
                        <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 30 }}>
                        {!transactions.length && noMoreRecord ? 
                            <Text
                              style={{
                                fontFamily: "_regular",
                                fontSize: 16,
                                color: "#777",
                                flexShrink: 1,
                              }}>
                              No more message
                            </Text>
                            : ''
                        }
                        {transactions.length && !recordLoading ? footerComponent() : null}
                      </View>    
                      }
                />
            
            </View>  

            <View style={{justifyContent: "center",alignItems: "center",}}>
                    {recordLoading ? (
                    <ActivityIndicator size="large" color="#A78808" />
                            ) : (
                            ""
                            )}
            {!transactions.length && !recordLoading ? 
                <>
                <Text style={{fontFamily: "_regular",fontSize: 16,color: "#aaa",flexShrink: 1,}}>
                      No recent notifications at the moment
                    </Text>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}>
                      <FontAwesome
                        name="bell-o"
                        size={30}
                        color="#aaa"
                        marginLeft={8}
                      />
                    </View>
                </>
                : null}  
            </View>    
        </View>
     </View>
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },

  separator:{
    height: 1,
    width: '100%',
    backgroundColor:'#aaa',
  },
  btnText:{
    fontSize: 14,
    fontFamily: '_semiBold',
    color: "#fff",
 },
 btn:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: colors.secondaryColor1,
    borderColor: colors.secondaryColor1,
    borderWidth: 1,
  },
  bottomButtonRow:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginRight: 40,
    marginBottom: 10,
    marginLeft: 40,
    marginTop: 10,
    },
shareText:{
    fontFamily:'_regular', 
    fontSize: 12, 
    color:'#aaa'
},

shareIcon:{
    color:colors.secondaryColor1,
    },

mobileTitle:{
    fontFamily:'_semiBold',
    fontSize: 16,
    color:'#777',
    marginTop: 10,
},
mobileMessage: {
    fontFamily:'_regular',
    fontSize: 14,
    marginBottom: 10,
},  

divider:{
    borderColor: '#aaa',
    borderStyle: "dashed",
    paddingBottom: 5, 
    marginHorizontal: 5, 
    marginBottom: 8,
    overflow: 'hidden',
},
profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
 
  circleIconLeft1: {
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
  header: {
    marginBottom: 12,
    marginTop: 10,

  },

  subtitle: {
    fontSize: 14,
    fontFamily: '_regular',
    color: '#929292',
    textAlign: 'center',
  },

  rowWrapper: {
    paddingLeft: 15,
    backgroundColor: '#fff',
    borderColor: '#e3e3e3',
    borderRadius: 15,
    marginHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    shadowColor: "#000",
    elevation: 1,
    marginBottom: 30,
    },
 

action: {
    marginTop: 20,
    borderBottomWidth: 0.6,
    borderBottomColor: '#aaa',
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent:'space-between',
},
button: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
    marginRight: 20,
},

signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
},

textSign: {
    fontSize: 18,
    fontFamily: '_semiBold',
},

});

export default MessageScreen;
