import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackNavigatorParams = {
  Login: undefined;
  Home: undefined;
  Users: undefined;
  Webview: undefined;
  Map: undefined;
};

export type LoginProps = NativeStackScreenProps<RootStackNavigatorParams, 'Login'>;
export type HomeProps = NativeStackScreenProps<RootStackNavigatorParams, 'Home'>;
export type UsersProps = NativeStackScreenProps<RootStackNavigatorParams, 'Users'>;
export type WebviewProps = NativeStackScreenProps<RootStackNavigatorParams, 'Webview'>;
export type MapProps = NativeStackScreenProps<RootStackNavigatorParams, 'Map'>;
