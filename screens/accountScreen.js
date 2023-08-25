import React, {useContext, useState, useCallback, useMemo, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '../components/UserContext';
import { Ionicons, Entypo, SimpleLineIcons, FontAwesome, FontAwesome5} from '@expo/vector-icons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NumberValueFormat } from '../components/FormatValue';
import { gs, colors } from '../styles'
import { SafeAreaView } from 'react-native-safe-area-context';
import client from '../api/client';



const AccountScreen = ({navigation}) => {

  const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails] = useContext(UserContext);
  const [recentTranData, setRecentTranData] = useState([]);
  const [recentLoading, setRecentLoading] = useState(false);


  const setData = async() =>{
    try{
      setRecentLoading(true);
      //const recentTransaction = await client.get(`/api/recent_transactions/${myDetails._id}`)
      const recentTransaction = await client.get('/api/all_transaction/'+myDetails._id)
      
      setRecentTranData(recentTransaction.data)
      console.log("User Transaction Home ", recentTranData);
      
     }catch (e){
      console.log(e);
    }
    finally {
      setRecentLoading(false);
      }
  };

  // get user information from local storage here
useEffect(() => {
  setData()

  setTimeout(async() =>{
   }, 2000)
  
}, []);

// flat list data here
const recentTranDataInfo = ({item}) =>(
    <TouchableOpacity style={styles.recentTransaction}>
                                {/* icon or symbol */}
                                  
                              <View style={{flexDirection:'row', alignItems:'center'}}>
                                  {/* text */}
                                    <View style={{flexDirection:'column',
                                      justifyContent:'flex-start', marginHorizontal:15}}>
                                    
                                        <View style={{flexDirection:'row',justifyContent:'space-between', marginTop: 8}}>
                                          
                                          <Text style={{fontFamily:'_semiBold', color:'#aaa', fontSize:14, marginTop: 5}}>Status: {item.transac_nature}</Text>
                                          <Text style={{fontFamily:'_semiBold', fontSize:15, color:"#000", marginTop: 5}}>
                                          {item.transac_nature =='Debit'? '-' : '+'}<NumberValueFormat value={item.amount} />
                                            </Text>
                                          
                                        </View>
                                    
                                      {/* <Text style={{flex: 1, flexWrap: 'wrap', fontFamily:'_semiBold', fontSize:13, marginBottom: 5}}>you look wonderful and beautiful! Let chat more on whatsapp +44 7389 646157 and get to know each other better for a date outing.
    Hope to hear from you</Text> */}
    <Text style={{fontFamily:'_regular', fontSize:13, marginBottom: 5, textAlign:'justify', flexShrink: 1}}>you look wonderful and beautiful! Let chat more on whatsapp +44 7389 646157 and get to know each other better for a date outing.
    Hope to hear from you</Text>
                                        <View style={{flexDirection:'row',
                                          justifyContent:'space-between', marginBottom: 5}}>
                                          
                                          <Text style={{fontFamily:'_semiBold', fontSize:12, color:"#aaa"}}>Post Date: {moment(item.createdOn).format('DD/mm/YYYY')}</Text>
                                          
                                        
                                        <Text style={{fontFamily:'_semiBold', fontSize:12, color:"#aaa"}}>Record Date: {moment(item.createdOn).format('DD/mm/YYYY')}</Text>
                                          
                                        </View>
                                      
                                    </View>
                                  </View>
                                  
                                  
    </TouchableOpacity>
)
  
const myListEmpty = () => {
  return (
    <View style={{justifyContent:'center', alignItems:'center'}}>
    <Text style={{fontFamily:'_semiBold', fontSize:12, color:"#aaa", flexShrink: 1}}> No record at the moment</Text>
    </View>
  );
};

  return (
    
      <SafeAreaView style={{flex: 1, backgroundColor: "#F7F7F7"}}>
            <StatusBar barStyle='light-content' translucent={true} backgroundColor={colors.secondaryColor2} />

            {/* header of the screen */}
            <LinearGradient colors={[colors.secondaryColor2, colors.secondaryColor2]} start={[0,0]} end={[1,1]}
            style={{ elevation: 30, shadowColor: '#930D2F'}}>
            <View style={[gs.rowBetween, {marginTop: 10, marginHorizontal: 10}]}>
                <TouchableOpacity style = {styles.circleIconLeft}
                  onPress={() =>navigation.goBack()}>
                  <Ionicons name="arrow-back" color={colors.text} size={20}
                  />
                </TouchableOpacity>
                
              <TouchableOpacity style = {styles.circleIconLeft1} >
                  <Text style={{fontSize: 18, fontFamily:"_semiBold", color:'#fff'}}>Account Statements</Text>
                </TouchableOpacity>
                <View style={styles.nameView}>
              </View>

                {/* <Text style = {styles.text}>{new Date().toString().slice(0,11)}</Text> */}
              
             </View>
            </LinearGradient>

            {/* This show a dash round line */}
                <View style={styles.placeholder}>
                  
                  <View style={styles.placeholderInset}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        {recentLoading ? <ActivityIndicator size='large' color={colors.secondaryColor1} /> : ''}
                        
                            { recentLoading ? '': 
                            <View>
                              {recentTranData.length ? '': <>
                              <Text style={{fontFamily:'_regular', fontSize:14, color:"#aaa", flexShrink: 1}}>
                            No record at the moment Please
                            </Text>
                                  <View style={{justifyContent:'center', alignItems:'center'}}>
                                    <Ionicons name="file-tray-outline" size={30} color="#aaa" marginLeft={8}/>
                                  </View>
                              </>
                              }
                            </View>
                            }
                        </View>

                    <View style={{marginTop: 10, marginBottom: 60}}>
                    {!recentLoading && recentTranData.length > 0 ? 
                    <FlatList
                     keyExtractor = {item => item._id}  
                     data={recentTranData}
                     renderItem = {recentTranDataInfo} 
                     />
                     : ''}
                      
                      {/* {recentLoading ? '' :
                     <FlatList
                        keyExtractor = {item => item._id}  
                        data={recentTranData}
                        renderItem = {recentTranDataInfo} 
                        ListEmptyComponent={myListEmpty}
                        // ListHeaderComponent={() => (
                        //   <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold',textDecorationLine: 'underline' }}>
                        //     List of Persons
                        //   </Text>
                        // )}
                      />
                      } */}
                      
                      
                    </View>
                          
                   </View>
                </View> 
      
      </SafeAreaView>
     

     
  );
}

