import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

// screens import goes here....
import LoginScreen from '../screens/loginScreen';
import SignUpScreen from '../screens/signUpScreen';
import VerifyAccount from '../screens/verifyAccount';

const GeneralStack = createStackNavigator();

const GeneralRootScreen = ({navigation}) =>{

    return (
        <GeneralStack.Navigator headerMode='none'>
        
        <GeneralStack.Screen name="Login" component={LoginScreen}/>
        <GeneralStack.Screen name="Register" component={SignUpScreen}/>
        <GeneralStack.Screen name="Verify" component={VerifyAccount}/>
      </GeneralStack.Navigator>
    )
}

export default GeneralRootScreen;