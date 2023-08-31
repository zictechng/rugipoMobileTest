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

const ProfileDetailsScreen = () => {
  const navigation = useNavigation();


  const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails, myMethod ] = useContext(UserContext);

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
        style={{ elevation: 30, shadowColor: '#930D2F'}}>
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
              Profile
            </Text>
          </TouchableOpacity>
          <View style={styles.nameView}></View>

          {/* <Text style = {styles.text}>{new Date().toString().slice(0,11)}</Text> */}
        </View>
      </LinearGradient>
      
       
      <ScrollView contentContainerStyle={styles.container}>
       
        <View style={styles.profile}>
          <Image
            alt=""
            source={{
              uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
            }}
            style={styles.profileAvatar}
          />

          <Text style={styles.profileName}>John Doe</Text>

          <Text style={styles.profileEmail}>tag ID: </Text> 
        </View>

        <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>Personal information</Text>
                </View>

                <View style={[styles.profileData, {backgroundColor:'#fffaff'}]}>
                    <View style={[styles.rowWrapperProfile, {borderTopWidth:0, } ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 6}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Account Full Name</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Profile</Text>
                                    <View style={[styles.rowSpacer]} />
                            </View>       
                            </View>
                      </View>
                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Gender</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Phone Number</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Email</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Date of Birth</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>State</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>City</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Country</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Contact Address</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>Account information</Text>
                </View>

                <View style={styles.profileData}>
                    <View style={[styles.rowWrapper, {borderTopWidth:0} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 6}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Account Number</Text>
                                     <Text style={[styles.rowLabel, {color:'#fff'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>
                      <View style={[styles.rowWrapper, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Account Type</Text>
                                     <Text style={[styles.rowLabel, {color:'#fff'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapper, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Account Status</Text>
                                     <Text style={[styles.rowLabel, {color:'#fff'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapper, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Account Username</Text>
                                     <Text style={[styles.rowLabel, {color:'#fff'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapper, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Account PIN</Text>
                                     <Text style={[styles.rowLabel, {color:'#fff'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapper, {borderTopWidth:1, marginTop: 10, marginBottom: 6} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Currency Type</Text>
                                     <Text style={[styles.rowLabel, {color:'#fff'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
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
    color: '#777',
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
    fontSize: 16,
    fontFamily: '_regular',
    color: '#848484',
  },
  profileData:{
    borderWidth:1, 
    borderColor:'#ddd',
    borderRadius:15, 
    justifyContent:'space-between',
    marginHorizontal: 10,
    backgroundColor: colors.secondaryColor2,
    paddingRight:10, 
    marginBottom:10,
    height: "auto",
  },
  row: {
    flexDirection: 'column',
    paddingRight: 24,
    height: "auto",
   
  },
  rowWrapper: {
    paddingLeft: 24,
    //backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#aaa'
  },
  rowWrapperProfile: {
    paddingLeft: 24,
    //backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#dededc'
  },
  
  rowLabel: {
    fontSize: 14,
    fontFamily: '_semiBold',
    color: '#777',
    textAlign: 'justify'
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

export default ProfileDetailsScreen;
