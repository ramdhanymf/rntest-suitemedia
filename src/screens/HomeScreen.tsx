import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RNTestButton } from '../components';
import { Colors } from '../constants';
import { HomeProps } from '../typings/screens';

export default function HomeScreen({ navigation }: HomeProps) {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.name}>John Doe</Text>
      </View>

      <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.profilePicture} />

      <Text style={styles.selectUser}>Select a user to show the profile</Text>
      <View style={styles.userDetail}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>email@email.com</Text>
        <Text style={styles.website} onPress={() => navigation.navigate('Webview')}>
          website
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <RNTestButton label="Choose a User" onPress={() => navigation.navigate('Users')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  welcome: {
    fontWeight: '400',
    fontSize: 15,
  },
  profilePicture: {
    height: 164,
    aspectRatio: 1,
    borderRadius: 82,
  },
  selectUser: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.GREY_2,
    marginTop: 20,
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetail: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontWeight: '500',
    fontSize: 24,
    color: Colors.GREY,
    marginBottom: 10,
  },
  email: {
    fontWeight: '500',
    fontSize: 18,
    color: Colors.GREY,
    marginBottom: 10,
  },
  website: {
    color: Colors.MAIN,
    fontWeight: '500',
  },
});
