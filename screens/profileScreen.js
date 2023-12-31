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
  Modal,
  Platform,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../components/UserContext";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { SimpleModal } from '../components/SimpleModal';
import { LoanModal } from '../components/loanModal';
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import { gs, colors } from "../styles";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import client from '../api/client';
import Loader from '../components/Loader';

const ProfileScreen = () => {
const navigation = useNavigation();

  const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails, myMethod ] = useContext(UserContext);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isLoanModalVisible, setisLoanModalVisible] = useState(false);
  const [chooseData, setchooseData] = useState();

  const [showAboutModal, setshowAboutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [btnRegLoading, setBtnRegLoading] = useState(false);

  const changeModalVisible = (bool) =>{
    setisModalVisible(bool);
    setshowAboutModal(false);
  }

  const loanModalVisible = (bool) =>{
    setisLoanModalVisible(bool);
    setshowAboutModal(false);
  }

  const setData = (data) =>{
    setchooseData(data);
    setshowAboutModal(false);
    };

  const logout = async() =>{
    setLogoutLoading(true);
    setTimeout(async() =>{
    try {
          const res = await AsyncStorage.removeItem('USER_TOKEN');
          const clearLogout = await AsyncStorage.removeItem('LOGIN_ID');
          if(res === undefined || res === null)
          {
          navigation.replace('Login');
          setLoginState(null)
         // console.log('AsyncStorage cleared successfully.');
        }
       
       } catch (error) {
        console.error('Error clearing app data.');
      }
      finally{
      setLogoutLoading(false);
      }
    }, 1000)
  
  }

  const handleAboutModal = () =>{
    Alert.alert(
      title='Hay !',
      message='Thank you for checking, we are currently working on this module, please check back.',
      [
        {
          text: 'Cancel',
          onPress: () => (''),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => (''),
        style: 'ok',
        },
      ],
        {cancelable : true}
      );
  }
 
  const postID = {
    uid : myDetails._id
  }
  const blockendMyAccount = async() => {

    try {
      setBtnRegLoading(true);
      const res = await client.post('/api/block_AccountMobile', postID)
      if(res.data.msg == '200'){
       Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Successful',
        textBody: 'Your account has been block successfully',
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

  const deactiveAccount = () =>{
          
    return (
      Alert.alert(
        title='Caution !',
        message='Are you sure you want to blocked your account?',
        [
          {
            text: 'Cancel',
            onPress: () => (''),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => blockendMyAccount(),
          style: 'ok',
          },
        ],
          {cancelable : true}
        )
      )
    }

    
    const requestLogout = () =>{
      return (
        Alert.alert(
          title='Confirm !',
          message='Are you sure you want to logout?',
          [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => logout(),
            style: 'ok',
            },
          ],
            {cancelable : true}
          )
  
          //   Dialog.show({
          //     type: ALERT_TYPE.WARNING,
          //     textBodyStyle: { fontFamily: '_regular', fontSize: 16 },
          //     titleStyle: { fontFamily: '_bold', fontSize: 20 },
          //     title: 'Caution ',
          //     textBody: 'Are you sure you want to de-activate your account?',
          //     button: 'Okay',
          //     onPress:{blockendMyAccount},
              
          // })
        )
      }
  return (
       <View style={{flex: 1}}>
        
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondaryColor2}}>
          <StatusBar backgroundColor={colors.secondaryColor2} barStyle="light-content" />
            <View style={{ flex: 1, backgroundColor: '#F7F7F7', }}>

         {/* header of the screen */}
      <LinearGradient
        colors={[colors.secondaryColor2, colors.secondaryColor2]}
        start={[0, 0]}
        end={[1, 1]}
        style={{ elevation: 30, shadowColor: '#930D2F'}}>
        <View style={[gs.rowBetween, {marginTop: Platform.OS === "ios" ? 15 : 45, marginBottom:Platform.OS === "ios" ? 6 : '', marginHorizontal: 10, justifyContent: 'center' }]}>
          <TouchableOpacity style={styles.circleIconLeft1}>
            <Text
              style={{ fontSize: 22, fontFamily: "_semiBold", color: "#fff" }}>
              Account
            </Text>
          </TouchableOpacity>
          <View style={styles.nameView}></View>

          {/* <Text style = {styles.text}>{new Date().toString().slice(0,11)}</Text> */}
        </View>
      </LinearGradient>
      
      <Loader  loading={btnRegLoading} textInfo={'Updating wait...'}/>

      <ScrollView contentContainerStyle={styles.container}>
       
        <View style={styles.header}>
          {/* <Text style={styles.title}>Settings</Text> */}

          {/* <Text style={styles.subtitle}>
            more action about your account and its operations
          </Text> */}
        </View>

        <View style={styles.profile}>
          {/* this is for image fetch from server  */}
          {/* <Image alt="" source={{
              uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
            }}
            style={styles.profileAvatar}
          /> */}
          <Image alt="" source={require('../assets/default_profile.png')}
            style={styles.profileAvatar}
          />

          <Text style={styles.profileName}>{myDetails.first_name}</Text>

          <Text style={styles.profileEmail}>{myDetails.email}</Text>

          
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Account Information</Text>
          </View>
                <View style={styles.sectionBody}>
                
                      <View style={[styles.rowWrapper, {borderTopWidth:0} ]}>
                            <TouchableOpacity 
                                onPress={() =>{
                                // navigation goes here
                                navigation.navigate('ProfileDetails')
                                  }}>
                                <View style={styles.row}>
                                  <Ionicons 
                                    color="#616161"
                                    name='person-outline'
                                    style={styles.rowIcon}
                                    size={22}
                                    />
                                     <Text style={styles.rowLabel}>Account Profile</Text>
                                        <View style={styles.rowSpacer} />
                                    
                                        {/* <Text style={styles.rowValue}>0000</Text> */}
                                        <FeatherIcon name='chevron-right' color='#ababab'
                                        size={22} />
                                    
                                        {/* <Switch
                                         value={form[1]}
                                         onValueChange={value => setForm({...form, [1]: value})}
                                         /> */}
                                 </View>       
                            </TouchableOpacity>
                      </View>

                      <View style={[styles.rowWrapper, {borderTopWidth:1} ]}>
                            <TouchableOpacity 
                                onPress={() =>{
                                // navigation goes here
                               
                               navigation.navigate('Referral')
                                  }}>
                                <View style={styles.row}>
                                  <FontAwesome5 
                                    color="#616161"
                                    name='network-wired'
                                    style={styles.rowIcon}
                                    size={22}
                                    />
                                     <Text style={styles.rowLabel}>Referrals</Text>
                                        <View style={styles.rowSpacer} />
                                        <FeatherIcon name='chevron-right' color='#ababab'
                                        size={22} />
                                    
                                        {/* <Switch
                                         value={form[1]}
                                         onValueChange={value => setForm({...form, [1]: value})}
                                         /> */}
                                 </View>       
                            </TouchableOpacity>
                      </View>

                      <View style={[styles.rowWrapper, {borderTopWidth:1} ]}>
                            <TouchableOpacity 
                                onPress={() =>{
                                // navigation goes here
                                navigation.navigate('Identification')
                                  }}>
                                <View style={styles.row}>
                                  <MaterialCommunityIcons 
                                    color="#616161"
                                    name='badge-account-outline'
                                    style={styles.rowIcon}
                                    size={22}
                                    />
                                     <Text style={styles.rowLabel}>Identification</Text>
                                        <View style={styles.rowSpacer} />
                                    
                                        {/* <Text style={styles.rowValue}>0000</Text> */}
                                        <FeatherIcon name='chevron-right' color='#ababab'
                                        size={22} />
                                    
                                        {/* <Switch
                                         value={form[1]}
                                         onValueChange={value => setForm({...form, [1]: value})}
                                         /> */}
                                 </View>       
                            </TouchableOpacity>
                      </View>
                    
                      <View style={[styles.rowWrapper, {borderTopWidth:1} ]}>
                            <TouchableOpacity 
                              //  onPress={() =>{
                              //   setshowModal(!showModal);
                              // }}
                              onPress={() =>changeModalVisible(true)}
                              >
                                <View style={styles.row}>
                                  <FontAwesome5 
                                    color="#616161"
                                    name='address-book'
                                    style={styles.rowIcon}
                                    size={22}
                                    />
                                     <Text style={styles.rowLabel}>Beneficiaries</Text>
                                        <View style={styles.rowSpacer} />
                                    
                                        {/* <Text style={styles.rowValue}>0000</Text> */}
                                        <FeatherIcon name='chevron-right' color='#ababab'
                                        size={22} />
                                    
                                        {/* <Switch
                                         value={form[1]}
                                         onValueChange={value => setForm({...form, [1]: value})}
                                         /> */}
                                 </View>       
                            </TouchableOpacity>
                      </View>
                </View>

                <View style={[styles.sectionHeader, {marginTop: 10}]}>
                        <Text style={styles.sectionHeaderText}>Help</Text>
                </View>
                <View style={styles.sectionBody}>
                
                      <View style={[styles.rowWrapper, {borderTopWidth:0} ]}>
                            <TouchableOpacity 
                                onPress={() =>{
                                // navigation goes here
                                navigation.navigate('ReportIssues')
                                  }}>
                                <View style={styles.row}>
                                  <MaterialIcons 
                                    color="#616161"
                                    name='report-problem'
                                    style={styles.rowIcon}
                                    size={22}
                                    />
                                     <Text style={styles.rowLabel}>Report Issues</Text>
                                        <View style={styles.rowSpacer} />
                                    
                                        {/* <Text style={styles.rowValue}>0000</Text> */}
                                        <FeatherIcon name='chevron-right' color='#ababab'
                                        size={22} />
                                    
                                        {/* <Switch
                                         value={form[1]}
                                         onValueChange={value => setForm({...form, [1]: value})}
                                         /> */}
                                 </View>       
                            </TouchableOpacity>
                      </View>

                      <View style={[styles.rowWrapper, {borderTopWidth:1} ]}>
                            <TouchableOpacity 
                               onPress={() =>loanModalVisible(true)}>
                                <View style={styles.row}>
                                  <MaterialIcons 
                                    color="#616161"
                                    name='messenger-outline'
                                    style={styles.rowIcon}
                                    size={22}
                                    />
                                     <Text style={styles.rowLabel}>Loan Request</Text>
                                        <View style={styles.rowSpacer} />
                                    
                                        {/* <Text style={styles.rowValue}>0000</Text> */}
                                        <FeatherIcon name='chevron-right' color='#ababab'
                                        size={22} />
                                    
                                        {/* <Switch
                                         value={form[1]}
                                         onValueChange={value => setForm({...form, [1]: value})}
                                         /> */}
                                 </View>       
                            </TouchableOpacity>
                      </View>

                      <View style={[styles.rowWrapper, {borderTopWidth:1} ]}>
                            <TouchableOpacity 
                                onPress={() =>{
                                // navigation goes here
                                handleAboutModal()
                                 }}>
                                <View style={styles.row}>
                                  <Ionicons 
                                    color="#616161"
                                    name='information-circle-outline'
                                    style={styles.rowIcon}
                                    size={22}
                                    />
                                     <Text style={styles.rowLabel}>About Us</Text>
                                        <View style={styles.rowSpacer} />
                                    
                                        {/* <Text style={styles.rowValue}>0000</Text> */}
                                        <FeatherIcon name='chevron-right' color='#ababab'
                                        size={22} />
                                    
                                        {/* <Switch
                                         value={form[1]}
                                         onValueChange={value => setForm({...form, [1]: value})}
                                         /> */}
                                 </View>       
                            </TouchableOpacity>
                      </View>
                    
                      <View style={[styles.rowWrapper, {borderTopWidth:1} ]}>
                            <TouchableOpacity 
                                onPress={() =>{
                                // navigation goes here
                                navigation.navigate('contact-us')
                                  }}>
                                <View style={styles.row}>
                                  <Ionicons 
                                    color="#616161"
                                    name='mail-outline'
                                    style={styles.rowIcon}
                                    size={22}
                                    />
                                     <Text style={styles.rowLabel}>Contact Us</Text>
                                        <View style={styles.rowSpacer} />
                                    
                                        {/* <Text style={styles.rowValue}>0000</Text> */}
                                        <FeatherIcon name='chevron-right' color='#ababab'
                                        size={22} />
                                    
                                        {/* <Switch
                                         value={form[1]}
                                         onValueChange={value => setForm({...form, [1]: value})}
                                         /> */}
                                 </View>       
                            </TouchableOpacity>
                      </View>
                </View>

                <View style={[styles.sectionHeader, {marginTop: 10}]}>
                        <Text style={styles.sectionHeaderText}>Security &amp; Settings</Text>
                </View>
                <View style={styles.sectionBody}>
                
                      <View style={[styles.rowWrapper, {borderTopWidth:0} ]}>
                            <TouchableOpacity 
                                onPress={() =>{
                                // navigation goes here
                                deactiveAccount()
                                  }}>
                                <View style={styles.row}>
                                  <MaterialIcons 
                                    color="#616161"
                                    name='block'
                                    style={styles.rowIcon}
                                    size={22}
                                    />
                                     <Text style={styles.rowLabel}>Block Account</Text>
                                        <View style={styles.rowSpacer} />
                                    
                                        {/* <Text style={styles.rowValue}>0000</Text> */}
                                        <FeatherIcon name='chevron-right' color='#ababab'
                                        size={22} />
                                    
                                        {/* <Switch
                                         value={form[1]}
                                         onValueChange={value => setForm({...form, [1]: value})}
                                         /> */}
                                 </View>       
                            </TouchableOpacity>
                      </View>

                      <View style={[styles.rowWrapper, {borderTopWidth:1} ]}>
                            <TouchableOpacity 
                                onPress={() =>{
                                // navigation goes here
                                 navigation.navigate('reset-pin')
                                  }}>
                                <View style={styles.row}>
                                  <MaterialIcons 
                                    color="#616161"
                                    name='security'
                                    style={styles.rowIcon}
                                    size={22}
                                    />
                                     <Text style={styles.rowLabel}>Reset Transfer Pin</Text>
                                        <View style={styles.rowSpacer} />
                                    
                                        {/* <Text style={styles.rowValue}>0000</Text> */}
                                        <FeatherIcon name='chevron-right' color='#ababab'
                                        size={22} />
                                    
                                        {/* <Switch
                                         value={form[1]}
                                         onValueChange={value => setForm({...form, [1]: value})}
                                         /> */}
                                 </View>       
                            </TouchableOpacity>
                      </View>

                      <View style={[styles.rowWrapper, {borderTopWidth:1} ]}>
                            <TouchableOpacity 
                                onPress={() =>{
                                // navigation goes here
                                 navigation.navigate('reset-password')
                                  }}>
                                <View style={styles.row}>
                                  <Ionicons 
                                    color="#616161"
                                    name='lock-closed-outline'
                                    style={styles.rowIcon}
                                    size={22}
                                    />
                                     <Text style={styles.rowLabel}>Reset Password</Text>
                                        <View style={styles.rowSpacer} />
                                    
                                        {/* <Text style={styles.rowValue}>0000</Text> */}
                                        <FeatherIcon name='chevron-right' color='#ababab'
                                        size={22} />
                                    
                                        {/* <Switch
                                         value={form[1]}
                                         onValueChange={value => setForm({...form, [1]: value})}
                                         /> */}
                                 </View>       
                            </TouchableOpacity>
                      </View>
                </View>


                <View style={[styles.sectionHeader, {marginTop: 10}]}>
                        
                </View>
                <View style={[styles.sectionBody, {marginBottom: 80}]}>
                
                      <View style={[styles.rowWrapper, {borderTopWidth:0} ]}>
                            <TouchableOpacity 
                                onPress={() => requestLogout()}>
                                <View style={styles.row}>
                                  <Ionicons 
                                    color={colors.secondaryColor2}
                                    name='power-sharp'
                                    style={styles.rowIcon}
                                    size={22}
                                    />
                                     <Text style={{fontFamily: '_semiBold', fontSize: 12, color:colors.secondaryColor2}}>Logout</Text>
                                        <View style={styles.rowSpacer} />
                                        {/* <Switch
                                         value={form[1]}
                                         onValueChange={value => setForm({...form, [1]: value})}
                                         /> */}
                                  {logoutLoading && <ActivityIndicator color='#aaa' size={20} />}
                                 </View>       
                            </TouchableOpacity>
                      </View>      
                </View>
                   
          </View>

      </ScrollView>
       


          {/* Modal beneficially here */}
            <Modal
              transparent={true}
              animationType="slide"
              useNativeDriver={true}
              visible={isModalVisible}
              nRequestClose={() => changeModalVisible(false)}
            >
              <SimpleModal
                changeModalVisible = {changeModalVisible}
                setData={setData}
              />
          </Modal>

          {/* Modal Loan here */}
          <Modal
              transparent={true}
              animationType="slideInBig"
              useNativeDriver={true}
              visible={isLoanModalVisible}
              nRequestClose={() => loanModalVisible(false)}
            >
              <LoanModal
                loanModalVisible = {loanModalVisible}
                setData={setData}
              />
          </Modal>

        </View>
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: '#F7F7F7',
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  circleIconLeft1: {
    borderColor: colors.secondaryColor1,
    alignItems: "center",
    justifyContent: "center",
  },
  textPopup:{
    marginTop: 10,
    fontWeight: 'bold'
  },
  modal:{
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F2688B",
    padding: 5,
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
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  headerNav:{
    flexDirection:'row',
    alignItems:'center',
    },
  headerAction:{
    width:40,
    height:40,
    marginLeft:10,
    alignItems:'flex-start',
    justifyContent:'center',
    
    },
  headerTitle:{
    fontSize:18,
    fontWeight:'600',
    color:'#000',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: '_regular',
    color: '#929292',
  },
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontFamily: '_bold',
    color: '#090909',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontFamily: '_regular',
    color: '#848484',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryColor1,
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 24,
    height: 50,
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 14,
    fontFamily: '_semiBold',
    color: '#777',
  },
  rowValue: {
    fontSize: 17,
    color: '#616161',
    marginRight: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },

});

export default ProfileScreen;
