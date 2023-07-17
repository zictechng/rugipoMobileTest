import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { UserContext } from '../components/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ContactScreen = ({navigation}) => {

  const [loginState, setLoginState, isLoading, setIsLoading] = useContext(UserContext);

  const logout =() =>{
    AsyncStorage.removeItem('USER_TOKEN')
  .then(() => {
    console.log('AsyncStorage cleared successfully.');
    setLoginState(null)
  })
  .catch((error) => {
    console.log('Failed to clear AsyncStorage:', error);
  });
  }
  return (
    <View>
      <Text>Contact Screen</Text>
      <Text onPress={() => navigation.navigate('Home')} style={{fontSize: 20,
        fontFamily: '_semiBold',}}>Go Home Page</Text>

      <Text style={{fontSize: 30,
        fontFamily: '_semiBold',}} onPress={() => logout()}>Logout</Text>
     </View>
  );
}

const styles = StyleSheet.create({
    constrainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc',
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
})

export default ContactScreen;
