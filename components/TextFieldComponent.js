import React from 'react';
import { View, TextInput, Text,StyleSheet } from 'react-native';
export const TextFieldComponent = ({ label, value, onChangeText }) => {
    return (
        <View style={styles.textFieldContainer}>
            <Text>{label}</Text>
            <TextInput
                style={styles.textField}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    textFieldContainer: {
      marginBottom: 10,
    },
    textField: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
    },
  })