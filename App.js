import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useCustomFonts } from './useCustomFonts';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { StyleSheet, Text, View } from 'react-native';

//import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { UserContext } from './components/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import MainRootNavigation from './navigation/mainRootNavigation';


export default function App() {

  // get the font library here

  const fontsLoaded = useCustomFonts();

  const [isLoading, setIsLoading] = useState(true);
  const initialLoginState = {
    userName: null,
    userToken: null,
  }

  const [userLoggedToken, setUserLoggedToken] = useState(null);
  const [userLogToken, setUserLogToken] = useState(null);
  const [appLoading, setAppLoading] = useState(false);

  // get user information from local storage here
  _getUserLocalInfo = async () => {
    try {
      const UserInfo = await AsyncStorage.getItem('USER_LOCAL_INFO');
      if (UserInfo !== null) {
        setUserData(UserInfo);
        //console.log("Local User Info from App ", userData);
      }
    } catch (error) {
      // Error retrieving data
      //console.log("Local error here ", error.message);
    }
  }
  
  useEffect(() => {
    setIsLoading(false);
    _getUserLocalInfo();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (

    <AlertNotificationRoot>

      <UserContext.Provider value={[userLoggedToken, setUserLoggedToken, appLoading, setAppLoading]}>
        <NavigationContainer>
              
              <MainRootNavigation />
              
          </NavigationContainer>

          {/* <NavigationContainer>

                   <BottomTab />
                  
                  <GeneralRootScreen />
                 
          </NavigationContainer> */}

      </UserContext.Provider>

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
