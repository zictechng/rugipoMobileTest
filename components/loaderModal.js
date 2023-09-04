import React, {useContext, useState, useCallback, useMemo, useRef, useEffect} from 'react';
import { StyleSheet, View, Text, Modal, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import { gs, colors } from '../styles';


const TransferSuccessful = () => {

    const [showModal, setshowModal] = useState(false);


return (
    <View style={[styles.modalBackground, {backgroundColor: colors.secondaryColor2}]}>
        <View>

            <View style={styles.ActivityIndicatorWraper}>
                <ActivityIndicator size='large' color={colors.secondaryColor1} marginTop={8} />
                <Text style={{fontSize:13, alignItems:'center', justifyContent:'center', fontFamily: '_regular'}}>Processing...</Text>
             </View>

        </View>

        
    
    </View>
  );
}



const styles = StyleSheet.create({
    modalBackground:{
        flex:1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    ActivityIndicatorWraper:{
        backgroundColor:'#fff',
        height: 70,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        //justifyContent: 'space-around',
        justifyContent: 'center',
    },
    textPopup:{
        marginTop: 10,
        fontWeight: 'bold',
        color: '#ff0000',
      },
});


export default TransferSuccessful;