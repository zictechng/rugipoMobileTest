import React from 'react';
import {StyleSheet, View, Text } from 'react-native';

const ContactScreen = ({navigation}) => {
  return (
    <View>
      <Text>Contact Screen</Text>
      <Text onPress={() => navigation.navigate('Home')} style={{fontSize: 20,
        fontFamily: '_semiBold',}}>Go Home Page</Text>

      <Text style={{fontSize: 30,
        fontFamily: '_semiBold',}}>Logout</Text>
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

export default ContactScreen;
