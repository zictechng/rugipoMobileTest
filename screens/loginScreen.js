import React , {useContext, useEffect, useState} from 'react';
import {  Alert, ActivityIndicator, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, View, Image, ImageBackground, Dimensions,
    Button, TouchableOpacity,
Platform } from 'react-native';

import { UserContext } from '../components/UserContext';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import { StatusBar } from 'expo-status-bar';

import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'
import { ScrollView } from 'react-native-gesture-handler';
import client from '../api/client';

import { setDataInLocalStorage } from '../components/localData';
import { gs, colors } from '../styles';
import Loader from '../components/Loader';

const LoginScreen = ({navigation}) => {

     // function to dismiss the keyboard when clicking out the input field
     dismissKeyboard = () => {
        Keyboard.dismiss();
      };

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        // for input validation
        isValidUser: true,
        isValidPassword: true,
    });
    
    const [loginState, setLoginState, isLoading, setIsLoading, userRegCode, setUserRegCode] = useContext(UserContext);

    const [userData, setUserData]= useState('');
    const [isMyLoading, setIsMyLoading] = useState(false);
    const [isloginBtn, setIsLoginBtn] = useState(false);
    const [logBtnDisabled, setLogBtnDisabled] = useState(false);
    

    // get user information from local storage here
  _getUserLocalInfo = async () => {
    try {
      const UserInfo = await AsyncStorage.getItem('USER_LOCAL_INFO');

      if (UserInfo !== null) {
        const storageUser = JSON.parse(UserInfo);
            setUserData(storageUser);
         }
    } catch (error) {
      // Error retrieving data
      console.log("Local error here ", error.message);
    }
  }
  
  useEffect(() => {
    _getUserLocalInfo();
  }, [userData]);

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
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Username and password required',
                titleStyle: {fontFamily: '_semiBold', fontSize: 18},
                textBodyStyle: {fontFamily: '_regular', fontSize: 14,},
                })
            // Alert.alert("Error!", "Username and password required",[
            //     {text: "Okay"}
            // ]);
            return
        }

        try {
            setLogBtnDisabled(true)
            setIsLoginBtn(true)
            //console.log('Login Data ', newData);
            const res = await client.post('/api/login', {
            username: data.username,
            password: data.password,
             })
            //.then(res => {
                    if(res.data.msg =='200'){
                    // Dialog.show({
                    //     type: ALERT_TYPE.SUCCESS,
                    //     title: 'Success',
                    //     textBody: 'Congrats! account authenticated',
                    //     button: 'close',
                    //   });
                 AsyncStorage.setItem('USER_LOCAL_INFO', JSON.stringify(res.data.userData))
                 AsyncStorage.setItem('USER_TOKEN', JSON.stringify(res.data.token))
                 setDataInLocalStorage('USER_TOKEN', JSON.stringify(res.data.token))
                 setLoginState(res.data.token)
               

                setIsMyLoading(false);
                setLogBtnDisabled(false);
                setIsLoginBtn(false)
                } else if(res.data.status == '401') {
                    Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Failed',
                        textBody: 'No user found.',
                        titleStyle: {fontFamily: '_semiBold', fontSize: 18},
                        textBodyStyle: {fontFamily: '_regular', fontSize: 14,},
                        })
                     }
                else if(res.data.status == '404'){
                    Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Failed',
                        textBody: 'Username or Password incorrect.',
                        titleStyle: {fontFamily: '_semiBold', fontSize: 18},
                        textBodyStyle: {fontFamily: '_regular', fontSize: 14,},
                        })
                    // Alert.alert("Login failed", "Username or Password incorrect",[
                    //     {text: "Okay"}
                    // ]);
                } 
                else if(res.data.status == '402'){
                    Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Failed',
                        textBody: 'Account not active',
                        titleStyle: {fontFamily: '_semiBold', fontSize: 18},
                        textBodyStyle: {fontFamily: '_regular', fontSize: 14,},
                        })
                    // Alert.alert("Login failed", "Username or Password incorrect",[
                    //     {text: "Okay"}
                    // ]);
                } 
                else {
                    Toast.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Error',
                        textBody: 'Sorry, Something went wrong.',
                        titleStyle: {fontFamily: '_semiBold', fontSize: 18},
                        textBodyStyle: {fontFamily: '_regular', fontSize: 14,},
                        })
                    // Alert.alert("Error", "Something went wrong",[
                    //     {text: "Okay"}
                    // ]);
                }
             //});
        } catch (error) {
            console.log(error.message)
            }
            finally {
            setIsMyLoading(false);
            setLogBtnDisabled(false);
            setIsLoginBtn(false);
            }
    }

  return (
    
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
        
        <View style={styles.container} >
            {/* <Image style={styles.bgImage} source={require('../assets/bg5.png')}/> */}
            <StatusBar backgroundColor={colors.secondaryColor2} style="light" />
            
            <View style={styles.header}>
            
                {userData != '' ? <Text style={styles.text_header}>Welcome,<Text style={{fontSize: 25}}> { userData.surname}</Text></Text>:
                <Text style={styles.text_header}>Welcome</Text>}
                <Text style={styles.text_header_section}>Login to access your account.</Text>
                {/* <Text style={styles.text_header_section} onPress={() =>navigation.navigate('Verify')}>Verify...</Text> */}
            </View>
    
    <Animatable.View 
    animation='fadeInUpBig'
    style={styles.footer}>
    <ScrollView showsVerticalScrollIndicator={false}>
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
            <TouchableOpacity  style={[styles.signIn, logBtnDisabled? styles.signInDisable: '']}
                onPress={() =>{loginAction(data.username, data.password)}}
                disabled={logBtnDisabled}
            > 
            <LinearGradient
            colors={[colors.secondaryColor1, colors.secondaryColor1]}
            style={styles.signIn}
            >
                <Text style={[styles.textSign,{
                    color:'#fff'
                }]}>{isloginBtn ? '' : "Sign In"} </Text>
                {isloginBtn && <ActivityIndicator color='#fff' size={25}/>}
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
                    color:colors.secondaryColor2,
                }]}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
    </Animatable.View>
   
    </View>
    </TouchableWithoutFeedback>
    
    
   
  );
}


export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
       backgroundColor: colors.secondaryColor2,
      },
      
    disabledStyle: {
    opacity: 1.9,
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
        fontFamily: '_semiBold',
        fontSize: 30
    },
    text_header_section: {
        color: '#cccac6',
        fontSize: 18,
        fontFamily: '_regular',
        opacity: 1.9,
    },
    text_footer: {
        color: colors.textColor1,
        fontSize: 18,
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
        fontSize: 14,
        fontFamily: '_regular',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    bgImage:{
        position: 'absolute',
        bottom: -6,
        right: 20,
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
       
    }
  });

