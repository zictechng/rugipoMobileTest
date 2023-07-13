import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../components/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './bottomTabs';
import GeneralRootScreen from './generalRootScreen';
import ContactScreen from '../screens/contact';




// import other screens/page here

const Stack = createStackNavigator();

const MainRootNavigation = ({navigation}) =>{

    const [userLoggedToken, setUserLoggedToken] = useContext(UserContext);

    const [userLogToken, setUserLogToken] = useState(null);
    const [appLoading, setAppLoading] = useState(false);

    _getUserTokenInfo = async () => {
        try {
          const userToken = await AsyncStorage.getItem('USER_TOKEN');
          if (userToken !== null) {
            setUserLogToken(userToken);
            console.log("User Token in Main Navigation ", userToken);
          }
        } catch (error) {
          // Error retrieving data
          console.log("Local error here ", error.message);
        }
      }
    
      useEffect(() => {
        //setIsLoading(false);
        _getUserTokenInfo()
      }, []);

    return (
        <Stack.Navigator headerMode='none'>
      
            {userLoggedToken == null || userLogToken == null ? (
                   <Stack.Screen 
                   name="GeneralRootScreen" 
                   headerMode='none'>

                    {() => <GeneralRootScreen />}
                    </Stack.Screen>
                  ) : 
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
                  
                } 
      </Stack.Navigator>
    )
}


export default MainRootNavigation;