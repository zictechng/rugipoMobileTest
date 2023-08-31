import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../components/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDataInLocalStorage } from '../components/localData';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './bottomTabs';
import GeneralRootScreen from './generalRootScreen';
import ContactScreen from '../screens/contact';
import LoginScreen from '../screens/loginScreen';
import ProfileDetailsScreen from '../screens/profileDetails';
import ReferralScreen from '../screens/referralScreen';
import IdentificationScreen from '../screens/identificationScreen';
import ReportScreen from '../screens/reportScreen';
import ContactUsScreen from '../screens/contactScreen';

// import other screens/page here

const Stack = createStackNavigator();

const MainRootNavigation = ({navigation}) =>{

    const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails] = useContext(UserContext);

    const [userLogToken, setUserLogToken] = useState(null);
    const [appLoading, setAppLoading] = useState(true);
    
    const [userData, setUserData]= useState({});
    const [userInfoData, setUserInfoData]= useState(null);

     // This will make scree slide from left to right / right to slide
     const horizontalAnimation = {
      gestureDirection: 'horizontal',
      cardStyleInterpolator: ({ current, layouts }) => {
        return {
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        };
      },
    };
    return (
        <Stack.Navigator headerMode='none' >

                {loginState === undefined || loginState === null? (
                   <Stack.Screen 
                   name="GeneralRootScreen" 
                   headerMode='none'>
                   {() => <GeneralRootScreen />}
                    </Stack.Screen>
                  ) : (
                  <>
                  <Stack.Screen 
                  screenOptions={{ presentation: 'modal' }}
                  name='BottomTab'>
                    {() => <BottomTab />}
                  </Stack.Screen>

                  <Stack.Screen 
                  name='contact'
                  component={ContactScreen}
                  >
                  </Stack.Screen>
                 
                  <Stack.Screen 
                  name='ProfileDetails'
                  component={ProfileDetailsScreen}
                  >
                  </Stack.Screen>

                  <Stack.Screen 
                  name='Referral'
                  component={ReferralScreen}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='Identification'
                  component={IdentificationScreen}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='ReportIssues'
                  component={ReportScreen}
                  options={horizontalAnimation}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='contact-us'
                  component={ContactUsScreen}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='Login'
                  component={LoginScreen}
                  >
                  </Stack.Screen>
                  </>
                  )
                } 
      </Stack.Navigator>
    )
}


export default MainRootNavigation;