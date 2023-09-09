import React, {useContext, useEffect, useRef, useState} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { UserContext } from '../components/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDataInLocalStorage } from '../components/localData';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons, Entypo, SimpleLineIcons, FontAwesome, FontAwesome5, FontAwesome6} from '@expo/vector-icons'
//import ActionSheet from '@alessiocancian/react-native-actionsheet';
import { useNavigation } from '@react-navigation/native';
import { gs, colors } from "../styles";
import { useActionSheet } from '@expo/react-native-action-sheet';
// screen imports goes here
import HomeScreen from '../screens/homeScreen';
import HistoryScreen from '../screens/historyScreen';
import ProfileScreen from '../screens/profileScreen';
import AccountScreen from '../screens/accountScreen';
import SendMoneyScreen from '../screens/sendMoneyScreen';
import CustomSplash from '../screens/customSplash';
import { Alert } from 'react-native';
import { InterBankModal } from '../components/interBankModal';
import client from '../api/client';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const CustomTabBarButton = ({children, onPress}) =>(
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 60,
            height: 60,
            borderRadius: 35,
            backgroundColor: colors.secondaryColor1
        }}>
            {children}
        </View>
    </TouchableOpacity>
)

const BottomTab = () => {
    const navigation = useNavigation();
    const [loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails, messageNotice, setMessageNotice] = useContext(UserContext);
    const [userData, setUserData]= useState({});

    const { showActionSheetWithOptions } = useActionSheet();
   
   var optionArray = [
    'Wire Transfer', 'Inter-Bank Transfer', 'Local Transfer', 'cancel', 
   ];

   let actionSheet = useRef();
  var optionArray = [ 'Local Transfer', 'Wire Transfer', 'Inter-Bank Transfer', 'Cancel'];

  const [isLoanModalVisible, setisLoanModalVisible] = useState(false);


  const changeModalVisible = (bool) =>{
    setisModalVisible(bool);
    
  }


  const loanModalVisible = (bool) =>{
    setisLoanModalVisible(bool);

  }

  const setData = (data) =>{
    setchooseData(data);
  
    };
 
  const showActionSheet = () => {
    //To show the Bottom ActionSheet
    actionSheet.current.show();
  };
  
      const onPress = () => {
        const options = optionArray;
       //const destructiveButtonIndex = 0;
        const cancelButtonIndex = 3;
        
        showActionSheetWithOptions({
        options,
        cancelButtonIndex,
        //destructiveButtonIndex,
        title:'Transfer Type',
        message:'Choose any of the option below to get started with funds transfer.',
        tintColor: colors.blackColor1,
        showSeparators: true,
        messageTextStyle: {fontFamily:'_regular',fontSize: 15},
        titleTextStyle: {color: '#777', fontSize:18, fontFamily:'_semiBold', alignItems:'center', justifyContent:'center'},
        icons:[<FontAwesome name="exchange" color="#aaa" size={24} ></FontAwesome>,
        <FontAwesome5 name="wind" color="#aaa" size={24} ></FontAwesome5>,
        <FontAwesome name="bank" color="#aaa" size={24} ></FontAwesome>,
        <FontAwesome name="close" color={colors.secondaryColor1} size={24} ></FontAwesome>]
        }, 
            (selectedIndex) => {
                if(selectedIndex === 0) {
                    navigation.navigate('localTransfer', {
                        //data: someData,
                       
                        withAnimation: true,
                        animationType: 'slide',
                        
                    });
                  }

                  if(selectedIndex === 1) {
                    navigation.navigate('wireTransfer', {
                        //data: someData,
                        withAnimation: true,
                        
                    });
                  }

                  if(selectedIndex === 2) {
                    loanModalVisible(true);
                  }
                //console.log('You selected ' + selectedIndex);
            });
        }

    // get user information from local storage here
    {loginState ?  
        useEffect(() => {
        setTimeout(async() =>{
          let userLogInToken;
          let userLoginID;
          userLogInToken = null;
          userLoginID = null
          try{
            userLogInToken = await AsyncStorage.getItem('USER_LOCAL_INFO')
            userLoginID = await AsyncStorage.getItem('LOGIN_ID')
            
            const currentUserDetails = JSON.parse(userLogInToken);
            setMyDetails(currentUserDetails);
           }catch (e){
            console.log(e);
          }
          setIsLoading(false);
        }, 1000)
        
      }, []) : null}

  if(isLoading){
    return <CustomSplash />
    
  }

  return (
    <>   
        <Tab.Navigator 
            tabBarOptions={{
            labeled: false,
            tabBarShowLabel: false,
            headerShown: false,
            showLabel: false,
            tabBarShowLabel: false,
                //showIcon: true,
            //tabBarStyle:{
            style:{
                position: 'absolute',
                bottom: 15,
                left: 15,
                right: 15,
                elevation: 0,
                backgroundColor: '#ffffff',
                borderRadius: 15,
                height: 70,
                ...styles.shadow
            }
            }}
             >

            <Tab.Screen name="Home" component={HomeScreen}
             options = {{
                tabBarIcon: ({ focused }) =>(
                    <View style={{alignItems:'center', justifyContent:'center', top:10}}>
                        <Image source={require('../assets/icons/home.png')}
                            resizeMode='contain'
                           style={{
                            width: 20, 
                            height: 20, 
                            tintColor: focused ? colors.secondaryColor2 : '#748c94'
                            }}
                        mode="modal"
                        />
                        {/* <Ionicons
                            name="md-home"
                            size={20}
                            color={focused ? '#e32f45' : '#748c94'}
                        /> */}
                        <Text 
                        style={{color: focused ? colors.secondaryColor2 : '#748c94', 
                        fontSize: 12, 
                        marginBottom: 15}}>
                        Home
                        </Text>
                    </View>
                )
            }} />

            <Tab.Screen name="Account" component={AccountScreen}
            options = {{animationEnabled: true,
                
                tabBarIcon: ({ focused }) =>(
                    <View style={{alignItems:'center', justifyContent:'center', top:10}}>
                        {/* <Image source={require('../assets/icons/magnifying-glass.png')}
                            resizeMode='contain'
                           style={{
                            width: 20, 
                            height: 20, 
                            tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        /> */}
                        <Ionicons
                            name="contract-outline"
                            size={25}
                            color={focused ? colors.secondaryColor2 : '#748c94'}
                        />
                        <Text 
                        style={{color: focused ? colors.secondaryColor2 : '#748c94', 
                        fontSize: 12, 
                        marginBottom: 15}}>
                        Statements
                        </Text>
                    </View>
                )
            }}
            />

            <Tab.Screen name="SendMoney" component={SendMoneyScreen} 
            options = {{
                tabBarIcon: ({ focused }) =>(
                    <Ionicons
                            name="send-outline"
                            size={25}
                            color={focused ? '#fff' : '#ffd'}
                        /> 
                     ),
                    tabBarButton: (props) =>(
                    <CustomTabBarButton {...props} />
                    )
                }}
                // this will call the action sheet or modal to popup
                    listeners={({}) =>({
                        tabPress: event => {
                            event.preventDefault();
                            onPress()
                        }
                    })}
                    // this will call a new page to slide up and display

                    // listeners={({navigation}) =>({
                    //     tabPress: event => {
                    //         event.preventDefault();
                    //         navigation.Navigate("PaymentHistory")
                    //     }
                    // })}
            />

            <Tab.Screen name="History" component={HistoryScreen} options = {{
                tabBarIcon: ({ focused }) =>(
                    <View style={{alignItems:'center', justifyContent:'center', top:10}}>
                        {/* <Image source={require('../assets/icons/setting.png')}
                            resizeMode='contain'
                           style={{
                            width: 20, 
                            height: 20, 
                            tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        /> */}
                        <Ionicons
                            name="bar-chart-outline"
                            size={25}
                            color={focused ? colors.secondaryColor2 : '#748c94'}
                        />
                        <Text 
                        style={{color: focused ? colors.secondaryColor2 : '#748c94', 
                        fontSize: 12, 
                        marginBottom: 15}}>
                        History
                        </Text>
                    </View>
                )
            }} />

            <Tab.Screen name="Profile" component={ProfileScreen} options = {{
                tabBarIcon: ({ focused }) =>(
                    <View style={{alignItems:'center', justifyContent:'center', top:10}}>
                        {/* <Image source={require('../assets/icons/messenger.png')}
                            resizeMode='contain'
                           style={{
                            width: 20, 
                            height: 20, 
                            tintColor: focused ? '#e32f45' : '#748c94'
                            }}
                        /> */}
                        <Ionicons
                            name="stats-chart-outline"
                            size={25}
                            color={focused ? colors.secondaryColor2 : '#748c94'}
                        />
                        <Text 
                        style={{color: focused ? colors.secondaryColor2 : '#748c94', 
                        fontSize: 12, 
                        marginBottom: 15}}>
                        Account
                        </Text>
                    </View>
                )
            }}/>
             
        </Tab.Navigator>

        <Modal
            transparent={true}
            animationType="slideInBig"
            useNativeDriver={true}
            visible={isLoanModalVisible}
            nRequestClose={() => loanModalVisible(false)}>
            <InterBankModal
                loanModalVisible = {loanModalVisible}
                setData={setData}/>
        </Modal>
    </>
    
  );
}

const styles = StyleSheet.create({
    shadow:{
        shadowColor: '#7f5df0',
        shadowOffset:{
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    messageStyle: {
        color: '#aaa', fontSize:13, fontFamily:'_regular'
    }
})

export default BottomTab;
