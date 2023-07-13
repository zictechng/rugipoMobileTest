import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './bottomTabs';
import GeneralRootScreen from './generalRootScreen';
import { UserContext } from '../components/UserContext';
import ContactScreen from '../screens/contact';



// import other screens/page here

const AppStack = createStackNavigator();

const MainRootScreen = ({navigation}) =>{

    return (
        <AppStack.Navigator headerMode='none'>
      
        <AppStack.Screen name="contact" component={ContactScreen}/>
        
      </AppStack.Navigator>
    )
}

export default MainRootScreen;