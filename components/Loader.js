import React from 'react';
import { StyleSheet, View, Text, Modal, ActivityIndicator, Image} from 'react-native';
import { gs, colors } from '../styles';

const Loader = (props) => {

    const {loading, textInfo} = props;

  return (
    <Modal transparent={true} animationType={'none'} visible={loading}>
        <View style={styles.modalBackground}>

            <View style={styles.ActivityIndicatorWraper}>
                
                <ActivityIndicator animating={loading} size='large' color={colors.secondaryColor1} />
                <Text style={{fontSize:15, alignItems:'center', justifyContent:'center', fontFamily: '_regular'}}>{textInfo}</Text>
                
            </View>

        </View>
    
    </Modal>
  );
}



const styles = StyleSheet.create({
    modalBackground:{
        flex:1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#00000040',
    },
    ActivityIndicatorWraper:{
        backgroundColor:'#fff',
        height: 100,
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


export default Loader;
