
import React, {useRef, useState, useContext, useEffect} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ScrollView,
    ActivityIndicator, StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../components/UserContext';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import { Ionicons, Entypo, SimpleLineIcons, FontAwesome, FontAwesome5} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/FontAwesome';
import { gs, colors } from '../styles';
import client from '../api/client';
import Loader from '../components/Loader';

 const VerifyAccount = () =>{
    const navigation = useNavigation();
 
    const [loginState, setLoginState, 
        isLoading, setIsLoading, 
        userRegCode, setUserRegCode,
        userRegEmail, setUserRegEmail] = useContext(UserContext);
    
    const [username, setUsername] = useState('');
    const [domain, setDomain] = useState('');
    const [btnVerifyLoading, setBtnVerifyLoading] = useState(false);

    const [name, domainPart] = userRegEmail.split('@');

    // Option/Method two variables here
    const pin1Ref = useRef(null)
    const pin2Ref = useRef(null)
    const pin3Ref = useRef(null)
    const pin4Ref = useRef(null)
    
    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [pin3, setPin3] = useState("");
    const [pin4, setPin4] = useState("");

    // const [data, setState] = useState({
    //     pin1: "",
    //     pin2: "",
    //     pin3: "",
    //     pin4: ""
    //   })

    const [copiedText, setCopiedText] = useState('');
    const [copiedTextOTP, setCopiedTextOtp] = useState('');
    const [enterCode, setEnterCode] = useState('');
    // check if device is connected to network
    const [isConnected, setIsConnected] = useState(null);
    const [connectionState, setConnectionState] = useState(false);

    useEffect(() => {
        setUsername(name);
        setDomain(domainPart);
        }, [name, domainPart]);


        useEffect(() => {
            // Subscribe to network state changes
            const unsubscribe = NetInfo.addEventListener(state => {
              setIsConnected(state.isConnected);
              if(state.isConnected === true) {
                setConnectionState(false);
                console.log("Connected ", isConnected);
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

        // get first 3 letters of the email
        const displayEmail = name.substring(0, 3);
    
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
    <SafeAreaView style={{flex: 1, backgroundColor: "#F7F7F7"}}>
        <StatusBar backgroundColor={colors.secondaryColor2} barStyle="dark-content" />
            {/* <View style={styles.titleBar}>
                <Icons name="arrow-circle-left" size={24} color="#52575D"></Icons>
                <Icons name="ellipsis-v" size={24} color="#52575D"></Icons>
            </View> */}
                <View style={{
                      justifyContent:'space-between', 
                      flexDirection:'row', 
                      marginHorizontal: 16, 
                      marginTop: 10, 
                      marginBottom: 10}}>
                        <View>
                            <TouchableOpacity
                            style={styles.button}  
                            onPress={() => navigation.goBack()}
                            >
                            <Icons name="arrow-circle-left" size={20} color="#fff" />
                            </TouchableOpacity>
                        
                        </View>
                        
                        <TouchableOpacity
                            onPress={() => navigation.replace('Login')}>
                        <Ionicons name="close" size={25} color={colors.secondaryColor1} />
                        </TouchableOpacity>
                  </View>
        <ScrollView>
        
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : ""}
        style={{height: "100%",
        width: "100%",
        background: "#FFF"}}>
           
            <View style={{flex: 1, alignItems:"center", }}>
                
                {/* <Text style={{fontSize: 36, color: "#111", fontWeight: "700", marginVertical: 50,
            fontFamily: '_bold'}}>
                    Verification
                </Text> */}
            

                <Text style={{fontSize: 25, color: "#222", marginTop: 50, fontFamily: '_bold'}}>Verify Account</Text>
                
                {btnVerifyLoading ? <Loader loading={btnVerifyLoading} textInfo={'Verifying wait...'} style={{fontSize: 25, fontFamily: '_regular'}} /> : ''}

                <Text style={{fontSize: 14, color: "#aaa", fontFamily: '_regular'}}>Enter the code sent to your phone/email to verify your account</Text>
                <Text style={{fontSize: 16, color: "#111", marginTop: 12, fontFamily: '_semiBold'}}>
                <Text style={{fontSize: 14, color: "#aaa", fontFamily: '_regular'}}>We send OTP code to </Text>
                    { displayEmail }{'......'}{ '@' }{ domain }
                 </Text>

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
                        // codeInputFieldStyle={[styles.underlineStyleBase,  {borderColor: "#2ab12f",
                        // color: "#aaa"}]}
                        // codeInputHighlightStyle={styles.underlineStyleHighLighted}

                        autofillFromClipboard={true}
                        returnKeyType={'done'}
                        
                        //onCodeChanged = {code => { setCopiedText({code})}}
                        onCodeChanged = {code => { setEnterCode(`${code}`)}}
                        
                        onCodeFilled={
                            (code) =>{
                                setEnterCode(`${code}`);
                                setCopiedText(`${code}`)
                                confirmCodeAuto(`${code}`, userRegEmail)
                             }
                        }
                    />
                    {/* <Text style={{fontSize: 25, color: 'red', fontWeight: '700',
                    alignContent:'center', alignItems:'center'}}>{enterCode}</Text> */}
                    
                    <TouchableOpacity
                    style={{
                        backgroundColor: colors.secondaryColor1,
                        paddingVertical: 12,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 8,
                        marginTop: 50,
                     }} 
                    onPress={() =>ConfirmCode()}
                    >
                        <Text style={{
                            color: "white",
                            fontFamily: '_semiBold',
                            fontSize: 18,
                         }}>{btnVerifyLoading ? 'Wait...' : "Verify"} </Text>
                         
                    </TouchableOpacity>

                    <View 
                    style={{
                        width: "100%", 
                        flexDirection: "row", 
                        justifyContent:"center",
                        paddingTop: 20}}>
                    <Text style={{fontFamily: '_regular', fontSize: 17, color:'#aaa'}}>Wrong Number/Email ?</Text>

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Text style={{fontSize: 18, color: colors.secondaryColor2, fontFamily: '_semiBold'}}> Edit</Text>
                    </TouchableOpacity>
                    </View>
                 </View>
            </View>

            {/* Option two/ Method two hand coding */}

         {/* <View style={{flex: 1, 
            justifyContent: "center",
            alignItems:"center", 
            flexDirection: "row",
            justifyContent: "space-around", 
            marginBottom: 15, 
            paddingHorizontal: 20,
            marginTop: 20}}>

            <View style={styles.TextInputView}>
                <TextInput 
                    ref={pin1Ref}
                    keyboardType={'number-pad'}
                    maxLength={1}
                    onChangeText={(pin1) => {
                        setPin1(pin1)
                        if(pin1 != ""){
                            pin2Ref.current.focus();
                        }
                        console.log("Pin  1 entered", pin1);
                    }}
                   
                    value={pin1}
                   autoFocus
                style={styles.TextInputText}
                
                />
            </View>

            <View style={styles.TextInputView}>
                <TextInput
                ref={pin2Ref}
                keyboardType={'number-pad'}
                maxLength={1}
               onChangeText={(pin2) =>{
                    setPin2(pin2)
                    if(pin2 != ""){
                        pin3Ref.current.focus();
                    }
                    console.log("Pin  2 entered", pin2);
                }}
               
                value={pin2}
                style={styles.TextInputText}
                 />
            </View>

            <View style={styles.TextInputView}>
                <TextInput 
                ref={pin3Ref}
                keyboardType={'number-pad'}
                maxLength={1}
                onChangeText={(pin3) =>{
                    setPin3(pin3)
                    if(pin3 != ""){
                        pin4Ref.current.focus();
                    }
                    console.log("Pin  3 entered", pin3);
                }}
                style={styles.TextInputText}
                />
            </View>

            <View style={styles.TextInputView}>
                <TextInput 
                ref={pin4Ref}
                keyboardType={'number-pad'}
                maxLength={1}
                onChangeText={(pin4) =>{
                    setPin4(pin4)
                    console.log('Pin 4 entered ', pin4)
                }}
                style={styles.TextInputText}
                />
            </View>
            
         </View> */}

         {/* <TouchableOpacity
            style={{

                backgroundColor: colors.secondaryColor1,
                paddingVertical: 12,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                paddingVertical: 16,
                marginTop: 30,
                marginHorizontal: 20
            }} 
            onPress={processConfirm}
            >
                <Text style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 16,
                    }}>Confirm</Text>
        </TouchableOpacity>       */}

        </KeyboardAvoidingView>
        </ScrollView>
      
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    borderStyleBase: {
      width: 30,
      height: 45
    },
    button: {
        width: 34,
        height: 34,
        borderRadius: 50,
        backgroundColor: colors.secondaryColor1,
        alignItems: "center",
        justifyContent: "center",
       
      },
    titleBar:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop: 24,
        marginHorizontal: 16,
        marginBottom: 10
    },

    borderStyleHighLighted: {
      borderColor: "#03DAC6",
    },
  
    underlineStyleBase: {
      width: 30,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 1,
    },
  
    underlineStyleHighLighted: {
      borderColor: "#03DAC6",
      borderWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: "#111",
    },

    TextInputView:{
        borderBottomWidth: 1,
        width: 35,
        justifyContent: "center",
        alignItems: "center",
    },
    TextInputText:{
        fontSize: 20,
    }
  });

export default VerifyAccount
