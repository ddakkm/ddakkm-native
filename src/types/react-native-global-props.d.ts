declare module 'react-native-global-props' {
  import {TextInputProps, TextProps, TouchableOpacityProps} from 'react-native';

  function setCustomText(props: TextProps): void;
  function setCustomTextInput(props: TextInputProps): void;
  function setCustomTouchableOpacity(props: TouchableOpacityProps): void;
}
