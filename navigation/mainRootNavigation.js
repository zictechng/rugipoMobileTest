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
import PasswordResetSCreen from '../screens/passwordResetScreen';
import TransferPinResetScreen from '../screens/transferPinResetScreen';
import LocalTransferScreen from '../screens/localTransferScreen';
import ConfirmLocalTransferScreen from '../screens/confirmLocalTranScreen';
import TransferSuccessful from '../screens/transferSuccessfulScreen';
import WireTransferScreen from '../screens/wireTransferScreen';
import ConfirmWireScreen from '../screens/confirmWireScreen';
import CotCodeScreen from '../screens/cotCodeScreen';
import TaxCodeScreen from '../screens/taxCodeScreen';
import ImfCodeScreen from '../screens/imfCodeScreen';
import DetailsPageScreen from '../screens/detailsPageScreen';
import MessageScreen from '../screens/messageScreen';

// import other screens/page here

const Stack = createStackNavigator();

const MainRootNavigation = ({navigation}) =>{

    const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails] = useContext(UserContext);

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
                  name='BottomTab'
                  screenOptions={{ presentation: 'modal',
                  horizontalAnimation
                  }}>
                  {() => <BottomTab />}
                  </Stack.Screen>

                  <Stack.Screen 
                  name='contact'
                  component={ContactScreen}
                  >
                  </Stack.Screen>
                 
                  <Stack.Screen 
                  name='ProfileDetails'
                  options={horizontalAnimation}
                  component={ProfileDetailsScreen}
                  >
                  </Stack.Screen>

                  <Stack.Screen 
                  name='Referral'
                  options={horizontalAnimation}
                  component={ReferralScreen}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='Identification'
                  options={horizontalAnimation}
                  component={IdentificationScreen}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='ReportIssues'
                  component={ReportScreen}
                  options={horizontalAnimation}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='contact-us'
                  options={horizontalAnimation}
                  component={ContactUsScreen}>
                  </Stack.Screen>
                  
                  <Stack.Screen 
                  name='reset-password'
                  options={horizontalAnimation}
                  component={PasswordResetSCreen}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='reset-pin'
                  options={horizontalAnimation}
                  component={TransferPinResetScreen}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='localTransfer'
                  options={horizontalAnimation}
                  component={LocalTransferScreen}>
                  </Stack.Screen>
                  
                  <Stack.Screen 
                  name='confirmTransfer'
                  options={horizontalAnimation}
                  component={ConfirmLocalTransferScreen}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='transferSuccessful'
                  options={{
                    headerShown: false,
                    presentation: 'slide',
                    }}
                  component={TransferSuccessful}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='wireTransfer'
                  options={horizontalAnimation}
                  component={WireTransferScreen}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='confirmWireTransfer'
                  options={horizontalAnimation}
                  component={ConfirmWireScreen}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='cotCode'
                  options={horizontalAnimation}
                  component={CotCodeScreen}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='taxCode'
                  options={horizontalAnimation}
                  component={TaxCodeScreen}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='imfCode'
                  options={horizontalAnimation}
                  component={ImfCodeScreen}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='detailsPage'
                  options={horizontalAnimation}
                  component={DetailsPageScreen}>
                  </Stack.Screen>

                  <Stack.Screen 
                  name='message'
                  options={{
                    headerShown: false,
                    presentation: 'slide',
                    }}
                  component={MessageScreen}>
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