import React, {useContext, useEffect, useState} from 'react';
import { SafeAreaView, StatusBar, ActivityIndicator, StyleSheet, View, Text } from 'react-native';

const CustomSplash = () => {
  return (
    <SafeAreaView style={styles.constrainer}>

          <StatusBar style="light" translucent={true} backgroundColor='transparent' />
              <View>
                  <Text></Text>
                  <ActivityIndicator size='large' color="#fff" />
             </View>
    
    </SafeAreaView>
    
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
