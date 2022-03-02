import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RNTestButton } from '../components';
import { Colors } from '../constants';
import UserContext from '../store';
import { HomeProps } from '../typings/screens';

export default function HomeScreen({ navigation }: HomeProps) {
  const userContext = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}>Welcome</Text>
        {userContext?.user && (
          <Text
            style={
              styles.name
            }>{`${userContext?.user.first_name} ${userContext?.user.last_name}`}</Text>
        )}
      </View>

      <Image
        source={{
          uri: userContext?.user?.avatar ? userContext?.user?.avatar : 'https://picsum.photos/200',
        }}
        style={styles.profilePicture}
      />

      {!userContext.user && (
        <Text style={styles.selectUser}>Select a user to show the profile</Text>
      )}
      {userContext?.user && (
        <View style={styles.userDetail}>
          <Text
            style={
              styles.name
            }>{`${userContext.user.first_name} ${userContext.user.last_name}`}</Text>
          <Text style={styles.email}>{`${userContext.user.email}`}</Text>
          <Text style={styles.website} onPress={() => navigation.navigate('Webview')}>
            website
          </Text>
        </View>
      )}

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
