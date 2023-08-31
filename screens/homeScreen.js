import React, {useContext, useState, useCallback, useMemo, useRef, useEffect} from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import {
    BarChart,
  } from "react-native-chart-kit";
  import { widthPercentageToDP as wp, 
    heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView, View, Text, StyleSheet, Image, Alert, Modal, ActivityIndicator,
  TextInput, TouchableOpacity, StatusBar, Dimensions, Pressable, ImageBackground, FlatList} from 'react-native';
import { UserContext } from '../components/UserContext';
import { Ionicons, Entypo, SimpleLineIcons, FontAwesome, FontAwesome5} from '@expo/vector-icons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import { gs, colors } from '../styles'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'

import RBSheet from 'react-native-raw-bottom-sheet'

import CircularProgress, { CircularProgressBase } from 'react-native-circular-progress-indicator';
import client from '../api/client';
import Loader from '../components/Loader';
import { NumericFormat } from 'react-number-format';
import { NumberValueFormat } from '../components/FormatValue';

const screenWidth = Dimensions.get("window").width;

const MyBarChart = () => {
    return (
      <>
        <BarChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [500, 1500, 2500, 3500, 4500, 5500],
              },
            ],
          }}
          width={Dimensions.get('window').width -40}
          height={220}
          yAxisLabel={'\u20A6'}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#A78808',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
           
          }}
          style={{
            marginHorizontal:10,
            borderRadius: 10,
          }}
        />
      </>
    );
  };

const HomeScreen = () => {
  const navigation = useNavigation();

  const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails] = useContext(UserContext);
  const [isModalVisible, setisModalVisible] = useState(false);

  const [chooseData, setchooseData] = useState();
  const [recentTranData, setRecentTranData] = useState([]);

  const [showModal, setshowModal] = useState(false);
  const [recentLoading, setRecentLoading] = useState(false);

  const [myID, setMyID] = useState({});

  const changeModalVisible = (bool) =>{
    setisModalVisible(bool);
  }

  useEffect(() => {
    (async()=>{
      const my_details = await AsyncStorage.getItem("USER_LOCAL_INFO");
      const currentUser = JSON.parse(my_details);
      setMyID(currentUser);
       //console.log('useEffect', currentUser)
  })(); 
  }, []);

  const setData = (data) =>{
    setchooseData(data);
  };

  const sheetLoan = useRef();
   // ref
   const sheetRef = useRef();
  
   let actionSheet = useRef();
   
  //  useEffect(() =>{
  //   setTimeout(async() =>{
  //     setIsLoading(false);
  //  }, 1000)
     
  // }, []);
  
  const getTransaction = async() =>{
    try{
      setRecentLoading(true);
      const recentTransaction = await client.get('/api/recent_transactions/'+myDetails._id)
      // if(recentTransaction.data.msg =='200'){
      //   setRecentTranData(recentTransaction)
      // }
      setRecentTranData(recentTransaction.data)
      }catch (e){
      console.log(e);
    }
    finally {
      setRecentLoading(false);
      }
  };
