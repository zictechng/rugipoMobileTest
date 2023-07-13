import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useCustomFonts } from './useCustomFonts';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { StyleSheet, Text, View } from 'react-native';

//import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { UserContext } from './components/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/loginScreen';
import SignUpScreen from './screens/signUpScreen';
import BottomTab from './navigation/bottomTabs';
import GeneralRootScreen from './navigation/generalRootScreen';
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
    // <View style={styles.container}>
    //   <Text style={{ fontFamily: '_bold', fontSize: 30, }}>Rugipo Finance Mobile Application System!</Text>
    //   <Text style={{ fontFamily: '_regular', fontSize: 20, }}>This application is for user to be able to access their account on the go without needing to go to the office</Text>
    //   <Text style={{ fontFamily: '_italic', fontSize: 15 }}>We will continue to improve on the application</Text>
    //   <Text style={{ fontFamily: '_regular', fontSize: 21 }}>Roboto black will continue to improve on the application</Text>
    //   <StatusBar style="auto" />
    // </View>
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
