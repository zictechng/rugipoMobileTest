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
  KeyboardAvoidingView
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
import * as Animatable from 'react-native-animatable'
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import client from '../api/client';
import LoaderModal from '../components/loaderModal';
import NetInfo from '@react-native-community/netinfo'

const CotCodeScreen = ({route}) => {
  const navigation = useNavigation();
  const cotCodeGot = route.params?.cotData;
  const cotCodeInfo1 = route.params?.cotInfo;

     // function to dismiss the keyboard when clicking out the input field
     dismissKeyboard = () => {
        Keyboard.dismiss();
      };

  const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails, myMethod ] = useContext(UserContext);


    const [isloginBtn, setIsLoginBtn] = useState(false);
    const [logBtnDisabled, setLogBtnDisabled] = useState(false);
    const [copiedText, setCopiedText] = useState('');
    const [copiedTextOTP, setCopiedTextOtp] = useState('');
    const [enterCode, setEnterCode] = useState('');

    const [btnVerifyLoading, setBtnVerifyLoading] = useState(false);
     // check if device is connected to network
     const [isConnected, setIsConnected] = useState(null);
     const [connectionState, setConnectionState] = useState(false);

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
    

    const  ConfirmCOTCode = async (useCode) =>{
      console.log('Code Post', useCode);
      if(useCode.length !== 4 || useCode.length == '') {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'COT code required at least 4 characters.',
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
        const postAllData ={
          cot_code: useCode,
          tran_id: cotCodeGot.tid_record,
          createdBy: myDetails._id,
          holder_name: cotCodeInfo1.localAccount_name,
          acct_number: cotCodeInfo1.localAccount_number,
          bank_name: cotCodeInfo1.localBank_name,
          swift_code: cotCodeInfo1.localAccount_routing,
          send_amt: cotCodeInfo1.localAmount,
      }
        
        setBtnVerifyLoading(true)
        //console.log('Auto Send Press', enterCode);
        setTimeout(async() =>{
          try{
            const res = await client.post('/api/cot_confirmMobile', postAllData)
            if(res.data.msg =='200'){
              setEnterCode(' ')
              navigation.replace('taxCode', {taxCodeData: postAllData, taxInfo: cotCodeInfo1})
  
            } else if(res.data.status == '401') {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Failed',
                    textBody: 'Account not active',
                    textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                    titleStyle: { fontFamily: '_bold', fontSize: 20 },
                    })
                  }
            else if(res.data.status == '403'){
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'Invalid COT Code Enter.',
                    textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                    titleStyle: { fontFamily: '_bold', fontSize: 20 },
                    })
            }
            else if(res.data.status == '404'){
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'COT code require.',
                    textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                    titleStyle: { fontFamily: '_bold', fontSize: 20 },
                    })
            }
            else if(res.data.status == '404'){
              Toast.show({
                  type: ALERT_TYPE.DANGER,
                  title: 'Error',
                  textBody: 'No account found.',
                  textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                  titleStyle: { fontFamily: '_bold', fontSize: 20 },
                  })
          }
            else if(res.data.status == '500'){
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Sorry',
                    textBody: 'Something went wrong!.',
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
            setBtnVerifyLoading(false)
        }
         }, 2000)
      };

      // automatically call verify function once OTP code is entered
      const  confirmCodeAuto = async (useCode) =>{
        
        if(useCode.length !== 4 || useCode === undefined || useCode.length === '') {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: 'COT code required at least 4 characters.',
            textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
            titleStyle: { fontFamily: '_bold', fontSize: 20 },
            })
           return;
        }
        const postAllData ={
          cot_code: useCode,
          tran_id: cotCodeGot.tid_record,
          createdBy: myDetails._id,
          holder_name: cotCodeInfo1.localAccount_name,
          acct_number: cotCodeInfo1.localAccount_number,
          bank_name: cotCodeInfo1.localBank_name,
          swift_code: cotCodeInfo1.localAccount_routing,
          send_amt: cotCodeInfo1.localAmount,
        }
        
       setBtnVerifyLoading(true)

       setTimeout(async() =>{
        try{
          const res = await client.post('/api/cot_confirmMobile', postAllData)
          //console.log(' Respond ', res.data.message)
          if(res.data.msg =='200'){
              
            navigation.replace('taxCode', {taxCodeData: postAllData, taxInfo: cotCodeInfo1})

          } else if(res.data.status == '401') {
              Toast.show({
                  type: ALERT_TYPE.DANGER,
                  title: 'Failed',
                  textBody: 'Account not active',
                  textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                  titleStyle: { fontFamily: '_bold', fontSize: 20 },
                  })
                }
          else if(res.data.status == '403'){
              Toast.show({
                  type: ALERT_TYPE.DANGER,
                  title: 'Error',
                  textBody: 'Invalid COT Code Enter.',
                  textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                  titleStyle: { fontFamily: '_bold', fontSize: 20 },
                  })
          }
          else if(res.data.status == '404'){
              Toast.show({
                  type: ALERT_TYPE.DANGER,
                  title: 'Error',
                  textBody: 'COT code require.',
                  textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                  titleStyle: { fontFamily: '_bold', fontSize: 20 },
                  })
          }
          else if(res.data.status == '404'){
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'No account found.',
                textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                titleStyle: { fontFamily: '_bold', fontSize: 20 },
                })
        }
          else if(res.data.status == '500'){
              Toast.show({
                  type: ALERT_TYPE.DANGER,
                  title: 'Sorry',
                  textBody: 'Something went wrong!.',
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
          setBtnVerifyLoading(false)
      }
       }, 2000)
       
      };

      if(btnVerifyLoading){
        return (
         <Animatable.View 
            animation='slideInUp'
            style={[styles.modalBackground, {backgroundColor: colors.secondaryColor2}]}>
            <LoaderModal />
            <TouchableOpacity
              onPress={() => closeBottomSheet()}
              style={{justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{fontFamily: '_semiBold', fontSize: 20, marginBottom: 10, color:'#aaa'}}>Please, Wait</Text>
              </TouchableOpacity>
          </Animatable.View>
         ) 
      }

  return (
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
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" color={colors.text} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleIconLeft1}>
            <Text
              style={{ fontSize: 22, fontFamily: "_semiBold", color: "#fff" }}>
              Confirm COT Code
            </Text>
          </TouchableOpacity>
          <View style={styles.nameView}></View>
        </View>
      </LinearGradient>
      
       
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
       
        <View style={styles.header}>
          {/* <Text style={styles.title}>Settings</Text> */}
          
          <Text style={styles.subtitle}>
            Enter your COT code to authorize your transfer
          </Text>
                
        </View>
                
                
         <Animatable.View style={[styles.rowWrapper, {marginBottom: 8} ]}
            animation="fadeInUpBig" >

            <View>
                    <View style={[styles.action, {borderBottomWidth:0, marginBottom: 30, marginRight: 20}]}>
                    {/* <Text style={[styles.text_footer, {marginTop: 8, marginRight: 8}]}>Reason</Text> */}
                    <View style={{width: "100%", paddingHorizontal: 22}}>
                    <Text style={{marginTop: 8, marginRight: 8, color:'#777', fontFamily:'_semiBold'}}>Enter COT Code</Text>
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
                        //onCodeChanged = {code => { setCopiedText({code})}}
                        onCodeChanged = {code => { setEnterCode(`${code}`)}}
                        onCodeFilled={
                            (code) =>{
                                setEnterCode(`${code}`);
                                confirmCodeAuto(`${code}`)
                             }
                        }
                    />
                </View>
                     {/* Show this if user did not enter correct details */}
                     {/* <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Message should contain at least 10 characters long </Text>
                    </Animatable.View> */}
                 </View>
                     
                    <View style={[styles.button, {marginTop: 20}]}>
                        <TouchableOpacity  style={[styles.signIn, logBtnDisabled? styles.signInDisable: '']}
                            onPress={() => ConfirmCOTCode(enterCode)}
                            disabled={logBtnDisabled}
                        > 
                        <LinearGradient
                        colors={[colors.secondaryColor1, colors.secondaryColor1]}
                        style={styles.signIn}
                        >
                            <Text style={[styles.textSign,{
                                color:'#fff'
                            }]}>{isloginBtn ? '' : "Authorized"} </Text>
                            {isloginBtn && <ActivityIndicator color='#fff' size={25}/>}
                        </LinearGradient>
                        </TouchableOpacity>   
                    </View>
            </View>
                         
        </Animatable.View>

        </ScrollView>
       </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  modalBackground:{
    flex:1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  centeredView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
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
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 14,
    fontFamily: '_regular',
    color: '#929292',
  },

  rowWrapper: {
    paddingLeft: 24,
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
    elevation: 3,
    },
  rowIcon: {
    marginRight: 12,
  },

action: {
    marginTop: 20,
    borderBottomWidth: 0.6,
    borderBottomColor: '#aaa',
    paddingBottom: 5,
},
actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
},
textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    fontFamily: '_regular',
},
errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    fontFamily: '_regular',
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
textAreaContainer: {
    borderColor: '#aaa',
    borderWidth: 0.9,
    marginRight: 20,
    borderRadius: 10,
  },
});

export default CotCodeScreen;
