import React from 'react';
import {StyleSheet, View, Text } from 'react-native';

const HistoryScreen = () => {



  
const recentTranDataInfo = ({item}) =>{
  <Text>{item.sender_name}</Text>
}
  return (
    <View>
      <Text>History Screen</Text>
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

export default HistoryScreen;
