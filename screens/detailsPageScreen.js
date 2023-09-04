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
import FeatherIcon from 'react-native-vector-icons/Feather';
import Feather from 'react-native-vector-icons/Feather'
import {
  Ionicons} from "@expo/vector-icons";
import { gs, colors } from "../styles";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable'
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import DashedLine from 'react-native-dashed-line';

const DetailsPageScreen = () => {
  const navigation = useNavigation();
     // function to dismiss the keyboard when clicking out the input field
     dismissKeyboard = () => {
        Keyboard.dismiss();
      };

  const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails, myMethod ] = useContext(UserContext);

  const [data, setData] = React.useState({
    reportSubject: '',
    reportMessage: '',
    check_subjectInputChange: false,
    check_messageInputChange: false,
});


    const [isloginBtn, setIsLoginBtn] = useState(false);
    const [logBtnDisabled, setLogBtnDisabled] = useState(false);
    const [copiedText, setCopiedText] = useState('');
    const [copiedTextOTP, setCopiedTextOtp] = useState('');
    const [enterCode, setEnterCode] = useState('');
   
    const sendMessage = () =>{
        setLogBtnDisabled(true)
        setIsLoginBtn(true)
        console.log('Respond of Message ', selectedData + ' ' + data.reportMessage)
    }

    const  ConfirmCode = async () =>{
        if(enterCode.length != 4){
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error!',
                textBody: 'OTP code required 4 characters',
                textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                titleStyle: { fontFamily: '_bold', fontSize: 20 },
                })
            return
        }
        setBtnVerifyLoading(true)
        //console.log('Auto Send Press', enterCode);
        try{
            const res = await client.post('/api/otp_verify', {
                otp_code: enterCode,
                user_email: userRegEmail,
            })
            if(res.data.msg =='200'){
                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                    titleStyle: { fontFamily: '_bold', fontSize: 20 },
                    title: 'Success',
                    textBody: 'Account verified successfully',
                    button: 'Okay',
                   });
                
            navigation.navigate('Login');
            } else if(res.data.status == '401') {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Failed',
                    textBody: 'No user found.',
                    textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                    titleStyle: { fontFamily: '_bold', fontSize: 20 },
                    })
                // Alert.alert("Login failed", "No user found",[
                //     {text: "Okay"}
                // ]);
            }
            else if(res.data.status == '403'){
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'Sorry, Try again.',
                    textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                    titleStyle: { fontFamily: '_bold', fontSize: 20 },
                    })
               
            }
            else if(res.data.status == '404'){
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Failed',
                    textBody: 'Invalid OTP code.',
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
      };

      // automatically call verify function once OTP code is entered
      const  confirmCodeAuto = async (useCode, useEmail) =>{
       setBtnVerifyLoading(true)
        try{
            const res = await client.post('/api/otp_verify', {
                otp_code: useCode,
                user_email: useEmail,
            })
            if(res.data.msg =='200'){
                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                    titleStyle: { fontFamily: '_bold', fontSize: 20 },
                    title: 'Success',
                    textBody: 'Account verified successfully',
                    button: 'Okay',
                   });
                
            navigation.navigate('Login');
            } else if(res.data.status == '401') {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Failed',
                    textBody: 'No user found.',
                    textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                    titleStyle: { fontFamily: '_bold', fontSize: 20 },
                    })
                // Alert.alert("Login failed", "No user found",[
                //     {text: "Okay"}
                // ]);
            }
            else if(res.data.status == '403'){
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'Sorry, Try again.',
                    textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                    titleStyle: { fontFamily: '_bold', fontSize: 20 },
                    })
            }
            else if(res.data.status == '404'){
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Failed',
                    textBody: 'Invalid OTP code.',
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
      };

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
              Details
            </Text>
          </TouchableOpacity>
          <View style={styles.nameView}></View>
        </View>
      </LinearGradient>
      
       
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
       
        <View style={styles.header}>
          {/* <Text style={styles.title}>Settings</Text> */}
          
          <Text style={styles.subtitle}>
            Thank you for banking with us! Find below more details about your transaction
          </Text>
                
        </View>
                
        
         <Animatable.View style={[styles.rowWrapper, {marginBottom: 8,} ]}
            animation="fadeInUpBig" >

            <View style={[gs.rowBetween, {marginTop: Platform.OS === "ios" ? 10 : 26, justifyContent:'flex-end',
                marginRight: 20}]}>
                  <Image alt="" source={require('../assets/bank.png')} style={styles.profileAvatar} />
                 
            </View>

            <View style={{marginBottom: 0}}>
                <Text style={styles.mobileTitle}>Mobile Transfer</Text>
                <Text style={styles.mobileMessage}>Transaction Details</Text>
            </View>
            {Platform.OS === 'ios' ? <DashedLine dashLength={5} dashGap={5} dashColor='#aaa' dashStyle={{ marginRight: 4.9, marginBottom: 8}} /> :
            <View style={{borderBottomWidth: 1, borderBottomColor: '#aaa', borderStyle: "dashed", paddingBottom: 5, marginHorizontal: 5, marginBottom: 8}} />
            }
            

            
            <View style={{flexDirection: 'row', justifyContent:'space-between', marginLeft: 0, marginRight: 12, marginTop: 15}}>
                <View>
                    <Text>Sender</Text>
                </View>
                <View>
                    <Text>Thank for the job</Text>
                </View>
                
            </View>
            {Platform.OS ==='ios' ? <DashedLine dashLength={5} dashGap={5} dashColor='#aaa' dashStyle={{ marginRight: 4.9, marginBottom:8 }} />:
            <View style={styles.divider}/>    
            }
            
           
            <View style={{flexDirection: 'row', justifyContent:'space-between', marginLeft: 0, marginRight: 12, marginTop: 15}}>
                <View>
                    <Text>Receiver</Text>
                </View>
                <View>
                    <Text>Thank for the job</Text>
                </View>
                
            </View>
            <DashedLine dashLength={5} dashGap={5} dashColor='#aaa' dashStyle={{ marginRight: 4.9, marginBottom: 8 }} />
            {/* <View style={styles.divider} /> */}
           
            <View style={{flexDirection: 'row', justifyContent:'space-between', marginLeft: 0, marginRight: 12, marginTop: 15}}>
                <View>
                    <Text>Transfer Amount</Text>
                </View>
                <View>
                    <Text>Thank for the job</Text>
                </View>
                
            </View>
            <DashedLine dashLength={5} dashGap={5} dashColor='#aaa' dashStyle={{ marginRight: 4.9, marginBottom: 8 }} />
            
            <View style={{flexDirection: 'row', justifyContent:'space-between', marginLeft: 0, marginRight: 12, marginTop: 15}}>
                <View>
                    <Text>Source Account</Text>
                </View>
                <View>
                    <Text>Thank for the job</Text>
                </View>
                
            </View>

            <DashedLine dashLength={5} dashGap={5} dashColor='#aaa' dashStyle={{ marginRight: 4.9, marginBottom: 8 }} />

            <View style={{flexDirection: 'row', justifyContent:'space-between', marginLeft: 0, marginRight: 12, marginTop: 15}}>
                <View style={{marginRight: 10}}>
                    <Text>Description</Text>
                </View>
                <View style={{flexShrink: 1}}>
                    <Text style={{textAlign: 'justify',}}> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,</Text>
                </View>
                
            </View>
            <DashedLine dashLength={5} dashGap={5} dashColor='#aaa' dashStyle={{ marginRight: 4.9, marginBottom: 8 }} />

            <View style={{flexDirection: 'row', justifyContent:'space-between', marginLeft: 0, marginRight: 12, marginTop: 15}}>
                <View>
                    <Text>Ref ID</Text>
                </View>
                <View>
                    <Text>Thank for the job</Text>
                </View>
                
            </View>
            <DashedLine dashLength={5} dashGap={5} dashColor='#aaa' dashStyle={{ marginRight: 4.9, marginBottom: 8 }} />
            

            <View style={{flexDirection: 'row', justifyContent:'space-between', marginLeft: 0, marginRight: 12, marginTop: 15}}>
                <View>
                    <Text>Date</Text>
                </View>
                <View>
                    <Text>Thank for the job</Text>
                </View>
                
            </View>
            <DashedLine dashLength={5} dashGap={5} dashColor='#aaa' dashStyle={{ marginRight: 4.9, marginBottom: 12 }} />
            
           </Animatable.View>
          </ScrollView>
          <View style={styles.bottomButtonRow}>
                  <View style={{flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity onPress={() => Alert.alert('Successfully Shared')}> 
                        <Ionicons name='share-social-sharp' size={23} color={colors.secondaryColor1} />
                       
                    </TouchableOpacity>
                    <Text style={styles.shareText}>Share</Text>
                  </View>

                    <View style={{flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                         <TouchableOpacity onPress={() => Alert.alert('Successfully Downloaded')}>
                            <Ionicons name='cloud-download-outline' size={23} color={colors.secondaryColor1}/>
                         
                        </TouchableOpacity>
                        <Text style={styles.shareText}>Download</Text>
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
    fontSize: 17,
    color:'#777',
},
mobileMessage: {
    fontFamily:'_regular',
    fontSize: 13,

},  

divider:{
   
    borderColor: '#aaa',
    borderStyle: "dashed",
    paddingBottom: 5, 
    marginHorizontal: 5, 
    marginBottom: 8,
    overflow: 'hidden',
    ...Platform.select({
        ios: {
            borderWidth: 0.4,
            borderRadius: 0.1,
            borderStyle: 'dotted',
            borderBottomWidth: 1,
         },
        android: {
        borderBottomWidth: 1,
        },
      }),
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

export default DetailsPageScreen;
