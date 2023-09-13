import React, { useState, useContext, useRef } from 'react';
import {
  Alert,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  StatusBar,
  Dimensions,
  Modal,
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { UserContext } from "../components/UserContext";
import {
  Ionicons,
} from "@expo/vector-icons";
import { gs, colors } from "../styles";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet'
import OTPInputView from '@twotalltotems/react-native-otp-input';
import LoaderModal from '../components/loaderModal';
import * as Animatable from 'react-native-animatable';
import client from '../api/client';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import NetInfo from '@react-native-community/netinfo'


const ConfirmLocalTransferScreen = ({route}) => {
  const navigation = useNavigation();
  const { data } = route.params;

  // const windowDimensions = Dimensions.get('window');
  // const screenDimensions = Dimensions.get('screen');
  // const windowHeight = Dimensions.get('window').height;

  const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails, myMethod ] = useContext(UserContext);

    const [isloginBtn, setIsLoginBtn] = useState(false);
    const [logBtnDisabled, setLogBtnDisabled] = useState(false);
    const sheetConfirmPin = useRef(null);
    const sheetConfirmModal = useRef();
    const [enterCode, setEnterCode] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);
     // check if device is connected to network
     const [isConnected, setIsConnected] = useState(null);
     const [connectionState, setConnectionState] = useState(false);

    const toggleModal = () => {
      setModalVisible(true);
    };

    const toggleModalClose = () => {
      setModalVisible(false);
      setActionLoading(false)
    };

     // Function to open the bottom sheet
  const openBottomSheet = () => {
    if (sheetConfirmPin.current) {
      sheetConfirmPin.current.open();
      }
  };

  // Function to close the bottom sheet
  const closeBottomSheet = () => {
    if (sheetConfirmPin.current) {
      sheetConfirmPin.current.close();
     }
  };
   
    const today = new Date()

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDay();
    const currentDate = new Date().getDate();
    const nowDate = today.toLocaleString('default', { month: 'long' })

    function generateRandomString(n) {
      let randomString = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for ( let i = 0; i < n; i++ ) {
        randomString += characters.charAt(Math.floor(Math.random()*characters.length));
        }
        return randomString;
      }

      useEffect(() => {
        // Subscribe to network state changes
        const unsubscribe = NetInfo.addEventListener(state => {
          setIsConnected(state.isConnected);
          if(state.isConnected === true) {
            setConnectionState(false);
           // console.log("Connected ", isConnected);
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

     // automatically call verify function once pin code is entered
     
      const  confirmCodeAuto = async (useCode, useEmail) =>{
         setActionLoading(true)
        const getData ={
          pin_code: useCode,
          user_email: useEmail,
          createdBy: myDetails._id,
          year: currentYear,
          month: nowDate,
          tid_record: generateRandomString(25),
          todayDate: currentDate + '/' + nowDate + '/' + currentYear,
          ...data
        }
       //console.log('Confirm Data ', getData )
       if(getData.pin_code === '' || getData.pin_code === undefined) {
        setActionLoading(false);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Account PIN required.',
          textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
          titleStyle: { fontFamily: '_bold', fontSize: 20 },
          })
         return;
      }
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
       setTimeout(async() =>{
        try{
          const res = await client.post('/api/confirm_pinMobile', getData)
          //console.log('Response information ', res.data)

          if(res.data.msg =='200'){
            navigation.replace('transferSuccessful')
               } else if(res.data.status == '402'){
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'No user found.',
                    textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                    titleStyle: { fontFamily: '_bold', fontSize: 20 },
                    })
                }
               else if(res.data.status == '403'){
                Toast.show({
                  type: ALERT_TYPE.DANGER,
                  title: 'Error',
                  textBody: 'Pin error',
                  textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                  titleStyle: { fontFamily: '_bold', fontSize: 20 },
                  })
             }
            else if(res.data.status == '406'){
              Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Invalid PIN.',
                textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                titleStyle: { fontFamily: '_bold', fontSize: 20 },
                })
              }
          else if(res.data.status == '400'){
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Balance is low.',
                textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                titleStyle: { fontFamily: '_bold', fontSize: 20 },
                })
           }
          else if(res.data.status == '500'){
              Toast.show({
                  type: ALERT_TYPE.DANGER,
                  title: 'Sorry',
                  textBody: 'Error occurred! Try again.',
                  textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                  titleStyle: { fontFamily: '_bold', fontSize: 20 },
                  })
          }
           else {
              Toast.show({
                  type: ALERT_TYPE.DANGER,
                  title: 'Error',
                  textBody: 'Sorry, Something went wrong.',
                  textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                  titleStyle: { fontFamily: '_bold', fontSize: 20 },
                  })
              }
          }
          catch (error) {
              console.log(error.message)
          }
          finally {
            setActionLoading(false)
          }
      }, 2000)
        
      };
      
  if(actionLoading){
      return (
       <Animatable.View 
          animation='slideInUp'
          style={[styles.modalBackground, {backgroundColor: colors.secondaryColor2}]}>
          <LoaderModal />
          <TouchableOpacity
            onPress={() => ('')}
            style={{justifyContent: 'center', alignContent: 'center'}}>
              <Text style={{fontFamily: '_semiBold', fontSize: 20, marginBottom: 10, color:'#aaa'}}>Please, Wait</Text>
            </TouchableOpacity>
        </Animatable.View>
       ) 
    }

  return (
       <View style={{flex: 1}}>
        
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondaryColor2}}>
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
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" color={colors.text} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleIconLeft1}>
            <Text
              style={{ fontSize: 22, fontFamily: "_semiBold", color: "#fff" }}
            >
              Confirm Transfer
            </Text>
          </TouchableOpacity>
          <View style={styles.nameView}></View>

          {/* <Text style = {styles.text}>{new Date().toString().slice(0,11)}</Text> */}
        </View>
      </LinearGradient>
      
       
      <ScrollView contentContainerStyle={styles.container}>
       
            <View>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>Confirm your transfer transaction details</Text>
                </View>

                <View style={[styles.profileData, {backgroundColor:'#fffaff'}]}>
                    <View style={[styles.rowWrapperProfile, {borderTopWidth:0, } ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 6}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Transfer Type</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Local Transfer</Text>
                                    <View style={[styles.rowSpacer]} />
                            </View>       
                            </View>
                      </View>
                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Recipient Bank</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>{data.localBank_name}</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Source Account</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>{myDetails.acct_number}</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Recipient Account Number</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>{data.localAccount_number}</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Recipient Name</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>{data.localAccount_name}</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Transfer Amount</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>{'\u20A6'}{data.local_amount}</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10, marginBottom: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Transaction Charges</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Free</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionHeaderText, {color: colors.secondaryColor2}]}>* Transfer limit is always maintain by the bank every 24 hours</Text>
                </View>

                <View style={styles.button}>
                      <TouchableOpacity  style={[styles.signIn, logBtnDisabled? styles.signInDisable: '']}
                            onPress={() => openBottomSheet()}
                            disabled={logBtnDisabled}> 
                       <LinearGradient
                        colors={[colors.secondaryColor1, colors.secondaryColor1]}
                        style={styles.signIn}>
                            <Text style={[styles.textSign,{
                                color:'#fff'
                            }]}>Send</Text>
                      </LinearGradient>
                    </TouchableOpacity>   
               </View>

                <View style={[styles.button, {marginTop: 10}]}>
                        <TouchableOpacity  style={[styles.signIn,{backgroundColor:'#aaa'}]}
                            onPress={() => navigation.navigate('BottomTab')}> 
                        <Text style={[styles.textSign,{
                                color:'#fff'
                            }]}> Cancel </Text>
                        </TouchableOpacity>   
                </View>

          </View>

      </ScrollView>
      
       </View>

             {/* Confirm pin transfer action sheet popup here */}
                    <RBSheet
                     ref={sheetConfirmPin}
                      customStyles={{container: styles.sheet,
                      }}
                      height={350}
                      openDuration={250}
                      dragFromTopOnly={true}
                      closeOnDragDown={true}
                      animationType="fade"
                      theme='ios'  
                    >
                        <View style={styles.sheetContent}>
                          <Text style={styles.sheetTitle}>Account PIN</Text>
                          <Text style={styles.message}> Enter account pin to authorized this transfer.</Text>

                  <View style={{width: "100%", paddingHorizontal: 22}}>
                    <OTPInputView 
                        style={{width: "100%", height: 100, paddingHorizontal:32}}
                        pinCount={4}
                        autoFocusOnLoad
                        codeInputFieldStyle={{
                            width: 45,
                            height: 40,
                            borderRadius: 5,
                            borderWidth: 2,
                            borderColor: "#aaa",
                            color: colors.blackColor2,
                            //borderBottomWidth: 10,
                            //borderBottomColor: "#aaa",
                        }}
                        keyboardType={'number-pad'}
                        autofillFromClipboard={true}
                        returnKeyType={'done'}
                        onCodeChanged = {code => { setEnterCode(`${code}`)}}
                        
                        onCodeFilled={
                            (code) =>{
                               setEnterCode(`${code}`);
                                confirmCodeAuto(`${code}`, myDetails.email)
                             }
                        }
                    />
                </View>
                          
                          <TouchableOpacity onPress={() =>{
                           closeBottomSheet();
                          }}>
                            <View style={[styles.btn, {marginTop: 20}]}>
                              <Text style={styles.btnText}>Confirm</Text>
                            </View>
                          </TouchableOpacity>
  
                          <TouchableOpacity onPress={() =>{
                              closeBottomSheet();
                              }}>
                                <View style={[styles.btn, {marginTop: 12, backgroundColor:'transparent',
                              borderColor:'transparent'}]}>
                                  <Text style={[styles.btnText, {color:'#A78808'}]}>Cancel</Text>
                                </View>
                              </TouchableOpacity>
                        </View>
                    </RBSheet>

         
    </SafeAreaView>
          
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  btnText:{
    fontSize: 18,
    fontFamily: '_semiBold',
    color: "#fff",
 },

 modalBackground:{
  flex:1,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
},
ActivityIndicatorWraper:{
  backgroundColor:'#fff',
  height: 70,
  width: 100,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  //justifyContent: 'space-around',
  justifyContent: 'center',
},
textPopup:{
  marginTop: 10,
  fontWeight: 'bold',
  color: '#ff0000',
},



  btn:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.secondaryColor1,
    borderColor: colors.secondaryColor1,
    borderWidth: 1,
  },
  message:{
    fontSize: 14,
    fontFamily: '_regular',
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },

  sheet:{
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  sheetConfirm:{
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  sheetContent:{
    padding: 20,
    alignItems: 'stretch',
  },
  sheetTitle:{
    fontSize: 14,
    fontFamily: '_semiBold',
    color: '#181818',
    marginTop: 16,
    textAlign: 'center',
  },

  section: {
    paddingTop: 5,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
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
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryColor1,
    borderRadius: 12,
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
    marginHorizontal: 20
},

signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
},
signInDisable: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    opacity: 0.7
},
textSign: {
    fontSize: 18,
    fontFamily: '_semiBold',
},
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#777',
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
    
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  headerNav:{
    flexDirection:'row',
    alignItems:'center',
    },
  headerAction:{
    width:40,
    height:40,
    marginLeft:10,
    alignItems:'flex-start',
    justifyContent:'center',
    
    },
  headerTitle:{
    fontSize:18,
    fontWeight:'600',
    color:'#000',
  },
  
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontFamily: '_bold',
    color: '#090909',
  },
  profileEmail: {
    fontSize: 16,
    fontFamily: '_regular',
    color: '#848484',
  },
  profileData:{
    borderWidth:1, 
    borderColor:'#ddd',
    borderRadius:15, 
    justifyContent:'space-between',
    marginHorizontal: 10,
    backgroundColor: colors.secondaryColor2,
    paddingRight:10, 
    marginBottom:10,
    height: "auto",
  },
  row: {
    flexDirection: 'column',
    paddingRight: 24,
    height: "auto",
   
  },
  rowWrapper: {
    paddingLeft: 24,
    //backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#aaa'
  },
  rowWrapperProfile: {
    paddingLeft: 24,
    //backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#dededc'
  },
  
  rowLabel: {
    fontSize: 14,
    fontFamily: '_semiBold',
    color: '#777',
    textAlign: 'justify'
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

export default ConfirmLocalTransferScreen;
