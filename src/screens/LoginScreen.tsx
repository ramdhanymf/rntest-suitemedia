import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { RNTestButton, RNTestTextInput } from '../components';
import { LoginProps } from '../typings/screens';

export default function LoginScreen({ navigation }: LoginProps) {
  const [palindrome, setPalindrome] = useState('');

  const checkPalindrome = () => {
    const re = /[\W_]/g;
    const lowerRegStr = palindrome.toLowerCase().replace(re, '');
    const reverseStr = lowerRegStr.split('').reverse().join('');

    return reverseStr === lowerRegStr;
  };

  const showAlert = () => {
    const isPalindrome = checkPalindrome();

    Alert.alert(
      'Palindrome Checker',
      isPalindrome ? `${palindrome} is palindrome` : `${palindrome} is not palindrome`,
      [{ text: 'OK' }],
    );
  };

  return (
    <View style={styles.container}>
      <RNTestTextInput containerStyle={styles.textInput} placeholder="Name" />
      <RNTestTextInput
        containerStyle={styles.textInput}
        placeholder="Palindrome"
        onChangeText={value => setPalindrome(value)}
        value={palindrome}
      />

      <View style={styles.seperator} />

      <RNTestButton buttonStyle={styles.button} label="Check" onPress={showAlert} />
      <RNTestButton
        buttonStyle={styles.button}
        label="Next"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 10,
  },
  textInput: {
    marginBottom: 10,
  },
  seperator: {
    height: 20,
  },
});
