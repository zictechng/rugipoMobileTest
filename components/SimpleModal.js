import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = 180;

const SimpleModal = (props) => {

    closeModal = (bool, data) =>{
        props.changeModalVisible(bool);
        props.setData(data);
    }
  return (
    <TouchableOpacity
        disabled={true}
        style={styles.container}
    >
        <View style={styles.modal}>
            <View style={styles.textView}>
                <View style={{backgroundColor: '#F2688B', 
                    width: '100%', 
                    height: 50,
                    borderTopEndRadius: 10, 
                    borderTopStartRadius:10, 
                    marginTop : -10, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={[styles.text, {fontSize: 20, color:'#fff'}]}>Confirm</Text>
                </View>
               
                <Text style={[styles.text, {marginTop: 20}]}>Are you sure you want to do this ?</Text>
            </View>
            

            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() => closeModal(false, 'Cancel modal')}
                >
                    <Text style={[styles.text, {color: '#aaa'}]}>
                        Cancel
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() => closeModal(false, 'Confirm modal')}
                >
                    <Text style={[styles.text, {color: '#F2688B'}]}>
                        Yes
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    modal:{
        height: HEIGHT_MODAL,
        width: WIDTH - 80,
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
        elevation: 5,
  
    },
    textView:{
        flex: 1,
        alignItems:"center",
        
     },
    text:{
            fontSize: 16,
            margin: 5,
            fontWeight: 'bold',
        },
    buttonView:{
        width: '100%',
        flexDirection: 'row',
    },
    touchableOpacity:{
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center'
    }
})
export { SimpleModal}
