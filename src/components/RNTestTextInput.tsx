import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Colors } from '../constants';
import { RNTestTextInputProps } from '../typings/components';

const RNTestTextInput: React.FC<RNTestTextInputProps> = props => {
  return (
    <TextInput style={StyleSheet.flatten([styles.container, props.containerStyle])} {...props} />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 47,
    width: '100%',
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    paddingHorizontal: 20,
  },
});

export default RNTestTextInput;
