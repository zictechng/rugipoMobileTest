import React, {} from 'react';
import { StyleSheet, View, Text, Modal, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import { gs, colors } from '../styles';

const LoaderModal = () => {

return (
    <View style={styles.modalBackground}>
        <View style={styles.ActivityIndicatorWraper}>
               <ActivityIndicator size='large' color={colors.secondaryColor1} marginTop={8} />
                <Text style={{fontSize:13, alignItems:'center', justifyContent:'center', fontFamily: '_regular'}}>Processing...</Text>
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
        backgroundColor: colors.secondaryColor2
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


export default LoaderModal;