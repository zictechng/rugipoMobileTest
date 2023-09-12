import React, {useContext, useState, useCallback, useMemo, useRef, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View, Text, Modal, ActivityIndicator, Image, Platform, TouchableOpacity} from 'react-native';
import { gs, colors } from '../styles';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native';

const TransferSuccessful = () => {
    const navigation = useNavigation();

    const [showModal, setshowModal] = useState(false);

return (
    <SafeAreaView style={[styles.modalBackground, {backgroundColor: colors.secondaryColor2}]}>
        <StatusBar backgroundColor={colors.secondaryColor2} barStyle="light-content" />

        {/* <View style={[gs.rowBetween, {marginTop: Platform.OS === "ios" ? 10 : 26, marginHorizontal: 10}]}>
                  
                    <View style={styles.nameView}>
                    <Text style={styles.nameTitle}><Text style={{fontSize: 23, fontFamily:"_semiBold"}}></Text></Text>
                    </View>
                    <Image
                    alt="" source={{
                    uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                    }} style={styles.profileAvatar} />
                    <TouchableOpacity style = {styles.circleIconLeft}
                    onPress={() =>{ Alert.alert('Notification Message')}}>
                    <Ionicons name="notifications-outline" color={colors.text} size={20}
                    />
                    </TouchableOpacity>
                
        </View> */}

                <View style={styles.logo}>
                    <Animatable.View animation="zoomIn" direction="alternate" duration={2000}>
                        <Image alt="" source={require('../assets/check.png')} style={[styles.profileAvatar, {tintColor: '#8cc29a'}]}/>
                    </Animatable.View>
                    <View style={styles.successTitle}>
                        <Text style={{fontSize:18, alignItems:'center', justifyContent:'center', fontFamily: '_semiBold', color:'#fff'}}>Transfer Successful.</Text>
                    </View>
                    <View style={styles.successMessage}>
                        <Text style={{fontSize:14, alignItems:'center', justifyContent:'center', fontFamily: '_regular', color:'#fff'}}>You have successfully transfer the fund to your recipient!
                    {'\n'} Thank you for choosing Rugipo Finance</Text>
                    </View>

                </View>
                    <View style={[styles.closeBtn]}>
                        {/* <TouchableOpacity  style={[styles.signIn,{backgroundColor:'transparent', borderColor:'#fff',}]}
                            onPress={() => navigation.replace('BottomTab')}> 
                            <Text style={styles.textSign}> Okay </Text>
                        </TouchableOpacity>    */}

                        <TouchableOpacity
                            onPress={() => navigation.navigate('BottomTab',
                                  {
                                    gestureEnabled: true,
                                    withAnimation: true,
                                    animationType: 'slide',
                                    headerShown: false,
                                  })
                              }
                            style={[styles.signIn2, {
                                borderColor: '#e9f2eb',
                                borderWidth: 1,
                                marginTop: 20
                            }]}
                            >
                                <Text style={[styles.textSign, {
                                    
                                }]}>Okay</Text>
                            </TouchableOpacity>
                    </View>

    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
    modalBackground:{
        flex:1,
        backgroundColor: '#000',
    },
   
    closeBtn: {
        justifyContent: 'flex-end',
        bottom: 20,
        marginHorizontal: 20,
     },
    circleIconLeft:{
        borderRadius: 100, 
        overflow: 'hidden', 
        borderColor: '#B8950A', 
        width: 35, 
        height: 35, 
        marginVertical: 10,
        backgroundColor: '#B8950A',
        alignItems: "center",
        justifyContent: "center",
     },
     circleText:{
        fontSize: 18,
        fontWeight: "900",
        color: "#F04B73",
        
     },
    profileAvatar: {
        width: 80,
        height: 80,
        borderRadius: 9999,
      },
    textPopup:{
        marginTop: 10,
        fontWeight: 'bold',
        color: '#ff0000',
      },
      logo:{
        flex: 1,
        marginTop: -60,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',

      },
      textSign: {
        fontSize: 18,
        fontFamily: '_semiBold',
        color: 'white',
    },
      successTitle:{
        marginHorizontal: 20,
        marginTop: 20,
      },
      successMessage:{
        marginHorizontal: 20,
        textAlign: 'justify',
        marginTop: 20,
      },
      signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        borderRightWidth: 0.2,
        borderBottomWidth: 0.2,
        borderLeftWidth: 0.2,
        borderStartWidth: 0.2,
        borderTopWidth: 0.2,
        
    },
    signIn2: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      flexDirection: 'row',
  },
});


export default TransferSuccessful;