import { TouchableOpacityProps, TextInputProps, StyleProp, ViewStyle } from 'react-native';

export interface RNTestButtonProps extends TouchableOpacityProps {
  testID?: string;
  isLoading?: boolean;
  label?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export interface RNTestTextInputProps extends TextInputProps {
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
}
