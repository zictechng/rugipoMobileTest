import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

// screens import goes here....

import ContactScreen from '../screens/contact';

const AppStack = createStackNavigator();

const MainRootScreen = ({navigation}) =>{

    return (
        <AppStack.Navigator headerMode='none'>
      
        <AppStack.Screen name="contact" component={ContactScreen}/>
        
      </AppStack.Navigator>
    )
}

export default MainRootScreen;