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
import { MaskedTextInput } from 'react-native-mask-text';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import Loader from '../components/Loader';
import client from '../api/client';

const LocalTransferScreen = () => {
  const navigation = useNavigation();
     // function to dismiss the keyboard when clicking out the input field
     dismissKeyboard = () => {
        Keyboard.dismiss();
      };

  const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails, myMethod ] = useContext(UserContext);

    const [userData, setUserData]= useState('');
    const [isMyLoading, setIsMyLoading] = useState(false);
    const [isloginBtn, setIsLoginBtn] = useState(false);
    const [logBtnDisabled, setLogBtnDisabled] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [newData, setNewData] = useState([]);

   
    const [data, setData] = useState({
      localBank_name: '',
      localAccount_name: '',
      localAccount_number: '',
      local_amount: '',
      localBank_address: '',
    });

    const handleInputChange = (name, val) => {
      setData({
        ...data,
        [name]: val,
      });
    };

    const handleFetchAccount = async() => {
      setIsMyLoading(true)
      try {
        const res = await client.post('/api/fetch_AccountDetailsMobile',{
          data: data.localAccount_number
        } 
        )
          if(res.data.msg == '200'){
          setNewData(res.data.userData)
          setData({
            ...data,
            localBank_name: res.data.userData.user_bank_name,
            localAccount_name: res.data.userData.surname + ' ' + res.data.userData.first_name,
            local_amount: '',
            localBank_address: '',
           
          })
            setHasError(false)
          }
          else if(res.data.status == '404'){
            setHasError(true)
          }
          else {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: 'Error',
              textBody: 'Something went wrong',
              textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
              titleStyle: { fontFamily: '_bold', fontSize: 20 },
              })
          }

      } catch (error) {
        console.log(error.message)
      }
      finally {
        setIsMyLoading(false)
      }
    } 

    useEffect(() => {
      // Use a setTimeout to delay the execution of the function
      const timeoutId = setTimeout(() => {
        if(data.localAccount_number.length === 10){
          handleFetchAccount();
        }
        // Clear the timeout to prevent further execution
        clearTimeout(timeoutId);
      }, 500);
    }, [data.localAccount_number]);

    const localTransferFund = () =>{
      //console.log('local transfer ', data )
      // Remove commas from the number
      if(data.localAccount_name === '' || data.localBank_name === '' || data.localAccount_number === '' || data.local_amount ===''){
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Required fields missing.',
          textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
          titleStyle: { fontFamily: '_bold', fontSize: 20 },
          })
        return;
      }
      const numberWithoutCommas = data.local_amount.replace(/,/g, '');
      navigation.navigate('confirmTransfer', {data})
     }

  return (
    <SafeAreaView keyboardDismissMode='interactive' style={{ flex: 1, backgroundColor: colors.secondaryColor2}}>
        <StatusBar backgroundColor={colors.secondaryColor2} barStyle="light-content" />
        <View style={{ flex: 1, backgroundColor: '#F7F7F7', }}>

         {/* header of the screen */}
        <LinearGradient
          colors={[colors.secondaryColor2, colors.secondaryColor2]}
          start={[0, 0]}
          end={[1, 1]}
          style={{ elevation: 30, shadowColor: '#930D2F'}}>
        <View style={[gs.rowBetween, { marginTop: Platform.OS === "ios" ? 15 : 26, marginBottom:Platform.OS === "ios" ? 6 : '', marginHorizontal: 10 }]}>
          <TouchableOpacity
            style={styles.circleIconLeft}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" color={colors.text} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleIconLeft1}>
            <Text
              style={{ fontSize: 22, fontFamily: "_semiBold", color: "#fff" }}>
              Local Transfer
            </Text>
          </TouchableOpacity>
          <View style={styles.nameView}></View>
        </View>
      </LinearGradient>

      {isMyLoading ? <Loader loading={isMyLoading} textInfo={'Requesting wait...'} /> : ''}
       
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
       
        <View style={styles.header}>
          {/* <Text style={styles.title}>Settings</Text> */}
          
          <Text style={styles.subtitle}>
            You can now easily send money to your friends and family
          </Text>
                
        </View>
          
         <Animatable.View style={[styles.rowWrapper, {marginBottom: 8} ]}
            animation="fadeInUpBig" >

            <KeyboardAvoidingView behavior="padding">
                    <View style={[styles.action, {borderBottomWidth:0, marginBottom: 30, marginRight: 20}]}>
                    {/* <Text style={[styles.text_footer, {marginTop: 8, marginRight: 8}]}>Reason</Text> */}
                    
                    {/* <DotIndicator color='#F2688B' size={5} /> */}
                    {hasError && <View style={{justifyContent: 'center', alignItems:'center', marginRight: 20}}>
                        <Text style={{fontFamily: '_regular', fontSize: 14, marginBottom: 5, color:'#d6040f'}}>We could not find this account details</Text>
                    </View>
                    }
                    
                    <View style={[styles.textAreaContainer, {marginBottom: 30}]} >
                    
                        <View style={[styles.action, {borderBottomWidth: 0, marginRight: 10}]}>
                            <TextInput 
                            placeholder="Account Number/ Tags ID"
                            textAlignVertical="top"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleInputChange('localAccount_number', val)}
                            value={data.localAccount_number}
                            onEndEditing={(e) => (e.nativeEvent.text)}
                            keyboardType="numeric"
                            maxLength={10}
                          />
                        </View>
                    </View>
                    
                    <View style={[styles.textAreaContainer, {marginBottom: 30}]} >
                
                        <View style={[styles.action, {borderBottomWidth: 0, marginRight: 10}]}>
                            <TextInput 
                            placeholder="Customer Bank Name"
                            textAlignVertical="top"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleInputChange('localBank_name', val)}
                            value={data.localBank_name}
                            onEndEditing={(e) => (e.nativeEvent.text)}
                            />
                        </View>
                    
                    </View>

                    <View style={[styles.textAreaContainer, {marginBottom: 30}]} >
                
                        <View style={[styles.action, {borderBottomWidth: 0, marginRight: 10}]}>
                            <TextInput 
                            placeholder="Account Name"
                            textAlignVertical="top"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleInputChange('localAccount_name', val)}
                            value={data.localAccount_name}
                            onEndEditing={(e) => (e.nativeEvent.text)}
                           />
                        </View>
                    
                    </View>

                    

                    <View style={[styles.textAreaContainer, {marginBottom: 30}]} >
                    <View style={[styles.action, {borderBottomWidth: 0, marginRight: 10, flexDirection: 'row'}]}>
                      <MaskedTextInput
                        type="currency"
                          options={{
                          //prefix: myDetails.currency_type,
                          decimalSeparator: '.',
                          groupSeparator: ',',
                          precision: 2,
                        }}
                        textAlignVertical="top"
                        style={styles.textInput}
                        onChangeText={(val) => handleInputChange('local_amount', val)}
                        keyboardType="numeric"
                        placeholder='Enter Amount'
                        placeholderTextColor="#aaa"
                      />
                      <Text style={{color: '#aaa', position:'relative'}}> {'\u20A6'}</Text>
                      </View>
                  </View>

                    <View style={styles.textAreaContainer} >
                
                        <View style={[styles.action, {borderBottomWidth: 0, marginRight: 10}]}>
                            <TextInput 
                            placeholder="Note/Description (optional)"
                            style={styles.textInput}
                            autoCapitalize="none"
                            multiline={true}
                            numberOfLines={5}
                            textAlignVertical="top"
                            onChangeText={(val) => handleInputChange('localBank_address', val)}
                            value={data.localBank_address}
                            onEndEditing={(e) => (e.nativeEvent.text)}
                           />
                        </View>
                     </View>
                     {/* Show this if user did not enter correct details */}
                     {/* <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Message should contain at least 10 characters long </Text>
                    </Animatable.View> */}
                 </View>
                 
                    <View style={[styles.button, {marginTop: 20}]}>
                        <TouchableOpacity  style={[styles.signIn, logBtnDisabled? styles.signInDisable: '']}
                            onPress={() => localTransferFund()}
                            disabled={logBtnDisabled}
                            //navigation.navigate('confirmTransfer')
                        > 
                        <LinearGradient
                        colors={[colors.secondaryColor1, colors.secondaryColor1]}
                        style={styles.signIn}
                        >
                            <Text style={[styles.textSign,{
                                color:'#fff'
                            }]}>{isloginBtn ? '' : "Transfer"} </Text>
                            {isloginBtn && <ActivityIndicator color='#fff' size={25}/>}
                        </LinearGradient>
                        </TouchableOpacity>   
                    </View>
            </KeyboardAvoidingView>
                         
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
  input: {
    height: 40,
    marginHorizontal: 0,
    marginVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
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

export default LocalTransferScreen;
