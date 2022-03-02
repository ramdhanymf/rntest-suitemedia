import React, { useState, useRef, useMemo, useEffect, useCallback, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { Colors } from '../constants';
import { UsersProps } from '../typings/screens';
import { RNTestButton } from '../components';
import API from '../configs/axios';
import UserContext from '../store';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function UsersScreen({ navigation }: UsersProps) {
  const userContext = useContext(UserContext);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();

  const [users, setUsers] = useState<Array<User>>([]);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [mapActive, setMapActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setLoadMore] = useState(false);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const snapPoints = useMemo(() => ['40%'], []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setMapActive(!mapActive)}>
          {mapActive ? <Text>Map</Text> : <Text>List</Text>}
        </TouchableOpacity>
      ),
    });
  }, [navigation, mapActive]);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const res = await API.get<{ data: Array<User> }>(`/users?page=${page}&per_page=10`);
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = useCallback(async () => {
    try {
      setIsAllLoaded(false);
      setRefreshing(true);
      setPage(1);

      const res = await API.get<{ data: Array<User> }>('/users?page=1&per_page=10');
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const fetchMoreData = async () => {
    try {
      setLoadMore(true);

      const res = await API.get<{ data: Array<User> }>(`/users?page=${page + 1}&per_page=10`);

      if (res.data.data.length === 0) {
        console.log('all loaded');
        setIsAllLoaded(true);
      }
      setUsers([...users, ...res.data.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadMore(false);
      setPage(page + 1);
    }
  };

  const handleMore = () => {
    if (isAllLoaded) return;
    fetchMoreData();
  };

  const setSelectedUser = async (selectedUser: User) => {
    await userContext?.setUser(selectedUser);
    navigation.goBack();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.MAIN} />;
  } else {
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
              }}
              onPress={() => bottomSheetRef.current?.close()}>
              {users.map(individual => (
                <Marker
                  key={individual.id.toString()}
                  coordinate={{
                    latitude: LATITUDE + (Math.random() - 0.5) * (LATITUDE_DELTA / 2),
                    longitude: LONGITUDE + (Math.random() - 0.5) * (LONGITUDE_DELTA / 2),
                  }}
                  onPress={() => {
                    setUser(individual);
                    bottomSheetRef.current?.snapToIndex(0);
                  }}>
                  <Image
                    source={require('../assets/marker.png')}
                    style={{ height: 30, width: 30 }}
                  />
                </Marker>
              ))}
            </MapView>
          </View>
        ) : (
          <FlatList
            data={users}
            showsVerticalScrollIndicator={false}
            onEndReached={handleMore}
            onEndReachedThreshold={0.1}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={refreshData}
                tintColor={Colors.MAIN}
              />
            }
            ListFooterComponent={() =>
              isLoadMore && <ActivityIndicator size="small" color={Colors.MAIN} />
            }
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.cardContainer} onPress={() => setSelectedUser(item)}>
                <Image source={{ uri: item.avatar }} style={styles.image} />
                <View style={{ marginLeft: 20 }}>
                  <Text style={styles.name}>{`${item.first_name} ${item.last_name}`}</Text>
                  <Text style={styles.email}>{`${item.email}`}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}

        <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} detached={true}>
          <View style={[styles.bottomSheetContainer, { marginBottom: insets.bottom }]}>
            <Image
              source={{ uri: user?.avatar }}
              style={{ height: 100, aspectRatio: 1, borderRadius: 50 }}
            />
            <Text style={{ fontWeight: '400', fontSize: 18, marginTop: 10 }}>
              Firstname Lastname
            </Text>
            <RNTestButton
              label="Select"
              buttonStyle={{ marginTop: 20, marginBottom: 10 }}
              onPress={setSelectedUser}
            />
          </View>
        </BottomSheet>
      </View>
    );
  }
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
  bottomSheetContainer: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
