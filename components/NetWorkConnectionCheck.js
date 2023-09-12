import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Modal, ActivityIndicator, Image, TouchableOpacity, Linking } from 'react-native';
import { gs, colors } from '../styles';
import NetInfo from '@react-native-community/netinfo';
import Feather from 'react-native-vector-icons/Feather'

const NetWorkConnectionCheck = () => {
    const [isConnected, setIsConnected] = useState(true);
    const [checkNetwork, setCheckNetwork] = useState(false); // Initial state can be true if you want to assume connectivity

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener((state) => {
        setIsConnected(state.isConnected);
        
        if(state.isConnected === true) {
            setCheckNetwork(false);
            return true;
        }
        else if(state.isConnected === false) {
            setCheckNetwork(true);
            return false;
        }
      });
  
      // Clean up the subscription when the component unmounts
      return () => {
        unsubscribe();
      };
    }, []);

    const openPhoneSettings = () => {
        Linking.openSettings()
          .then(() => {
          //console.log('Phone settings opened');
          })
          .catch(err => {
            console.error('An error occurred while opening phone settings: ', err);
          });
      };

    return (
        <View>
                <Modal transparent={true} animationType={'none'} visible={checkNetwork}>
                <View style={styles.modalBackground}>
                
                    <View style={styles.ActivityIndicatorWraper}>
                        <View style={{backgroundColor: colors.secondaryColor2, 
                        borderTopEndRadius: 10, 
                        borderTopStartRadius:10, 
                        height: 40,
                        width: '100%',
                        marginTop : -37, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={[styles.text, {fontSize: 20, color:'#fff'}]}>No connection</Text>
                        </View>
                        <View style={{marginTop: 15}}></View>
                        <Feather name='wifi-off' size={45} color='#aaa' />
                        <Text style={{fontSize:14, alignItems:'center', justifyContent:'center', fontFamily: '_regular', color:'#777'}}>Please, connect to internet connection.</Text>
                        <View style={{marginBottom: 0, marginTop: 20}}>

                        <TouchableOpacity onPress={() => openPhoneSettings()} >
                            <Text style={{fontFamily: '_semiBold', fontSize: 18, color:colors.secondaryColor2}}>Okay</Text>
                        </TouchableOpacity>

                        </View>
                    </View>
        
                </View>
            
            </Modal>
        </View>
    
      );
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

    modalBackground:{
        flex:1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#00000070',
    },
    ActivityIndicatorWraper:{
        backgroundColor:'#fff',
        height: 170,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        //justifyContent: 'space-around',
        justifyContent: 'center',
    }
});

export default NetWorkConnectionCheck;
