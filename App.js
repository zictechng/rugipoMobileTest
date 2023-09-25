import React, { useContext, useEffect, useState, useCallback } from "react";
import { useCustomFonts } from "./useCustomFonts";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { Alert, StyleSheet, Text, View } from "react-native";
import { LogBox } from "react-native";
import UserProvider from "./components/UserProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import MainRootNavigation from "./navigation/mainRootNavigation";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
//LogBox.ignoreAllLogs(); // this will suppress errors not to be showing to users in the app 


export default function App() {
  const { fontsLoaded } = useCustomFonts();

  const [userData, setUserData] = useState({});
  const [serverActive, setServerActive] = useState('');

  
  
  //"@react-navigation/bottom-tabs": "^5.11.15",
  // below is for v6
  //"@react-navigation/bottom-tabs": "^6.5.8",
//   screenOptions={{
//     showLabel: false,
//     headerShown: false,
//     "tabBarShowLabel": false,
//     "tabBarStyle": [
//         {
//             position: 'absolute',
//             bottom: 15,
//             left: 15,
//             right: 15,
//             elevation: 0,
//             backgroundColor: '#ffffff',
//             borderRadius: 15,
//             height: 70,
//             ...styles.shadow
//         },
//         null,
//     ],
//     //showIcon: true,
// }}>

  // get user information from local storage here

  // _getUserLocalInfo = async () => {
  //   try {
  //     const UserInfo = await AsyncStorage.getItem("USER_LOCAL_INFO");
  //     if (UserInfo !== null) {
  //       setUserData(UserInfo);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //     //console.log("Local error here ", error.message);
  //   }
  // };

  // useEffect(() => {
  //   _getUserLocalInfo();
  // }, []);

  //console.log("Local User Info from App ", userData);

  useEffect(() => {
    getServerActive();
  }, []);

  const getServerActive = async() =>{
    try{
      const userInfo = await client.get('/api/all_transactions')
      setServerActive(userInfo)
      //console.log(' My Info Data  ', userInfo.data.userData);
      }catch (e){
      console.log(e);
    }
  };

  if (fontsLoaded) {
    return null;
  }

  return (
    <AlertNotificationRoot>
      <UserProvider>
      <ActionSheetProvider>
        <NavigationContainer>
          <MainRootNavigation />
        </NavigationContainer>
      </ActionSheetProvider>
      </UserProvider>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
