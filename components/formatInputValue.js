import React from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';
import { NumericFormat } from 'react-number-format';

export function NumberInputValueFormat({ value }) {
  return (
    <NumericFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      prefix={' \u20A6'}
      renderText={formattedValue => <TextInput>{formattedValue}</TextInput>} // <--- Don't forget this!
    />
  );
}