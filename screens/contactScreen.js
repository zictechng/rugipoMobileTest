import React, { useState, useContext } from 'react';
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
  Modal
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { UserContext } from "../components/UserContext";
import FeatherIcon from 'react-native-vector-icons/Feather';
import Feather from 'react-native-vector-icons/Feather'
import {
  Ionicons,
  
} from "@expo/vector-icons";
import { gs, colors } from "../styles";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable'
import DatePicker from 'react-native-modern-datepicker'
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { SelectList } from 'react-native-dropdown-select-list';

const ContactUsScreen = () => {
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

const [complainMessage, setComplainMessage] = useState({})

    const [userData, setUserData]= useState('');
    const [isMyLoading, setIsMyLoading] = useState(false);
    const [isloginBtn, setIsLoginBtn] = useState(false);
    const [logBtnDisabled, setLogBtnDisabled] = useState(false);

    const [selectedData, setSelectedData] = useState('');

    // date implementation
    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() +1), 'DD/MM/YYYY')    
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');
    const [datePick, setDatePick] = useState(false);

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

    const optionData = [
        {key:'Debit', value:"Debit"},
        {key:'Credit', value:"Credit"},
        {key:'Loan', value:"Loan"},
        {key:'Account Issue', value:"Account Issue"},
        {key:'Login Issue', value:"Login Issue"},
        {key:'Account Balance', value:"Account Balance"},
        {key:'Other Issue', value:"Other Issue"},
];
    const sendMessage = () =>{
        setLogBtnDisabled(true)
        setIsLoginBtn(true)
        console.log('Respond of Message ', selectedData + ' ' + data.reportMessage)
    }

  return (
        <SafeAreaView 
        animation='fadeInUpBig'
        style={{ flex: 1, backgroundColor: '#f6f6f6', }}>
        <StatusBar
      style="light" translucent={true} backgroundColor='transparent'animated={true} />

         {/* header of the screen */}
      <LinearGradient
        colors={[colors.secondaryColor2, colors.secondaryColor2]}
        start={[0, 0]}
        end={[1, 1]}
        style={{ elevation: 30, shadowColor: '#930D2F'}}>
        <View style={[gs.rowBetween, { marginTop: 18, marginHorizontal: 10 }]}>
          <TouchableOpacity
            style={styles.circleIconLeft}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" color={colors.text} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleIconLeft1}>
            <Text
              style={{ fontSize: 22, fontFamily: "_semiBold", color: "#fff" }}>
              Contact Us
            </Text>
          </TouchableOpacity>
          <View style={styles.nameView}></View>
        </View>
      </LinearGradient>
      
       
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
       
        <View style={styles.header}>
          {/* <Text style={styles.title}>Settings</Text> */}
          <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                        <Image source={require('../assets/customer-service.png')} style={{width:130, height:130,}}  />
                    </View>
          <Text style={styles.subtitle}>
            How may we help you today? drop us a message.
          </Text>
                
        </View>
                
                
         <Animatable.View style={[styles.rowWrapper, {marginBottom: 8} ]}
            animation="fadeInUpBig" >

            <View>
                    <View style={[styles.action, {borderBottomWidth:0, marginBottom: 30, marginRight: 20}]}>
                    {/* <Text style={[styles.text_footer, {marginTop: 8, marginRight: 8}]}>Reason</Text> */}
                        <SelectList 
                        data={optionData} 
                        selected={setSelectedData}
                        //onSelect={() => alert(selectedData)}
                        setSelected={(val) => setSelectedData(val)} 
                        boxStyles={{borderColor:'#aaa', borderRadius:5}}
                        inputStyles={{fontFamily: '_semiBold', fontSize: 14, color:colors.textColor1}}
                        dropdownStyles={{width: 346}}
                        dropdownTextStyles={{fontFamily:'_semiBold', fontSize:14, color:colors.textColor1}}
                        placeholder='Select reason'
                        maxHeight={200}
                        />
                    </View>
                       {/* if reason is not selected show error here */}
                
                {/* <Text style={[styles.text_footer, {marginTop: 20}]}>Message</Text> */}
                <View style={styles.textAreaContainer} >
                
                    <View style={[styles.action, {borderBottomWidth: 0, marginRight: 10}]}>
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    },
  rowIcon: {
    marginRight: 12,
  },

  text_footer: {
    color: colors.textColor1,
    fontSize: 18,
    fontFamily: '_semiBold',
},
action: {
    marginTop: 20,
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
    marginRight: 20
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  }
});

export default ContactUsScreen;
