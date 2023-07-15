import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useCustomFonts } from './useCustomFonts';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { StyleSheet, Text, View } from 'react-native';

import UserProvider from './components/UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import MainRootNavigation from './navigation/mainRootNavigation';


export default function App() {

  const fontsLoaded = useCustomFonts();

  const [userData, setUserData]= useState({});

  // get user information from local storage here
  _getUserLocalInfo = async () => {
    try {
      const UserInfo = await AsyncStorage.getItem('USER_LOCAL_INFO');
      if (UserInfo !== null) {
        setUserData(UserInfo);
      }
    } catch (error) {
      // Error retrieving data
      console.log("Local error here ", error.message);
    }
  }
  
  useEffect(() => {
    _getUserLocalInfo();
  }, []);

  console.log("Local User Info from App ", userData);

  if (!fontsLoaded) {
    return null;
  }

  return (

    <AlertNotificationRoot>

      <UserProvider>
        <NavigationContainer>
              
              <MainRootNavigation />
              
          </NavigationContainer>

        </UserProvider>

    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
