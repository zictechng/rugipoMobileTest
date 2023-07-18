import React, {useContext, useEffect, useState} from 'react';
import { ActivityIndicator, View } from 'react-native';
import { UserContext } from '../components/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDataInLocalStorage } from '../components/localData';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './bottomTabs';
import GeneralRootScreen from './generalRootScreen';
import ContactScreen from '../screens/contact';
import VerifyAccount from '../screens/verifyAccount';




// import other screens/page here

const Stack = createStackNavigator();

const MainRootNavigation = ({navigation}) =>{

    
    const [loginState, setLoginState, isLoading, setIsLoading] = useContext(UserContext);

    const [userLogToken, setUserLogToken] = useState(null);
    const [appLoading, setAppLoading] = useState(true);
    
    const [userData, setUserData]= useState({});
    const [userInfoData, setUserInfoData]= useState(null);

   
    
     // get user information from local storage here

      useEffect(() => {
        (async()=>{
          const savedUser = await AsyncStorage.getItem("USER_LOCAL_INFO");
          const currentUser = JSON.parse(savedUser);
          setUserData(currentUser);
           //console.log('useEffect', currentUser)
      })();
      setUserInfoData(getDataInLocalStorage('USER_TOKEN'));  
      }, []);

      console.log("my login State MainVa ", loginState)

    return (
        <Stack.Navigator headerMode='none'>

        {/* {isLoading ? (
        <Stack.Screen
          name="CustomSplash"
          component={CustomSplash}
          options={{ headerShown: false }}
        />
      ) : !loginState && !isLoading ? (
        <Stack.Screen 
          name="GeneralRootScreen" 
          headerMode='none'>
          {() => <GeneralRootScreen />}
        </Stack.Screen>
      ) : (
        loginState &&
        !isLoading && (
          <>
            <Stack.Screen 
                  name='BottomTab'
                  headerMode='none'>
                    {() => <BottomTab />}
            </Stack.Screen>

            <Stack.Screen 
                  name='contact'
                  component={ContactScreen}
              >
            </Stack.Screen>

          </>
        )
      )}   */}
      
            {loginState == null || loginState == ''? (
                   <Stack.Screen 
                   name="GeneralRootScreen" 
                   headerMode='none'>
                   {() => <GeneralRootScreen />}
                    </Stack.Screen>
                  ) : (
                  <>
                  <Stack.Screen 
                  name='BottomTab'
                  headerMode='none'>
                    {() => <BottomTab />}
                  </Stack.Screen>

                  <Stack.Screen 
                  name='contact'
                  component={ContactScreen}
                  >
                  </Stack.Screen>
                  </>
                  )
                } 
      </Stack.Navigator>
    )
}


export default MainRootNavigation;