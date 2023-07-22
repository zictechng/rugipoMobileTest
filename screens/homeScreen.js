import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Text,TouchableOpacity } from 'react-native';




const HomeScreen = () => {

  return (
    // <View style={{flex:1}}>
    //   <Text style={{ fontFamily: '_bold', }}>Home Screen</Text>

    //   <Text style={{ fontFamily: '_bold', }}></Text>
      <View style={styles.container}>
      {/* Your other content goes here */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Click Me</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  // constrainer: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#8fcbbc',
  // },
  // footer: {
  //   flex: 2,
  //   backgroundColor: '#fff',
  //   borderTopLeftRadius: 30,
  //   borderTopRightRadius: 30,
  //   paddingHorizontal: 20,
  //   paddingVertical: 30
  // },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 120,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default HomeScreen;
