
import React, { useRef, useState, useContext } from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { UserContext } from '../components/UserContext';

import { Ionicons, Entypo, SimpleLineIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/FontAwesome';
import { gs, colors } from '../styles';
import { LinearGradient } from 'expo-linear-gradient';

const VerifyAccount = ({ navigation }) => {
    // Option/Method two variables here
    const pin1Ref = useRef(null)
    const pin2Ref = useRef(null)
    const pin3Ref = useRef(null)
    const pin4Ref = useRef(null)

    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [pin3, setPin3] = useState("");
    const [pin4, setPin4] = useState("");

    const [data, setState] = useState({
        pin1: "",
        pin2: "",
        pin3: "",
        pin4: ""
    })

    const [copiedText, setCopiedText] = useState('');
    const [enterCode, setEnterCode] = useState('');

    const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails, userRegCode, setUserRegCode] = useContext(UserContext);

    const ConfirmCode = () => {
        Alert.alert("Confirm Code", enterCode);
    };


    // send request to api call here
    const processConfirm = () => {
        const newData = {
            pin_code1: pin1,
            pin_code2: pin2,
            pin_code3: pin3,
            pin_code4: pin4,
        }
        console.log('Code Pin Data ', newData);

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* <View style={styles.titleBar}>
                <Icons name="arrow-circle-left" size={24} color="#52575D"></Icons>
                <Icons name="ellipsis-v" size={24} color="#52575D"></Icons>
            </View> */}
            <View style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginHorizontal: 16,
                marginTop: 10,
                marginBottom: 10
            }}>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.goBack()}
                    >
                        <Icons name="arrow-circle-left" size={24} color="#fff" />
                    </TouchableOpacity>

                </View>

            </View>
            <ScrollView>

                <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : ""}
                    style={{
                        height: "100%",
                        width: "100%",
                        background: "#FFF"
                    }}>

                    <View style={{ flex: 1, alignItems: "center", }}>

                        {/* <Text style={{fontSize: 36, color: "#111", fontWeight: "700", marginVertical: 50,
            fontFamily: '_bold'}}>
                    Verification
                </Text> */}


                        <Text style={{ fontSize: 20, color: "#111", marginTop: 50, fontFamily: '_bold' }}>Confirm Account</Text>

                        <Text style={{ fontSize: 15, color: "#aaa", fontFamily: '_regular' }}>Enter the code sent to your phone/email to verify your account</Text>
                        <Text style={{ fontSize: 16, color: "#111", marginTop: 12, fontFamily: '_semiBold' }}>
                            {userRegCode}
                        </Text>

                        <View style={{ width: "100%", paddingHorizontal: 22 }}>

                            <OTPInputView
                                style={{ width: "100%", height: 100, paddingHorizontal: 32 }}
                                pinCount={4}
                                //autoFocusOnLoad
                                codeInputFieldStyle={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 5,
                                    borderWidth: 2,
                                    borderColor: "#aaa",
                                    color: "#f4a135",
                                    borderBottomWidth: 3,
                                    borderBottomColor: "#aaa",
                                }}
                                keyboardType={'number-pad'}
                                // codeInputFieldStyle={[styles.underlineStyleBase,  {borderColor: "#2ab12f",
                                // color: "#aaa"}]}
                                // codeInputHighlightStyle={styles.underlineStyleHighLighted}

                                autofillFromClipboard={true}
                                returnKeyType={'done'}

                                //onCodeChanged = {code => { setCopiedText({code})}}
                                onCodeFilled={
                                    (code) => {
                                        setEnterCode(`${code}`);
                                        console.log(`Entered code here ${code}`)
                                    }
                                }
                            />

                            <Text style={{
                                fontSize: 25, color: 'red', fontWeight: '700',
                                alignContent: 'center', alignItems: 'center'
                            }}>{enterCode}</Text>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: colors.secondaryColor1,
                                    paddingVertical: 12,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 8,
                                }}
                                onPress={() => ConfirmCode()}
                            >
                                <Text style={{
                                    color: "white",
                                    fontFamily: '_semiBold',
                                    fontSize: 18,
                                }}>Submit</Text>
                            </TouchableOpacity>

                            <View
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    paddingTop: 10
                                }}>
                                <Text style={{ fontFamily: '_regular', fontSize: 16 }}>Wrong Number/ Email ?</Text>

                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}>
                                    <Text style={{ fontSize: 18, color: colors.secondaryColor2, fontFamily: '_semiBold' }}> Edit</Text>
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
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
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

    TextInputView: {
        borderBottomWidth: 1,
        width: 35,
        justifyContent: "center",
        alignItems: "center",
    },
    TextInputText: {
        fontSize: 20,
    }
});

export default VerifyAccount
