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

const ConfirmWireScreen = () => {
  const navigation = useNavigation();


  const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails, myMethod ] = useContext(UserContext);

    const [isloginBtn, setIsLoginBtn] = useState(false);
    const [logBtnDisabled, setLogBtnDisabled] = useState(false);

  return (
       <View style={{flex: 1}}>
        
      <View style={{ flex: 1, backgroundColor: colors.secondaryColor2}}>
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
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" color={colors.text} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleIconLeft1}>
            <Text
              style={{ fontSize: 22, fontFamily: "_semiBold", color: "#fff" }}
            >
              Confirm Wire Transfer
            </Text>
          </TouchableOpacity>
          <View style={styles.nameView}></View>

          {/* <Text style = {styles.text}>{new Date().toString().slice(0,11)}</Text> */}
        </View>
      </LinearGradient>
      
       
      <ScrollView contentContainerStyle={styles.container}>
       
        <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>Confirm your transfer transaction details</Text>
                </View>

                <View style={[styles.profileData, {backgroundColor:'#fffaff'}]}>
                    <View style={[styles.rowWrapperProfile, {borderTopWidth:0, } ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 6}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Transfer Type</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Profile</Text>
                                    <View style={[styles.rowSpacer]} />
                            </View>       
                            </View>
                      </View>
                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Recipient Bank</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Source Account</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Recipient Account Number</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Recipient Name</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Bank Swift Code / Routing Number</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Transfer Amount</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>

                      <View style={[styles.rowWrapperProfile, {borderTopWidth:1, marginTop: 10, marginBottom: 10} ]}>
                            <View>
                                <View style={[styles.row, {marginTop: 10}]}>
                                    <Text style={[styles.rowLabel, {color:'#cccac6'}]}>Transaction Charges</Text>
                                     <Text style={[styles.rowLabel, {color:'#777'}]}>Profile</Text>
                                    <View style={styles.rowSpacer} />
                            </View>       
                            </View>
                      </View>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionHeaderText, {color: colors.secondaryColor2}]}>* Transfer limit is always maintain by the bank every 24 hours</Text>
                </View>

                <View style={styles.button}>
                        <TouchableOpacity  style={[styles.signIn, logBtnDisabled? styles.signInDisable: '']}
                            onPress={() => navigation.navigate('')}
                            disabled={logBtnDisabled}> 
                        <LinearGradient
                        colors={[colors.secondaryColor1, colors.secondaryColor1]}
                        style={styles.signIn}>
                            <Text style={[styles.textSign,{
                                color:'#fff'
                            }]}>{isloginBtn ? '' : "Proceed"} </Text>
                            {isloginBtn && <ActivityIndicator color='#fff' size={25}/>}
                        </LinearGradient>
                        </TouchableOpacity>   
                </View>

                <View style={[styles.button, {marginTop: 10}]}>
                        <TouchableOpacity  style={[styles.signIn,{backgroundColor:'#aaa'}]}
                            onPress={() => navigation.navigate('cotCode')}> 
                        <Text style={[styles.textSign,{
                                color:'#fff'
                            }]}> Cancel </Text>
                        </TouchableOpacity>   
                </View>

          </View>

      </ScrollView>
       </View>
    </View>
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
  button: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 20
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
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
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

export default ConfirmWireScreen;
