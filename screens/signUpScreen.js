import React, { useState, useContext } from "react";
import { StatusBar } from 'expo-status-bar';
import {
    Alert, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, View, Image, ScrollView, Dimensions,
    Button, TouchableOpacity,
    Platform,
    InputAccessoryView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../components/UserContext';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

import client from '../api/client';
import { gs, colors } from '../styles';
import Loader from '../components/Loader';
import NetInfo from '@react-native-community/netinfo'


const SignUpScreen = ({ navigation }) => {
    const inputAccessoryViewID = 'uniqueID';
    // function to dismiss the keyboard when clicking out the input field
    dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const [data, setData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        first_name: '',
        phone: '',
        username: '',
        check_textInputChange: false,
        check_textUsernameInputChange: false,
        check_nameTextInputChange: false,
        check_phoneTextInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,

    });

    const [btnRegLoading, setBtnRegLoading] = useState(false);
      // check if device is connected to network
      const [isConnected, setIsConnected] = useState(null);
      const [connectionState, setConnectionState] = useState(false);

    const [loginState, setLoginState, 
        isLoading, setIsLoading, 
        userRegCode, setUserRegCode,
        userRegEmail, setUserRegEmail] = useContext(UserContext);
    // function to determine when to show the check icon in the input field
    const textInputChange = (val) => {
        if (val.length > 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }
    const textUsernameInputChange = (val) => {
        if (val.length > 0) {
            setData({
                ...data,
                username: val,
                check_textUsernameInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textUsernameInputChange: false
            });
        }
    }
    // name icon showing
    const nameTextInputChange = (val) => {
        if (val.length > 0) {
            setData({
                ...data,
                first_name: val,
                check_nameTextInputChange: true
            });
        } else {
            setData({
                ...data,
                first_name: val,
                check_nameTextInputChange: false
            });
        }
    }

    // phone icon showing
    const phoneTextInputChange = (val) => {
        if (val.length > 0) {
            setData({
                ...data,
                phone: val,
                check_phoneTextInputChange: true
            });
        } else {
            setData({
                ...data,
                phone: val,
                check_phoneTextInputChange: false
            });
        }
    }

    // function to toggle password visibility
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    // create function for the toggle button
    const updateSecureTextEntry = (val) => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    // function to toggle confirm password visibility
    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    // create function for the toggle button for confirm password
    const updateConfirmSecureTextEntry = (val) => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        })
    }

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


    // check if email input is valid email format
    const isValidEmail = (email) => {
        // Regular expression pattern for validating email
        const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        return emailPattern.test(email);
    };
    // check if phone number is valid 
    const isValidPhoneNumber = (phoneNumber) => {
        // Regular expression pattern for validating phone number
        const phonePattern = /^\d{11}$/;

        return phonePattern.test(phoneNumber);
    };
    // sign up function here....
    const signUp = async () => {
        const newData = {
            first_name: data.first_name,
            email: data.email,
            phone: data.phone,
            password: data.password,
        }
        if (data.first_name.length == 0 || data.email.length == 0 || data.phone.length == 0 || data.username.length == 0) {
            Alert.alert("Error!", "Required fields are missing", [
                { text: "Okay" }
            ]);
            return
        }

        if (data.password !== data.confirm_password) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Password do not match',
            });
            return
        }
        if (!isValidPhoneNumber(data.phone)) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Invalid phone number',
                textBody: 'Please enter a valid phone number 11 digits.',
                titleStyle: { fontFamily: '_semiBold', fontSize: 18 },
                textBodyStyle: { fontFamily: '_regular', fontSize: 14, },
            });
            return
        }
        if (!isValidEmail(data.email)) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Invalid email',
                textBody: 'Please enter a valid email format.',
                titleStyle: { fontFamily: '_semiBold', fontSize: 18 },
                textBodyStyle: { fontFamily: '_regular', fontSize: 14, },
            });
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
        
        try {
            //console.log('Signup Data ', newData);
            setBtnRegLoading(true);
            const res = await client.post('/api/register', {
                first_name: data.first_name,
                email: data.email,
                phone: data.phone,
                password: data.password,
                username: data.username
            })
            // .then(res => {
            // console.log('result from backend ', res)
            if (res.data.msg == '201') {
                
                setUserRegEmail(data.email);
                // Navigate to the next screen
                setData({
                    email: '',
                    password: '',
                    confirm_password: '',
                    first_name: '',
                    phone: '',
                    username: '',
                    check_textInputChange: false,
                    check_textUsernameInputChange: false,
                    check_nameTextInputChange: false,
                    check_phoneTextInputChange: false,
                    secureTextEntry: true,
                    confirm_secureTextEntry: true,
                })
                navigation.navigate('Verify');
            } else if (res.data.status == '400') {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'All fields required',
                    textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                    titleStyle: { fontFamily: '_bold', fontSize: 20 },
                })
            }
            else if (res.data.status == '409') {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'Username already taken',
                    textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
                    titleStyle: { fontFamily: '_bold', fontSize: 20 },
                });
                //    Alert.alert("Error!", "Username already taken",[
                //     {text: "Okay"}
                // ]);

            } else if (res.data.status == '401') {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Failed',
                    titleStyle: { fontFamily: '_bold', fontSize: 20 },
                    textBody: 'Invalid user details',
                    textBodyStyle: { fontFamily: '_regular', fontSize: 16 },

                })
            }
            else {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    titleStyle: { fontFamily: '_bold', fontSize: 20 },
                    textBody: 'Sorry, Something went wrong',
                    textBodyStyle: { fontFamily: '_regular', fontSize: 16 },

                })
            }

            // });
        } catch (error) {
            console.log(error.message)
        }
        finally {
            setBtnRegLoading(false)
        }

    }

    return (

        <TouchableWithoutFeedback onPress={dismissKeyboard} keyboardDismissMode='interactive'>
            <View style={styles.container}>
                <StatusBar backgroundColor={colors.secondaryColor2} style="light" />

                <View style={styles.header}>
                    <Text style={styles.text_header}>Open An Account</Text>
                </View>
                {btnRegLoading ? <Loader loading={btnRegLoading} textInfo={'Processing wait...'} /> : ''}
                <Animatable.View
                    animation='fadeInUpBig'
                    style={styles.footer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.text_footer}>Full Name</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="user-o"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput
                                placeholder="Enter Full Name"
                                style={styles.textInput}
                                autoCapitalize="none"
                                value={data.first_name}
                                onChangeText={(val) =>
                                    nameTextInputChange(val)
                                }
                                inputAccessoryViewID={inputAccessoryViewID}
                            // onChangeText={(val) => nameTextInputChange(val); setData({...data, first_name: val})}
                            />
                            {/* now use iteration to determine the display of the icon */}
                            {data.check_nameTextInputChange ?
                                <Animatable.View
                                    animation="bounce"
                                >
                                    <Feather
                                        name="user"
                                        color="green"
                                        size={15}
                                    />

                                </Animatable.View>
                                : null}
                        </View>

                        <Text style={[styles.text_footer, { marginTop: 35 }]}>Phone Number</Text>
                        <View style={styles.action}>
                            <Feather
                                name="phone"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput
                                placeholder="Enter Phone Number"
                                style={styles.textInput}
                                autoCapitalize="none"
                                value={data.phone}
                                onChangeText={(val) =>
                                    phoneTextInputChange(val)}
                                keyboardType="numeric"
                                inputAccessoryViewID={inputAccessoryViewID}
                            />
                            {/* now use iteration to determine the display of the icon */}
                            {data.check_phoneTextInputChange ?
                                <Animatable.View
                                    animation="bounce"
                                >
                                    <Feather
                                        name="phone"
                                        color="green"
                                        size={15}
                                    />

                                </Animatable.View>
                                : null}
                        </View>

                        <Text style={[styles.text_footer, { marginTop: 35 }]}>Username</Text>
                        <View style={styles.action}>
                            <Feather
                                name="user"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput
                                placeholder="Enter Username"
                                style={styles.textInput}
                                value={data.username}
                                autoCapitalize="none"

                                onChangeText={(val) =>
                                    textUsernameInputChange(val)
                                }
                            />
                            {/* now use iteration to determine the display of the icon */}
                            {data.check_textUsernameInputChange ?
                                <Animatable.View
                                    animation="bounce"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={15}
                                    />

                                </Animatable.View>
                                : null}
                        </View>

                        <Text style={[styles.text_footer, { marginTop: 35 }]}>Email</Text>
                        <View style={styles.action}>
                            <Feather
                                name="mail"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput
                                placeholder="Enter Email"
                                style={styles.textInput}
                                autoCapitalize="none"
                                value={data.email}
                                onChangeText={(val) =>
                                    textInputChange(val)
                                }
                            />
                            {/* now use iteration to determine the display of the icon */}
                            {data.check_textInputChange ?
                                <Animatable.View
                                    animation="bounce"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={15}
                                    />

                                </Animatable.View>
                                : null}
                        </View>
                        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
                        <View style={styles.action}>
                            <Feather
                                name="lock"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput
                                placeholder="Enter Password"
                                secureTextEntry={data.secureTextEntry ? true : false}
                                style={styles.textInput}
                                autoCapitalize="none"
                                value={data.password}
                                onChangeText={(val) =>
                                    handlePasswordChange(val)
                                }
                            />
                            <TouchableOpacity
                                onPress={updateSecureTextEntry}
                            >
                                {data.secureTextEntry ?
                                    <Feather
                                        name="eye-off"
                                        color="gray"
                                        size={15}
                                    />
                                    :
                                    <Feather
                                        name="eye"
                                        color="gray"
                                        size={15}
                                    />
                                }
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.text_footer, { marginTop: 35 }]}>Confirm Password</Text>
                        <View style={styles.action}>
                            <Feather
                                name="lock"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput
                                placeholder="Enter Confirm Password"
                                secureTextEntry={data.confirm_secureTextEntry ? true : false}
                                style={styles.textInput}
                                autoCapitalize="none"
                                value={data.confirm_password}
                                onChangeText={(val) =>
                                    handleConfirmPasswordChange(val)
                                }
                            />
                            <TouchableOpacity
                                onPress={updateConfirmSecureTextEntry}
                            >
                                {data.confirm_secureTextEntry ?
                                    <Feather
                                        name="eye-off"
                                        color="gray"
                                        size={15}
                                    />
                                    :
                                    <Feather
                                        name="eye"
                                        color="gray"
                                        size={15}
                                    />
                                }
                            </TouchableOpacity>
                        </View>

                        <View style={styles.button}>
                            <TouchableOpacity style={styles.signIn}
                                onPress={signUp}
                            >
                                <LinearGradient
                                    colors={[colors.secondaryColor1, colors.secondaryColor1]}
                                    style={styles.signIn}

                                >
                                    <Text style={[styles.textSign, {
                                        color: '#fff'
                                    }]}>Sign Up</Text>
                                </LinearGradient>
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                                style={[styles.signIn, {
                                    borderColor: colors.secondaryColor1,
                                    borderWidth: 1,
                                    marginTop: 20
                                }]}
                            >
                                <Text style={[styles.textSign, {
                                    color: colors.secondaryColor2,
                                }]}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>


    )

};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondaryColor2
    },

    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontFamily: '_bold',
        fontSize: 30
    },
    text_footer: {
        color: colors.textColor1,
        fontSize: 15,
        fontFamily: '_semiBold',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
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
        fontSize: 12,
        fontFamily: '_regular',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        fontFamily: '_semiBold',
    },
    textSign: {
        fontSize: 18,
        fontFamily: '_semiBold',
    }
});