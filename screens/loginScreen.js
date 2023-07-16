import React , {useContext, useEffect, useState} from 'react';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../components/UserContext'; 

import { StatusBar } from 'expo-status-bar';
import {  Alert, StyleSheet, Text, TextInput, View, Image, Dimensions,
    Button, TouchableOpacity,
Platform } from 'react-native';

import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'
import { ScrollView } from 'react-native-gesture-handler';
import client from '../api/client';

import { setDataInLocalStorage } from '../components/localData';
import { gs, colors } from '../styles'

const LoginScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        // for input validation
        isValidUser: true,
        isValidPassword: true,
    });
    
    const [userLoggedToken, setUserLoggedToken] = useContext(UserContext);
    
    const [localState, setLocalState] = useState('');
    const [localUserInfo, setLocalUserInfo] = useState('');

    //console.log("User Token from login Page ", userLoggedToken);
   
    // get local storage variable here...
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('alreadyLaunch');
          if (value !== null) {
            setLocalState(value);
           // console.log(value);
          }
        } catch (error) {
          // Error retrieving data
          //console.log("Local error here ", error.message);
        }
      };
    // here we call the function into action by using useEffect hook
      useEffect(() =>{
        _retrieveData()
       })

    // function to determine when to show the check icon in the input field
    const textInputChange = (val) => {
        if(val.trim().length >= 4){
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        }else{
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

     // function to toggle password visibility
    const handlePasswordChange = (val) => {
        if(val.trim().length >= 5){
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        }else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    // create function for the toggle button
    const updateSecureTextEntry = (val) => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    // function to check if input username is empty
    // method one
    const handleValidUser = (val) =>{
        // trim() will remove any spaces and other unwanted characters
        if( val.trim().length >= 4 ){
            setData({
                ...data,
                isValidUser: true,
            })
        } else{
            setData({
                ...data,
                isValidUser: false,
            })
        }
    }

    const loginAction = async () =>{
        
        if(data.username.length == 0 || data.password.length == 0){
            Alert.alert("Error!", "Username and password required",[
                {text: "Okay"}
            ]);
            return
        }

        try {
            //console.log('Login Data ', newData);
            const res = await client.post('/api/login', {
            username: data.username,
            password: data.password,
             })
            .then(res => {
                //console.log('result from backend ', res.data)

                if(res.data.msg =='200'){
                    Dialog.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Success',
                        textBody: 'Congrats! account authenticated',
                        button: 'close',
                      });
                 AsyncStorage.setItem('USER_LOCAL_INFO', JSON.stringify(res.data.userData))
                 AsyncStorage.setItem('USER_TOKEN', JSON.stringify(res.data.token))
                 setDataInLocalStorage('USER_DATA', JSON.stringify(res.data.userData))
                 
                 setLocalUserInfo(res.data.userData)
                 setUserLoggedToken(res.data.token)
              
                //  Alert.alert("Successful", "Account authenticated!",[
                        
                //         {text: "Okay"}
                //     ]);
                } else if(res.data.status == '401') {
                    Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Failed',
                        textBody: 'No user found.',
                        })
                    // Alert.alert("Login failed", "No user found",[
                    //     {text: "Okay"}
                    // ]);
                }
                else if(res.data.status == '404'){
                    Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Failed',
                        textBody: 'Username or Password incorrect.',
                        })
                    // Alert.alert("Login failed", "Username or Password incorrect",[
                    //     {text: "Okay"}
                    // ]);
                } else {
                    Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Error',
                        textBody: 'Sorry, Something went wrong.',
                        })
                    // Alert.alert("Error", "Something went wrong",[
                    //     {text: "Okay"}
                    // ]);
                }
             //console.log('My username from backend ', res.data.userData)
            });
        } catch (error) {
            console.log(error.message)
            }
    }

  return (
    <View style={styles.container}>
    <StatusBar backgroundColor={colors.secondaryColor2} style="light" />

    <View style={styles.header}>
        <Text style={styles.text_header}>Welcome</Text>
        <Text style={styles.text_header_section}>Login to continue...</Text>
    </View>

    
    <Animatable.View 
    animation='fadeInUpBig'
    style={styles.footer}>
    <ScrollView>
    <Text style={styles.text_footer}>Username</Text>
        <View style={styles.action}>
            <FontAwesome 
            name="user-o"
            color="#05375a"
            size={20}
            />
            <TextInput 
            placeholder="Enter Username"
            style={styles.textInput}
            autoCapitalize="none"

            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) =>handleValidUser(e.nativeEvent.text)}
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
            : null }
        </View>
         {/* How error message here if username field is empty */}
            { data.isValidUser ? null : 
        <Animatable.View animation="fadeInLeft" duration={500}>
        <Text style={styles.errorMsg}>Username must be 4 characters long</Text>
        </Animatable.View>
            }
        
        <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
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

            onChangeText={(val) => handlePasswordChange(val)}
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
        {/* How error message here if password field is empty */}
        { data.isValidPassword ? null :
        <Animatable.View animation="fadeInLeft" duration={500}>
        <Text style={styles.errorMsg}>Password must be 5 characters long</Text>
        </Animatable.View>
        }

        <View style={styles.button}>
            <TouchableOpacity style={styles.signIn}
                onPress={() =>{loginAction(data.username, data.password)}}
            > 
            <LinearGradient
            colors={[colors.secondaryColor1, colors.secondaryColor1]}
            style={styles.signIn}
            >
                <Text style={[styles.textSign, {
                    color:'#fff'
                }]}>Sign In</Text>
            </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={[styles.signIn, {
                borderColor: colors.secondaryColor1,
                borderWidth: 1,
                marginTop: 20
            }]}
            >
                <Text style={[styles.textSign, {
                    color:colors.blackColor2,
                }]}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
    </Animatable.View>
   
</View>
  );
}


export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: colors.secondaryColor2,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_header_section: {
        color: '#fff',
        fontSize: 25,
        opacity: 0.4,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        fontFamily:'_semiBold'
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
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
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
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });

