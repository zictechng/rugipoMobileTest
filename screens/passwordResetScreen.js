import React, { useState, useContext, useEffect } from 'react';
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
  Platform
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
import * as Animatable from 'react-native-animatable';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import client from '../api/client';
import Loader from '../components/Loader';

const PasswordResetSCreen = () => {
  const navigation = useNavigation();
     // function to dismiss the keyboard when clicking out the input field
     dismissKeyboard = () => {
        Keyboard.dismiss();
      };

  const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails, myMethod ] = useContext(UserContext);

    const [isloginBtn, setIsLoginBtn] = useState(false);
    const [logBtnDisabled, setLogBtnDisabled] = useState(false);
    const [btnRegLoading, setBtnRegLoading] = useState(false);
    const [userID, setUserID] = useState({});
     // get user token details from local storage here
  //   const getValueFromStorage = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('USER_LOCAL_INFO'); // Replace 'yourKey' with the key you used to store the value.
  //       if (value !== null) {
  //         setUserID(value);
  //        } else {
  //         console.log('Value not found in AsyncStorage');
  //       }
  //     } catch (error) {
  //       console.error('Error reading value from AsyncStorage:', error);
  //     }
  //   };
  // useEffect(() => {
  //   getValueFromStorage();
  // }, [userID]);

    const [data, setData] = React.useState({
      previous_password: '',
      new_password: '',
      confirm_newPassword: '',
      uid: myDetails._id,
    });

    const handleInputChange = (name, val) => {
      setData({
        ...data,
        [name]: val,
      });
    };

    const confirmUpdate = () =>{
      return (
        Alert.alert(
          title='Caution !',
          message='Are you sure you want to update your password?',
          [
            {
              text: 'Cancel',
              onPress: () => (''),
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => updatePassword(),
            style: 'ok',
            },
          ],
            {cancelable : true}
          )
        )
      }

    const updatePassword = async () =>{
      if(data.new_password === undefined || data.new_password ==='' || data.confirm_newPassword ===''){
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'All fields are required',
          textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
          titleStyle: { fontFamily: '_bold', fontSize: 20 },
      })
      return
      }
      if(data.new_password !== data.confirm_newPassword){
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Fail',
          textBody: 'Passwords do not match',
          textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
          titleStyle: { fontFamily: '_bold', fontSize: 20 },
      })
      return
      }
      if(data.new_password.length < 5){
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Notice',
          textBody: 'Password length too short, 6 characters minimum',
          textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
          titleStyle: { fontFamily: '_bold', fontSize: 20 },
      })
      return
      }
      try {
        setBtnRegLoading(true);
        const res = await client.post('/api/updateUser_passwordMobile', data)
        if(res.data.msg == '200'){
          setData({
            previous_password:'',
            new_password: '',
            confirm_newPassword: '',
          })
          // redirect back to profile page
          navigation.navigate('Profile');
         Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Successful',
          textBody: 'Your account password has been updated successfully',
          button: 'Okay',
          textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
          titleStyle: { fontFamily: '_bold', fontSize: 20 },
        })
        
      }
        else if (res.data.status == '401') {
        Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Failed',
            textBody: 'Authentication required',
            textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
            titleStyle: { fontFamily: '_bold', fontSize: 20 },
        })
  
      }
      else if (res.data.status == '500') {
        Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: 'Error occurred while processing! Please try again later',
            textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
            titleStyle: { fontFamily: '_bold', fontSize: 20 },
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
    } catch (error) {
      console.log(error.message)
      }
      finally {
        setBtnRegLoading(false);
      }
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
              Change Password
            </Text>
          </TouchableOpacity>
          <View style={styles.nameView}></View>
        </View>
      </LinearGradient>
      
      <Loader  loading={btnRegLoading} textInfo={'Updating wait...'}/>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
       
        <View style={styles.header}>
          {/* <Text style={styles.title}>Settings</Text> */}
          
          <Text style={styles.subtitle}>
            The security of your account is very important.
          </Text>
                
        </View>
                
                
         <Animatable.View style={[styles.rowWrapper, {marginBottom: 8} ]}
            animation="fadeInUpBig" >

            <View>
                    <View style={[styles.action, {borderBottomWidth:0, marginBottom: 30, marginRight: 20}]}>
                    {/* <Text style={[styles.text_footer, {marginTop: 8, marginRight: 8}]}>Reason</Text> */}
                    <View style={[styles.textAreaContainer, {marginBottom: 30}]} >
                
                        <View style={[styles.action, {borderBottomWidth: 0, marginRight: 10}]}>
                            <TextInput 
                            placeholder="Old password"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleInputChange('previous_password', val)}
                            value={data.previous_password}
                            onEndEditing={(e) => (e.nativeEvent.text)}
                            secureTextEntry={true}
                            //onChangeText={(text) => setComplainMessage({text})}
                            //value={complainMessage.text}
                            />
                        </View>
                    
                    </View>

                    <View style={[styles.textAreaContainer, {marginBottom: 30}]} >
                
                        <View style={[styles.action, {borderBottomWidth: 0, marginRight: 10}]}>
                            <TextInput 
                            placeholder="New Password"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleInputChange('new_password', val)}
                            value={data.new_password}
                            onEndEditing={(e) => (e.nativeEvent.text)}
                            secureTextEntry={true}
                            />
                        </View>
                    
                    </View>

                    <View style={styles.textAreaContainer} >
                
                        <View style={[styles.action, {borderBottomWidth: 0, marginRight: 10}]}>
                            <TextInput 
                            placeholder="Confirm Password"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleInputChange('confirm_newPassword', val)}
                            value={data.confirm_newPassword}
                            onEndEditing={(e) => (e.nativeEvent.text)}
                           secureTextEntry={true}
                            />
                        </View>
                     </View>
                     {/* Show this if user did not enter correct details */}
                    
                 </View>
                       {/* if reason is not selected show error here */}
                
                {/* How error message here if message field is empty */}
                    
                    <View style={styles.button}>
                        <TouchableOpacity  style={[styles.signIn, logBtnDisabled? styles.signInDisable: '']}
                            onPress={() =>{confirmUpdate()}}
                            disabled={logBtnDisabled}
                        > 
                        <LinearGradient
                        colors={[colors.secondaryColor1, colors.secondaryColor1]}
                        style={styles.signIn}
                        >
                            <Text style={[styles.textSign,{
                                color:'#fff'
                            }]}>{isloginBtn ? '' : "Update"} </Text>
                            {isloginBtn && <ActivityIndicator color='#fff' size={25}/>}
                        </LinearGradient>
                        </TouchableOpacity>

                        
                    </View>
            
            </View>
                         
        </Animatable.View>

                {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color:'#aaa' }}>Your referrals details will show here </Text>
                    <View
                      style={{ justifyContent: "center", alignItems: "center" }}>
                      <Ionicons
                        name="file-tray-outline"
                        size={30}
                        color="#aaa"
                        marginLeft={8}/>
                    </View>
                </View> */}

      </ScrollView>
       </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
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

export default PasswordResetSCreen;
