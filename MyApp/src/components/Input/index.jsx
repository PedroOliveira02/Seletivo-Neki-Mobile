import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 16,
    width: '100%',
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#f0f2f5',
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default Input;
