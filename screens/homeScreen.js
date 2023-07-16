import React, {useContext, useEffect, useState} from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';




const HomeScreen = () => {

  return (
    <View>
      <Text style={{fontFamily: '_bold',}}>Home Screen</Text>

      <Text style={{fontFamily: '_bold',}}></Text>
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

export default HomeScreen;
