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
  StatusBar
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { UserContext } from "../components/UserContext";
import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Ionicons,
  Entypo,
  SimpleLineIcons,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import { gs, colors } from "../styles";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();


  const [loginState, setLoginState, isLoading, setIsLoading] = useContext(UserContext);

  const logout1 = async() =>{
    try {
    AsyncStorage.removeItem('USER_TOKEN')
    .then(() => {
    console.log('AsyncStorage cleared successfully.');
    //setLoginState()
      })
    } catch (e) {
      console.log(e.message);
    }
  }

  const logout = async() =>{
    try {
        const res = await AsyncStorage.removeItem('USER_TOKEN');
        //const my_details = await AsyncStorage.getItem("USER_TOKEN");
        //const currentUser = JSON.parse(my_details);
        //await AsyncStorage.multiRemove(keys);
        if(res === undefined || res === null)
        {
          setLoginState(null);
          console.log('AsyncStorage cleared successfully.');
        }
        console.log("Out is ", res)
       } catch (error) {
        console.error('Error clearing app data.');
      }
  }

  return (
       <View style={{flex: 1}}>
        
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6', }}>
        <StatusBar
      style="light" translucent={true} backgroundColor='transparent'animated={true} />


         {/* header of the screen */}
      <LinearGradient
        colors={[colors.secondaryColor2, colors.secondaryColor2]}
        start={[0, 0]}
        end={[1, 1]}
        style={{ elevation: 30, shadowColor: '#930D2F'}}
      >
        <View style={[gs.rowBetween, { marginTop: 18, marginHorizontal: 10 }]}>
          <TouchableOpacity
            style={styles.circleIconLeft}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" color={colors.text} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleIconLeft1}>
            <Text
              style={{ fontSize: 22, fontFamily: "_semiBold", color: "#fff" }}
            >
              Account
            </Text>
          </TouchableOpacity>
          <View style={styles.nameView}></View>

          {/* <Text style = {styles.text}>{new Date().toString().slice(0,11)}</Text> */}
        </View>
      </LinearGradient>
      
       
      <ScrollView contentContainerStyle={styles.container}>
       
        <View style={styles.header}>
          {/* <Text style={styles.title}>Settings</Text> */}

          <Text style={styles.subtitle}>
            more action about your account and its operations
          </Text>
        </View>

        <View style={styles.profile}>
          <Image
            alt=""
            source={{
              uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
            }}
            style={styles.profileAvatar}
          />

          <Text style={styles.profileName}>John Doe</Text>

          <Text style={styles.profileEmail}>john.doe@mail.com</Text>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Profile</Text>

              <FeatherIcon color="#fff" name="edit" size={16} />
            </View>
          </TouchableOpacity>
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
                                Alert.alert("You selected me")
                               // navigation.navigate(index)
                                  }}>
                                <View style={styles.row}>
                                  <Ionicons 
                                    color="#616161"
                                    name='person-outline'
                                    style={styles.rowIcon}
                                    size={22}
                                    />
                                     <Text style={styles.rowLabel}>Profile</Text>
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
                                Alert.alert("You selected me")
                               // navigation.navigate(index)
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
                                Alert.alert("You selected me")
                               // navigation.navigate(index)
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
                                onPress={() =>{
                                // navigation goes here
                                Alert.alert("You selected me")
                               // navigation.navigate(index)
                                  }}>
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
                                Alert.alert("You selected me")
                               // navigation.navigate(index)
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
                                onPress={() =>{
                                // navigation goes here
                                Alert.alert("You selected me")
                               // navigation.navigate(index)
                                  }}>
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
                                Alert.alert("You selected me")
                               // navigation.navigate(index)
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
                                Alert.alert("You selected me")
                               // navigation.navigate(index)
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
                                Alert.alert("You selected me")
                               // navigation.navigate(index)
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
                                Alert.alert("You selected me")
                               // navigation.navigate(index)
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
                                Alert.alert("You selected me")
                               // navigation.navigate(index)
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
                                onPress={() => logout()}>
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
                                 </View>       
                            </TouchableOpacity>
                      </View>      
                </View>
                   
          </View>

      </ScrollView>
       
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
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
    fontSize: 15,
    fontWeight: '500',
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
    borderRadius: 9999,
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
