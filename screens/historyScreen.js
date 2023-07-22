import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { TextFieldComponent } from '../components/TextFieldComponent';

const HistoryScreen = () => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');

  return (
    // <View>
    //   <Text>History Screen</Text>
    //  </View>
    <View style={styles.container}>
      {/* Looping the TextFieldComponent 4 times */}
      {[
        { label: 'Field 1', value: field1, onChangeText: setField1 },
        { label: 'Field 2', value: field2, onChangeText: setField2 },
        { label: 'Field 3', value: field3, onChangeText: setField3 },
        { label: 'Field 4', value: field4, onChangeText: setField4 },
      ].map((field, index) => (
        <TextFieldComponent
          key={index}
          label={field.label}
          value={field.value}
          onChangeText={field.onChangeText}
        />
      ))}

      {/* Button to display the TextField values */}
      <Button
        title="Submit"
        onPress={() => {
          console.log('Field 1:', field1);
          console.log('Field 2:', field2);
          console.log('Field 3:', field3);
          console.log('Field 4:', field4);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // constrainer:{
  //     flex:1,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     backgroundColor: '#8fcbbc',
  // },
  // footer: {
  //     flex: 2,
  //     backgroundColor: '#fff',
  //     borderTopLeftRadius: 30,
  //     borderTopRightRadius: 30,
  //     paddingHorizontal: 20,
  //     paddingVertical: 30
  // },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
})

export default HistoryScreen;