// get user information from local storage here
useEffect(() => {
  getTransaction()

  setTimeout(async() =>{
   
  }, 1000)
  
}, []);
const props = {
  activeStrokeWidth: 20,
  inActiveStrokeWidth: 25,
  inActiveStrokeOpacity: 0.1,
  activeStrokeSecondaryColor: '#C25AFF', // this act as gradient but not important
  
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f6f6', }}>
        <StatusBar
      style="light" translucent={true} backgroundColor='transparent'animated={true} />

                {/* header of the screen */}
            <LinearGradient colors={[colors.secondaryColor2, colors.secondaryColor2]} start={[0,0]} end={[1,1]}
            style={{ elevation: 30, shadowColor: '#930D2F'}}>
              

                <View style={[gs.rowBetween, {marginTop: 25, marginHorizontal: 10}]}>
                   {/* <View style = {styles.circleIconLeft}>
                        
                    </View> */}
                    {/* <View>
                        <Text style={[styles.titleSend, {color: "#BFB9B5"}]}>Rugipo Finance</Text>
                    </View> */}
                    <View style={styles.nameView}>
                    <Text style={styles.nameTitle}>Hi <Text style={{fontSize: 23, fontFamily:"_semiBold"}}>{myDetails.surname +','}</Text></Text>
                    </View>

                    {/* <Text style = {styles.text}>{new Date().toString().slice(0,11)}</Text> */}
                   
                    <TouchableOpacity style = {styles.circleIconLeft}
                    onPress={() =>{ Alert.alert('Notification Message')}}>
                     <Ionicons name="notifications-outline" color={colors.text} size={20}
                     />
                    </TouchableOpacity>
                   
                </View>

                {/* <View style={styles.nameView}>
                    <Text style={styles.nameTitle}>Hello <Text style={{fontSize: 23, fontWeight:"600"}}>Ken Developer,</Text> </Text>
                </View> */}
                {/* <View style={[styles.headerSendUp, {padding:13}]}>
                    <Text style={[styles.titleSend, {color: "#fff"}]}>Open an account</Text>
                    <Text style={[styles.subTitleSend, {color:"#333"}]}>To open an account, kindly fill the details below correctly and ensure to use valid email address and phone number.</Text>
                </View> */}

                
                <View style={styles.balanceRow}>
                    <Text style={styles.balanceTitle}><NumberValueFormat value={myDetails.amount} /> <View style={styles.balanceIcon}>
                    <FontAwesome name="line-chart" color={{color:"#00CC00"}} size={20} />
                     </View>
                     </Text>
                    <Text style={styles.balanceSubTitle}>Current Balance</Text>
                </View>
            </LinearGradient>

            {/* body of the screen */}
            <ScrollView style={{marginBottom: 50}}>
              
              
            <View style={styles.middlePage}>
                      {/* chat graph here */}
                      
                      <Text style={styles.chatHeader}>Transaction Overview</Text>
                      <MyBarChart />
                    </View>

                      {/* Quick Loan here */}
                      <TouchableOpacity style={[styles.middleSection, {marginTop: 10, overflow: 'hidden'}]}
                        onPress={() =>{
                          sheetLoan.current.open();
                        }}>
                          <Image style={styles.bgImage} source={require('../assets/bg11.png')}/> 
                          
                         
                            {/* icon or symbol */}
                            <View style={{flexDirection:'row', alignItems:'center'}}>

                              {/* Coin image */}
                              <View style={{borderRadius: 10, borderColor:colors.secondaryColor1, backgroundColor:colors.secondaryColor1, height: 55, width: 55, marginLeft: 5}}>
                              <FontAwesome5 name="hand-holding-usd"
                                 size={34} color="#fff" marginLeft={10} marginTop={8}
                                  />
                              </View>
                                 
                              {/* Quick Loan */}
                              <View style={{flexDirection:'column',
                                justifyContent:'flex-start', marginLeft: 10, flexShrink:1,}}>
                              <Text style={{fontFamily:'_semiBold',
                                  color:'#fff', fontSize:18, marginTop: 5}}>Quick Loans</Text>
                                <Text style={{color:'#001f00', fontSize:13, fontFamily:'_regular', flexWrap: 'wrap', maxWidth:250, marginBottom: 10}}>Apply for a quick loan to uplift your business need swiftly</Text>
                              </View>
                            </View>

                            {/* coin price and indicator */}
                            <View style={{flexDirection:'column',
                               alignItems:'center',
                                justifyContent:'center'}}>
                              {/* price */}
                              <FontAwesome name="angle-right"
                                size={25} color="#fff" 
                              />
                          </View>
                            
                        </TouchableOpacity>
                          
                          {/* circle progress bar Loan repayment */}
                          
                          <View style={{marginHorizontal: 10, marginTop: 10, marginBottom: 10}}>
                              <View style={{flexDirection: 'column', alignItems:'center', justifyContent:'center', marginVertical: 5}}>
                              <Text style={{fontFamily:'_regular', color:'#aaa', fontSize:15, marginTop: 10, marginHorizontal: 15}}>
                                Loan re-payment indicator
                              </Text>
                                <CircularProgress
                                  value={25}
                                  radius={100}
                                  progressValueColor={'#aaa'}
                                  progressValueStyle={{fontFamily: '_bold', fontSize:25}}
                                  activeStrokeColor={colors.secondaryColor2}
                                  inActiveStrokeColor={colors.secondaryColor2}
                                  inActiveStrokeOpacity={0.2}
                                  title={'Completed'}
                                  titleColor={'#aaa'}
                                  titleStyle={{fontFamily: '_regular', fontSize:15}}
                                  //valuePrefix={'%'}
                                  valueSuffix={'%'}
                                 />
                             
                              </View>
                          </View>
                    
                  {/* Recent transaction */}

                  <View style={{flexDirection: "row", justifyContent: 'space-between', alignItems:'center', marginHorizontal: 10, marginTop: 20}}>
                  {recentTranData.length ? <>
                    
                    <Text style={{color:"#aaa", fontSize: 15, fontFamily:'_regular'}}>Recent transaction</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('History')}>
                    <Text style={{color:"#000", fontSize: 15, fontFamily: '_regular'}}>View </Text>
                    </TouchableOpacity>
                  </> : ''}
                    
                   </View>

                        {/* list view here */}
                        
                        { recentLoading ? '': 
                            <View style={{justifyContent:'center', alignItems:'center'}}>
                              {recentTranData.length ? '': <>
                              <Text style={{fontFamily:'_regular', fontSize:14, color:"#aaa", flexShrink: 1}}>
                                Recent transactions will show here.
                            </Text>
                                  <View style={{justifyContent:'center', alignItems:'center'}}>
                                    <Ionicons name="file-tray-outline" size={30} color="#aaa" marginLeft={8}/>
                                  </View>
                              </>
                              }
                             </View>
                            }

                        <View style={{marginBottom:50}}>

                        <View>
                          {recentTranData.map((item, index) => (
                            
                            <TouchableOpacity style={styles.recentTransaction}
                            onPress={() =>{
                              Alert.alert("You click to View all transactions")
                            }}  key={index} >
                          
                            <View style={{flexDirection:'row', alignItems:'center'}}
                             >
                              
                              <View>
                              {item.transac_nature =='Debit'? <Ionicons name="ios-arrow-down-circle-sharp"
                                size={30} color="#ea3372" marginLeft={8}/> : <Ionicons name="ios-arrow-up-circle-sharp"
                                size={30} color="#09d97b" marginLeft={8}/>}
                              </View>
                                
                              {/* text */}
                              <View style={{flexDirection:'column',
                                justifyContent:'flex-start', marginLeft: 10}}>
                              <Text style={{fontFamily:'_semiBold',
                                  color:'#aaa', fontSize:13, marginTop: 5}}>{item.tran_type} | {item.transac_nature}</Text>
                                <Text style={{fontFamily:'_semiBold', fontSize:13, marginBottom: 5}}>{item.transac_nature =='Debit'? '-' : '+'}<NumberValueFormat value={item.amount} /></Text>
                              </View>
                            </View>

                            {/* price Send and indicator */}
                              <View style={{flexDirection:'column',
                                backgroundColor:'#fff', alignItems:'center',
                                  justifyContent:'center'}}>
                                {/* navigation Icon */}
                            
                                {/* date and navigation sign*/}
                                  <View style={{flexDirection:'row', alignItems:'center',
                                    justifyContent:'center'}}>
                                    <Text style={{fontFamily:'_semiBold', fontSize:10, color:"#aaa"}}>{moment(item.creditOn).format("DD/mm/YYYY hh:mm:ss")}</Text>
                                    <FontAwesome name="angle-right"
                                  size={25} color="#aaa" style={{marginLeft:10}} />
                                  </View>

                            </View>
                          </TouchableOpacity>
                          
                            
                          ))}
                        </View>
                            {/* <FlatList
                              keyExtractor = {item => item._id}  
                              data={recentTranData}
                              renderItem = {({item}) => (
                              <TouchableOpacity style={styles.recentTransaction}
                              onPress={() =>{
                                Alert.alert("You click to View all transactions")
                              }}>
                           
                              <View style={{flexDirection:'row', alignItems:'center'}}>
                                
                                <View>
                                {item.transac_nature =='Debit'? <Ionicons name="ios-arrow-down-circle-sharp"
                                  size={30} color="#ea3372" marginLeft={8}/> : <Ionicons name="ios-arrow-up-circle-sharp"
                                  size={30} color="#ea3372" marginLeft={8}/>}
                                </View>
                                  
                                
                                <View style={{flexDirection:'column',
                                  justifyContent:'flex-start', marginLeft: 10}}>
                                <Text style={{fontFamily:'_semiBold',
                                    color:'#aaa', fontSize:13, marginTop: 5}}>{item.tran_type} | {item.transac_nature}</Text>
                                  <Text style={{fontFamily:'_semiBold', fontSize:13, marginBottom: 5}}>{item.transac_nature =='Debit'? '-' : '+'}<NumberValueFormat value={item.amount} /></Text>
                                </View>
                              </View>

                              
                                <View style={{flexDirection:'column',
                                  backgroundColor:'#fff', alignItems:'center',
                                    justifyContent:'center'}}>
                                  
                                    <View style={{flexDirection:'row', alignItems:'center',
                                      justifyContent:'center'}}>
                                      <Text style={{fontFamily:'_semiBold', fontSize:10, color:"#aaa"}}>{item.creditOn}</Text>
                                      <FontAwesome name="angle-right"
                                    size={25} color="#aaa" style={{marginLeft:10}} />
                                    </View>

                              </View>
                            </TouchableOpacity>)} 
                            /> */}
                           
                        </View>
                  
            </ScrollView>
              {/* This show a dash round line */}
                {/* <View style={styles.placeholder}>
                  <View style={styles.placeholderInset}>

                  </View>
                </View> */}    
           
                
                 {/* Modal full popup here */}
                 <Modal
                 animationType={"slide"}
                  transparent={false}
                  visible={showModal}
                  onRequestClose={() => {
                    console.log('Popup closed')
                  }}
                >
                  <View style={styles.modal}>
                    <Text style={styles.textPopup}> 
                    Modal is open
                    </Text>

                      <TouchableOpacity 
                        onPress={() =>{
                          setshowModal(!showModal);
                        }}
                      >
                        <Text style={styles.textPopup}>Close</Text>
                      </TouchableOpacity>
                  </View>
                </Modal>
                
                {/* Loan action sheet popup here */}
                  <RBSheet
                     ref={sheetLoan}
                      customStyles={{container: styles.sheet,
                      }}
                      height={350}
                      openDuration={250}
                      dragFromTopOnly={true}
                      closeOnDragDown={true}
                      animationType="fade"  
                    >
                        <View style={styles.sheetContent}>
                          <FontAwesome5 name="hand-holding-usd" color="#A78808" size={48} style={{alignSelf:'center'}}></FontAwesome5>
                          <Text style={styles.sheetTitle}>Quick loan request</Text>
                          <Text style={styles.message}> To apply for a quick loan, please contact admin for more details and requirement.</Text>
                        
                          
                          <TouchableOpacity onPress={() =>{
                            sheetLoan.current.close();
                          }}>
                            <View style={styles.btn}>
                              <Text style={styles.btnText}>Okay</Text>
                            </View>
                          </TouchableOpacity>
  
                          <TouchableOpacity onPress={() =>{
                              sheetLoan.current.close();
                              }}>
                                <View style={[styles.btn, {marginTop: 12, backgroundColor:'transparent',
                              borderColor:'transparent'}]}>
                                  <Text style={[styles.btnText, {color:'#A78808'}]}>Cancel</Text>
                                </View>
                              </TouchableOpacity>
                        </View>
                    </RBSheet>

                {/* Start transfer action sheet here
                    <RBSheet
                     ref={sheet}
                      customStyles={{container: styles.sheet,
                        // wrapper: {
                        //   backgroundColor: "transparent"
                        // },
                        }}
                      height={350}
                      openDuration={250}
                      dragFromTopOnly={true}
                      closeOnDragDown={true}
                      animationType="fade"  
                    >
                        <View style={styles.sheetContent}>
                          <FeatherIcon name="shield" color="#F2688B" size={30} style={{alignSelf:'center'}}></FeatherIcon>
                          <Text style={styles.sheetTitle}>Secure your account</Text>
                          <Text style={styles.message}> enabling 2FA adds an extra layer to your security of your account by requiring you to enter a one-time code in addition to your password when you sign in.</Text>
                        
                          
                          <TouchableOpacity onPress={() =>{

                          }}>
                            <View style={styles.btn}>
                              <Text style={styles.btnText}>Confirm</Text>
                            </View>
                          </TouchableOpacity>

                            
                          <TouchableOpacity onPress={() =>{
                              sheet.current.close();
                              }}>
                                <View style={[styles.btn, {marginTop: 5, backgroundColor:'transparent',
                              borderColor:'transparent'}]}>
                                  <Text style={[styles.btnText, {color:'#F2688B'}]}>Cancel</Text>
                                </View>
                              </TouchableOpacity>
                        </View>
                    </RBSheet>
                 */}
                
                    
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   container:{
        padding: 24,
        flex: 1,
    },
    bgImage:{
      position: 'absolute',
      bottom: -6,
      right: 20,
     },
    button:{
      width: '30%',
      height: 40, 
      backgroundColor: '#75c31e',
      alignItems: 'center',
      justifyContent:'center',
      borderRadius: 5,
    },
    button2:{
      width: '30%',
      height: 40, 
      backgroundColor: '#75c31e',
      alignItems: 'center',
      justifyContent:'center',
      borderRadius: 10,
      flexDirection: 'row',
    },
   
      titleBox: {
        background: 'pink'
      },
      titleText: {
        fontSize: 16,
        color: '#000'
      },

    balanceRow:{
        flexDirection: "column",
        marginVertical: 10,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems:"center"
        
    },
    balanceRow1:{
        flexDirection: "row",
        justifyContent:"space-evenly"
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
     middlePage:{
        flexDirection: "column",
        borderRadius: 15, 
        borderColor: '#E0E0E0',
        borderWidth: 1.5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 10,
        height: 270,
        width: screenWidth - 16,
        marginTop: 40,
     },
     middlePage2:{
        alignItems: "center",
        marginHorizontal: 10,
        padding: 10,
        height: 270,
        width: screenWidth - 16,
       
     },
    header:{
        marginVertical: 36,
    },
    headerSendUp:{
        marginVertical: 20,
    },
    headerImg1:{
        width: 80,
        height: 80,
    },
    headerImg:{
        width: 80,
        height: 80,
        alignSelf: "center",
        borderRadius: 15,
        marginBottom: 35,
    },
    title:{
        fontSize: 27,
        fontWeight: "700",
        color: "#1e1e1e",
        marginBottom: 6,
        textAlign: "center",
    },
    nameTitle:{
        fontSize: 20,
        fontFamily: '_regular',
        color: "#fff",
        marginBottom: 6,
        textAlign: "justify",
        opacity: 0.8,
    },
    nameView:{
        flexDirection: "column",
        marginVertical: 10,
        marginHorizontal: 10,
    },
    titleSend:{
        fontSize: 27,
        fontWeight: "700",
        color: "#1e1e1e",
        marginBottom: 6,
        textAlign: "justify"
    },
    subTitleSend:{
        fontSize: 15,
        fontWeight: "400",
        color: "#929292",
        textAlign: "justify"
    },
    subTitle:{
        fontSize: 15,
        fontWeight: "500",
        color: "#929292",
        textAlign: "center",
    },
    
    input:{
        marginBottom: 16
    },
    inputLabel:{
        fontSize: 17,
        fontWeight: "600",
        color: "#222",
        marginBottom: 8,
     },
     inputControl:{
        height: 44,
        backgroundColor: "#fff",
        fontSize: 15,
        fontWeight: "500",
        color: "#222",
        paddingHorizontal: 16,
        borderRadius: 12,
     },
     formAction:{
        marginVertical: 24,
     },
     form:{
        marginBottom: 24,
        flex: 1,
     },
     formFooter:{
        fontSize: 17,
        fontWeight: "600",
        color: "#222",
        textAlign: "center",
        letterSpacing: 0.15
     },
    //  btn:{
    //     backgroundColor: colors.secondaryColor1,
    //     borderRadius: 8,
    //     borderWidth: 1,
    //     borderColor: colors.secondaryColor1,
    //     flexDirection: "row",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     paddingVertical: 10,
    //     paddingHorizontal: 20,
    //  },
     btnText:{
        fontSize: 18,
        fontFamily: '_semiBold',
        color: "#fff",
     },
     circleIcon:{
        borderRadius: 9999, 
        overflow: 'hidden', 
        borderColor: '#fff', 
        width: 30, 
        height: 30, 
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center",
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
     circleText:{
        fontSize: 18,
        fontWeight: "900",
        color: "#F04B73",
        
     },
     chatHeader: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 8,
        opacity: 0.3
      },
      chatHeader2: {
        justifyContent:"flex-start",
        fontSize: 18,
        fontWeight:"300",
        marginTop: 10,
        opacity: 0.3,
        marginLeft: 16,
      },

      middleSection:{
        flexDirection:'row',
        borderWidth:1, borderColor:'#ddd',
        borderRadius:15, justifyContent:'space-between',
        marginHorizontal: 10,
        backgroundColor: colors.secondaryColor1,
        paddingRight:10, 
        marginBottom:10,
        height: "auto",
      },
      recentTransaction:{
        flexDirection:'row',
        borderWidth:1, borderColor:'#ddd',
        borderRadius:15, justifyContent:'space-between',
        marginHorizontal: 10,
        backgroundColor: "#fff",
        paddingRight:10, 
        marginBottom:10,
        height: "auto",
      },
      modal:{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F2688B",
        padding: 5,
      },
      textPopup:{
        marginTop: 10,
        fontWeight: 'bold'
      },

      sheet:{
        borderTopLeftRadius: 14,
        borderTopRightRadius: 16,
      },
      sheetContent:{
        padding: 24,
        alignItems: 'stretch',
      },
      sheetTitle:{
        fontSize: 18,
        fontFamily: '_semiBold',
        color: '#181818',
        marginTop: 16,
        textAlign: 'center',
      },
      message:{
        fontSize: 14,
        fontFamily: '_regular',
        color: '#555',
        marginTop: 10,
        marginBottom: 32,
        textAlign: 'center',
      },

      btn:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.secondaryColor1,
        borderColor: colors.secondaryColor1,
        borderWidth: 1,
      },
      btnText:{
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
      },
      placeholder:{
        flex: 1,
        height: 500,
        padding: 24,
      },
      placeholderInset:{
        borderWidth: 4,
        borderColor: "#F2688B",
        borderStyle: 'dashed',
        borderRadius: 9,
        flex: 1
      },
})

export default HomeScreen;
