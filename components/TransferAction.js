import React from 'react';
import { View, Text, StyleSheet, useRef} from 'react-native';
import ActionSheet from '@alessiocancian/react-native-actionsheet';

 TransferAction = () =>{

    
    let actionSheet = useRef();
   
   var optionArray = [
    'Option1', 'Option2', 'Option3', 'Option4', 'Option5', 'Option6', 'Option7', 'Option8', 'cancel', 
   ];

   const showActionSheet = () => {
    actionSheet.current.show();
  };
  return (
    <View>
                    <ActionSheet
                      ref={actionSheet}
                      tintColor='#aaa'
                      styles={styles}
                      // Title of the Bottom Sheet
                      title={<Text style={{color: '#aaa', fontSize:18, fontWeight:'bold', alignItems:"center"}}>Transfer Type ?</Text>}
                      message={'Choose any of the menu items below to carry out your action as requested, thank you.'}
                      // Options Array to show in bottom sheet
                      options={optionArray}
                      //theme='ios'
                      cancelButtonIndex={8}
                      destructiveButtonIndex={4}
                      onPress={(index) => {
                        // Clicking on the option will give you alert
                        alert(optionArray[index]);
                      }}
                    />
     </View>
  );
}

const styles = StyleSheet.create({
    constrainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc',
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
})


export default TransferAction;
