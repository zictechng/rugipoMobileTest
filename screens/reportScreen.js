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
  Switch,
  StatusBar,
  TextInput, 
  Keyboard,
  ActivityIndicator,
  Modal, 
  Platform
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../components/UserContext";
import moment from "moment";
import {
  Ionicons,
} from "@expo/vector-icons";
import { gs, colors } from "../styles";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable'
import DatePicker from 'react-native-modern-datepicker'
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import client from '../api/client';
import Loader from '../components/Loader';
import NetInfo from '@react-native-community/netinfo'

const ReportScreen = () => {
  const navigation = useNavigation();
     // function to dismiss the keyboard when clicking out the input field
     dismissKeyboard = () => {
        Keyboard.dismiss();
      };

  const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails, myMethod ] = useContext(UserContext);

  const [data, setData] = React.useState({
    reportSubject: '',
    reportMessage: '',
    reportDate: '',
    check_subjectInputChange: false,
    check_messageInputChange: false,
});

    const [userData, setUserData]= useState('');
    const [isloginBtn, setIsLoginBtn] = useState(false);
    const [logBtnDisabled, setLogBtnDisabled] = useState(false);
    const [myToken, setMyToken] = useState({});
    const [btnRegLoading, setBtnRegLoading] = useState(false);

    // date implementation
    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() +1), 'DD/MM/YYYY')    
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');
    const [datePick, setDatePick] = useState(false);
    // check if device is connected to network
    const [isConnected, setIsConnected] = useState(null);
    const [connectionState, setConnectionState] = useState(false);

    const handleOnPress =() => {
      setOpen(!open);
      setDatePick(false);
    }

    const handleChange =(propDate) => {
      setDate(propDate)
      setDatePick(true);
      //const displayDate = getFormatedDate(propDate, 'DD/MM/YYYY');
      //console.log("New Date", displayDate) 
      }
      

    // function for subject field
    const textInputChange = (val) => {
        if(val.trim().length >= 4){
            setData({
                ...data,
                reportSubject: val,
                check_subjectInputChange: false,
            });
        }else{
            setData({
                ...data,
                reportSubject: val,
                check_subjectInputChange: true,
            });
        }
    }

    // function for message input field
    const textInputChangeMessage = (val) => {
        if(val.trim().length >= 20){
            setData({
                ...data,
                reportMessage: val,
                check_messageInputChange: false,
            });
        }else{
            setData({
                ...data,
                reportMessage: val,
                check_messageInputChange: true,
             });
        }
    }

    // get user token details from local storage here
  _getUserTokenInfo = async () => {
    try {
      const TokenInfo = await AsyncStorage.getItem("USER_TOKEN");
      if (TokenInfo !== null) {
        setMyToken(TokenInfo);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    _getUserTokenInfo();
  }, [myToken]);

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

    const postData ={
      ticket_message: data.reportMessage,
      subject: data.reportSubject,
      sender_name: myDetails.surname + ' ' + myDetails.first_name,
      tick_date: date,
      createdBy: myDetails._id,
      ticket_type:'Ticket',
    }
    const sendMessage = async () =>{
      if(!data.reportMessage || !data.reportSubject || !date){
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'All fields are required',
          titleStyle: {fontFamily: '_semiBold', fontSize: 18},
          textBodyStyle: {fontFamily: '_regular', fontSize: 14,},
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
      try {
         // call api method
         setBtnRegLoading(true);
         setLogBtnDisabled(true)
         //console.log('Respond of Message ', data.reportSubject + ' ' + data.reportMessage + ' ' + date  +' ' + myToken)
          const res = await client.post('/api/submit_ticketMobile', postData, {
          //  headers: {
          //   Accept: 'application/json',
          //   'Content-Type': 'application/json',
          //   Authorization: `Bearer ${myToken}`,
          // },
           })
           //console.log("Feedback", res.data)
            if(res.data.msg == '200'){
            setData({
            reportSubject: '',
            reportMessage: '',
           })
           setDate('')
          
           Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Successful',
            textBody: 'Your ticket sent successfully! We will get in-touched shortly',
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
          setLogBtnDisabled(false)
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
              Report Issues
            </Text>
          </TouchableOpacity>
          <View style={styles.nameView}></View>
        </View>
      </LinearGradient>
      <Loader  loading={btnRegLoading} textInfo={'Processing wait...'}/>
       
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
       
        <View style={styles.header}>
          {/* <Text style={styles.title}>Settings</Text> */}

          <Text style={styles.subtitle}>
            You can easily report any issues/complaints and we will respond swiftly.
          </Text>
        </View>
                
                
         <Animatable.View style={[styles.rowWrapper, {marginBottom: 8} ]}
            animation="fadeInUpBig" >

            <View>
            
                <Text style={[styles.text_footer, {marginTop: 8}]}>Subject</Text>
                    <View style={styles.action}>
                        <TextInput 
                        placeholder="Enter Subject"
                        style={styles.textInput}
                        autoCapitalize="none"
                        value={data.reportSubject}
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) =>textInputChange(e.nativeEvent.text)}
                        />
                    </View>

                    <Text style={[styles.text_footer, {marginTop: 20}]}>Date</Text>
                    <TouchableOpacity style={styles.action}
                      onPress={handleOnPress}>
                        <Text style={styles.textInput}>{date ? date : 'Select Date'}</Text>
                    </TouchableOpacity>
                    {/* If date is not pick when submit button is click show warning here */}
                    
                <Text style={[styles.text_footer, {marginTop: 20}]}>Message</Text>
                <View style={styles.textAreaContainer} >
                
                    <View style={[styles.action, {borderBottomWidth: 0}]}>
                        <TextInput 
                        placeholder="Enter Message"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChangeMessage(val)}
                        multiline={true}
                        numberOfLines={10}
                        textAlignVertical="top"
                        value={data.reportMessage}
                        onEndEditing={(e) =>textInputChangeMessage(e.nativeEvent.text)}
                        //onChangeText={(text) => setComplainMessage({text})}
                        //value={complainMessage.text}
                        />
                        </View>
                    
                </View>
                {/* How error message here if message field is empty */}
                { data.check_messageInputChange ?
                    <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Message should contain at least 10 characters long </Text>
                    </Animatable.View> : null
                        }

            {/* Date Modal alert here */}
            <Modal
              transparent={true}
              animationType="slide"
              useNativeDriver={true}
              visible={open}>

              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  
                  <DatePicker 
                    mode='calendar'
                    minimumDate={startDate}
                    selected={date}
                    onDateChange={handleChange}
                    options={{
                      textHeaderColor: colors.secondaryColor2,
                      textDefaultColor: colors.blackColor1,
                      selectedTextColor: '#fff',
                      mainColor: colors.secondaryColor2,
                      textSecondaryColor: colors.textColor1,
                      //borderColor: 'rgba(122, 146, 165, 0.1)',
                    }}
                  />

                <TouchableOpacity style={styles.action}
                      onPress={handleOnPress}>
                      {datePick ? <Text style={{fontFamily:'_semiBold', color:colors.secondaryColor1, fontSize: 15}}>Confirm</Text>: 
                      <Text style={{fontFamily:'_semiBold', color:'#aaa', fontSize: 15}}>Close</Text> }
                  </TouchableOpacity>
                </View>
              </View>
              
          </Modal>
               
                    <View style={styles.button}>
                        <TouchableOpacity  style={[styles.signIn, logBtnDisabled? styles.signInDisable: '']}
                            onPress={() =>{sendMessage()}}
                            disabled={logBtnDisabled}
                        > 
                        <LinearGradient
                        colors={[colors.secondaryColor1, colors.secondaryColor1]}
                        style={styles.signIn}
                        >
                            <Text style={[styles.textSign,{
                                color:'#fff'
                            }]}>{isloginBtn ? '' : "Report"} </Text>
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
  modalView:{
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset:{
      width: 0,
      height: 2,
    },
    shadowOpacity:0.25,
    shadowRadius: 4,
    elevation:5,
  },
  section: {
    paddingTop: 5,
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
  rowLabel: {
    fontSize: 14,
    fontFamily: '_semiBold',
    color: '#777',
  },
 
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  text_footer: {
    color: colors.textColor1,
    fontSize: 18,
    fontFamily: '_semiBold',
},
action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 0.6,
    borderBottomColor: '#aaa',
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
    marginTop: 50,
    marginBottom: 20,
    marginRight: 20,
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
},
textAreaContainer: {
    borderColor: '#aaa',
    borderWidth: 0.5,
    marginHorizontal: 5,
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  }
});

export default ReportScreen;
