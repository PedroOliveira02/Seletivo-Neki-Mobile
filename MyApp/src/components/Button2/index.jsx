import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button2 = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 5,
    width: 300,
    backgroundColor: '#046ee5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 1,
  },
});

export default Button2;