const styles = StyleSheet.create({
    constrainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc',
    },
    nameView:{
      flexDirection: "column",
      marginVertical: 10,
      marginHorizontal: 10,
  },
  nameTitle:{
    fontSize: 20,
    fontFamily: '_regular',
    color: "#fff",
    textAlign: "justify",
},
circleIconLeft:{
  borderRadius: 100, 
  overflow: 'hidden', 
  borderColor: '#B8950A', 
  width: 35, 
  height: 35, 
  marginVertical: 10,
  backgroundColor: '#B8950A',
  alignItems: "center",
  justifyContent: "center",
},
circleIconLeft1:{
  borderColor: colors.secondaryColor1, 
  alignItems: "center",
  justifyContent: "center",
},
balanceRow:{
  flexDirection: "column",
  marginVertical: 10,
  marginHorizontal: 10,
  justifyContent: "center",
  alignItems:"center"
  
},
balanceTitle:{
  fontSize: 30,
  fontWeight: "700",
  color: "#E1E1E1",
  justifyContent:"flex-end",
  textAlign: "center",
},
balanceSubTitle:{
  fontSize: 15,
  fontWeight: "bold",
  color: "#000",
  textAlign: "center",
  opacity: 0.5
},
balanceIcon:{
  borderRadius: 5, 
  overflow: 'hidden', 
  borderColor: '#E0E0E0',
  borderWidth: 1.5,
  width: 60,
  height: 25,
  justifyContent: "center",
  alignItems: "center",
  opacity: 0.5
 
},
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    recentTransaction:{
      flexDirection:'row',
      borderWidth:1, 
      borderColor:'#ddd',
      borderRadius:15, 
      justifyContent:'space-between',
      marginHorizontal: 10,
      backgroundColor: "#fff",
      paddingRight:10, 
      marginBottom:10,
      height: "auto",
    },
    placeholder:{
      flex: 1,
      height: 500,
      padding: 20,
    },
    placeholderInset:{
      borderWidth: 4,
      borderColor: colors.secondaryColor2,
      borderStyle: 'dashed',
      borderRadius: 9,
      flex: 1
    },
})

export default AccountScreen;
