import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { Colors } from '../constants';
import { UsersProps } from '../typings/screens';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function UsersScreen({ navigation }: UsersProps) {
  const [mapActive, setMapActive] = useState(false);

  // const getRandomLocation = (from: number, to: number, fixed: number): LatLng => {
  //   return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
  // };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setMapActive(!mapActive)}>
          {mapActive ? <Text>Map</Text> : <Text>List</Text>}
        </TouchableOpacity>
      ),
    });
  }, [navigation, mapActive]);

  return (
    <View style={styles.container}>
      {mapActive ? (
        <View style={{ flex: 1 }}>
          <MapView
            style={{ ...StyleSheet.absoluteFillObject }}
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            <Marker
              coordinate={{
                latitude: LATITUDE + (Math.random() - 0.5) * (LATITUDE_DELTA / 2),
                longitude: LONGITUDE + (Math.random() - 0.5) * (LONGITUDE_DELTA / 2),
              }}
              onPress={() => console.log('marker 1')}
            />
            <Marker
              coordinate={{
                latitude: LATITUDE + (Math.random() - 0.5) * (LATITUDE_DELTA / 2),
                longitude: LONGITUDE + (Math.random() - 0.5) * (LONGITUDE_DELTA / 2),
              }}
            />
          </MapView>
        </View>
      ) : (
        <FlatList
          data={[0, 1, 2]}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.cardContainer}>
              <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.image} />
              <View>
                <Text style={styles.name}>first name</Text>
                <Text style={styles.email}>email@email.com</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.GREY_2,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  image: {
    height: 50,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 20,
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
  },
  email: {
    fontWeight: '400',
    fontSize: 15,
    color: Colors.GREY,
  },
});
