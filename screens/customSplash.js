import React, {useContext, useEffect, useState} from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

const CustomSplash = () => {
  return (
    <View style={styles.constrainer}>
      <Text></Text>
      <ActivityIndicator size='large' color="#fff" />
     </View>
  );
}

const styles = StyleSheet.create({
    constrainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A78808',
    },
})

export default CustomSplash;
