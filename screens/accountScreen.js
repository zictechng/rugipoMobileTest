import React from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { gs, colors } from '../styles'
import { SafeAreaView } from 'react-native-safe-area-context';

const AccountScreen = ({navigation}) => {
  
  return (
    <View>
      <StatusBar backgroundColor={colors.secondaryColor2} style="light" />
      <SafeAreaView />
      <Text style={{fontFamily: '_think', fontSize: 20}}> This is Account Screen</Text>

      <Text onPress={() => navigation.navigate('contact')} style={{fontFamily: '_bold', fontSize: 30}}>Go to contact Page</Text>
     </View>
  );
}

const styles = StyleSheet.create({
    constrainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc',
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
})

export default AccountScreen;
