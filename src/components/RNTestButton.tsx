import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants';
import { RNTestButtonProps } from '../typings/components';

const RNTestButton: React.FC<RNTestButtonProps> = props => {
  return (
    <TouchableOpacity
      testID={props.testID}
      style={StyleSheet.flatten([styles.container, props.buttonStyle])}
      onPress={props.onPress}
      disabled={props.isLoading}
      {...props}>
      <Text style={StyleSheet.flatten([styles.label, props.labelStyle])}>
        {props.label ? props.label : 'RNTestButton'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 41,
    width: '100%',
    backgroundColor: Colors.MAIN,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  label: {
    color: Colors.WHITE,
    fontWeight: '500',
  },
});

export default RNTestButton;
