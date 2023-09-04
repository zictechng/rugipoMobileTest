import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Pressable , Dimensions, ActivityIndicator } from 'react-native';
import { gs, colors } from "../styles";
import FeatherIcon from 'react-native-vector-icons/Feather';
import {
    Ionicons,
    Entypo,
    SimpleLineIcons,
    FontAwesome,
    FontAwesome5,
    MaterialCommunityIcons,
    MaterialIcons
  } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable'

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = 500;

const SimpleModal = (props) => {

    closeModal = (bool, data) =>{
        props.changeModalVisible(bool);
        props.setData(data);
        //console.log("Use click ", data);
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
                    height: 40,
                    borderTopEndRadius: 10, 
                    borderTopStartRadius:10, 
                    marginTop : -10, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={[styles.text, {fontSize: 20, color:'#fff'}]}>Beneficiaries</Text>
                </View>
                
                {/* <View style={{marginTop: 20, marginBottom: 8}}>
                    
                            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                                <FontAwesome5
                                name="users"
                                size={30}
                                color="#aaa"
                                marginLeft={8}/>
                            </View>
                            // here flatlist will show all the beneficiaries list limit by 10
                            <View style={styles.rowWrapper2}>
                                <View style={styles.row}>
                                  <Text style={[styles.rowLabel, ]}>Ken Developer</Text>
                                        <View style={styles.rowSpacer} />
                                        <Text style={{color:'#aaa'}}>10/08/2022</Text>
                                        <FeatherIcon name='chevron-right' color='#ababab'
                                        size={22} />
                                </View>  
                            </View>
                            <View style={styles.rowWrapper2}>
                                <View style={styles.row}>
                                  <Text style={[styles.rowLabel, ]}>Ken Developer</Text>
                                        <View style={styles.rowSpacer} />
                                        <Text style={{color:'#aaa'}}>10/08/2022</Text>
                                        <FeatherIcon name='chevron-right' color='#ababab'
                                        size={22} />
                                </View>  
                            </View>
                   </View> */}
                {/* If no data show this to users */}
                <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                    <Text style={[styles.text]}>Your Beneficiaries will show here</Text>
                        <FontAwesome5
                        name="users"
                        size={30}
                        color="#aaa"
                        marginLeft={8}/>
                </View>
                
            </View>
            
                <View style={styles.buttonView}>
                    <Pressable style={styles.touchableOpacity}
                        onPress={() => closeModal(false, 'Confirm modal')} >
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
        
     },
    rowWrapper: {
        paddingLeft: 24,
        backgroundColor: '#e3e3e3',
        borderColor: '#e3e3e3',
        borderRadius: 15,
        marginTop: 35,
      },
      rowWrapper2:{
        paddingLeft: 24,
        backgroundColor: '#e3e3e3',
        borderColor: '#e3e3e3',
        borderRadius: 15,
        marginBottom: 15,
        width: WIDTH - 90,
     },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 24,
        height: 50,
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
        fontFamily: '_regular',
        color: '#aaa'
        },
   
    touchableOpacity:{
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 15,
        marginHorizontal: 5,
        backgroundColor: colors.secondaryColor1,
        marginBottom: -20,
     }
})
export { SimpleModal}
