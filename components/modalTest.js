import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Pressable , Dimensions, ActivityIndicator, Image} from 'react-native';
import { gs, colors } from "../styles";
import FeatherIcon from 'react-native-vector-icons/Feather';
import {
    FontAwesome5,
  } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable'

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = 400;

const ModalTest = (props) => {
    closeModalTest = (bool, data) =>{
        props.loanModalTest(bool);
       }
return (
    <View
        disabled={true}
        style={styles.container}
        >
        <Animatable.View 
         animation='fadeInUp'
            style={styles.modal}>
            <View style={styles.textView}>
                <View style={{backgroundColor: colors.secondaryColor2, 
                    width: '100%', 
                    height: 70,
                    borderTopEndRadius: 10, 
                    borderTopStartRadius:10, 
                    marginTop : -10, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={[styles.text, {fontSize: 20, color:'#fff'}]}>About Loans</Text>
                </View>
                
                <View style={{marginTop: 20, marginBottom: 8}}>
                    
                            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                             <Image source={require('../assets/loan.png')} style={{width:80, height:80, tintColor: colors.secondaryColor2}}  />
                            </View>

                            <View style={[styles.rowWrapper2, {justifyContent: 'center', alignItems:'center'}]}>
                                <Text style={[styles.rowLabel, {fontSize: 20} ]}>
                                    Interested in quick loan?
                                </Text>  
                            </View>
                            <View style={styles.rowWrapper2}>
                                <View style={styles.row}>
                                  <Text style={[styles.rowLabel, {fontSize: 15, fontFamily: '_regular'}]}>
                                    Our loan facility is very helpful and handy for business support on the go! For more details and how you
                                    can access the loan, kindly contact our admin for more details.
                                    </Text>
                                        <View style={styles.rowSpacer} />
                                        
                                </View>  
                            </View>
                   </View>
               
                
            </View>
            
                <View style={{justifyContent: 'center', alignItems:'center'}}>
                    <Pressable style={styles.touchableOpacity}
                        onPress={() => closeModalTest(false, 'Confirm modal')} >
                        <Text style={[styles.text, {color: '#fff'}]}>
                            Okay
                        </Text>
                    </Pressable >
                </View>
                
        </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#000000aa',
       // backgroundColor: 'rgba(0, 0, 0, 0.4)',
        
     },
    rowWrapper: {
        paddingLeft: 24,
        backgroundColor: '#e3e3e3',
        borderColor: '#e3e3e3',
        borderRadius: 15,
        marginTop: 35,
      },
      rowWrapper2:{
        marginBottom: 15,
        width: WIDTH - 90,
     },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 24,
         },
      rowLabel: {
        fontSize: 14,
        fontFamily: '_semiBold',
        color: '#777',
      },
      rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      },
    modal:{
        height: HEIGHT_MODAL,
        width: WIDTH - 60,
        paddingTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
  
    },
    textView:{
        flex: 1,
        alignItems:"center",
        
     },
    text:{
        fontSize: 16,
        margin: 5,
        fontFamily: '_semiBold',
        color: '#aaa'
        },
   
    touchableOpacity:{
        //paddingVertical: 8,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginHorizontal: 5,
        backgroundColor: colors.secondaryColor1,
        marginBottom: 10,
     }
})
export { ModalTest}
