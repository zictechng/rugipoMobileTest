import React, {useContext, useState, useCallback, useMemo, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '../components/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { gs, colors } from '../styles'
import { SafeAreaView } from 'react-native-safe-area-context';
import client from '../api/client';


const AccountScreen = ({navigation}) => {

  const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails] = useContext(UserContext);
  const [recentTranData, setRecentTranData] = useState([]);
  const [recentLoading, setRecentLoading] = useState(false);

  // get user information from local storage here
useEffect(() => {
  setTimeout(async() =>{
    // let recentTransaction;
    // recentTransaction = null;
    try{
      setRecentLoading(true);
      //const recentTransaction = await client.get(`/api/recent_transactions/${myDetails._id}`)
      const recentTransaction = await client.get('all_transactions')
      
      // if(recentTransaction.data.msg =='200'){
      //   setRecentTranData(recentTransaction)
      // }
      setRecentTranData(recentTransaction.data)
      console.log("User Transaction Account ", recentTranData.data);
      
     }catch (e){
      console.log(e);
    }
    finally {
      setRecentLoading(false);
      }
 
  }, 2000)
  
}, []);

const recentTranDataInfo = ({item}) =>{
  <Text>{item.data.sender_name}</Text>
}

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={colors.secondaryColor2} style="light" />
      <SafeAreaView />
      <Text style={{fontFamily: '_think', fontSize: 20}}> This is Account Screen</Text>

      <Text onPress={() => navigation.navigate('contact')} style={{fontFamily: '_semiBold', fontSize: 30}}>Go to contact Page</Text>
      <Text>{recentTranData.sender_name}</Text>
      
      <View style={{alignItems: 'center',justifyContent: 'center',}}> 
        <Text >{recentLoading ? <ActivityIndicator size='large' color={colors.secondaryColor1} /> : " "}</Text>
      
        <FlatList
            keyExtractor = {item => item._id}  
            data={recentTranData}
            renderItem = {item => (<Text>{item.recentTranData.sender_name}</Text>)} 
          />
      
      </View>

      <FlatList 
              data={recentTranData}
              renderItem={recentTranDataInfo}
            />
     
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
