import {
  setCustomText,
  setCustomTextInput,
  setCustomTouchableOpacity,
} from 'react-native-global-props';

export const setGlobalProps = () => {
  const defaultFontStyle = {
    fontFamily: 'Pretendard-Regular',
    fontWeight: '700',
  } as const;

  setCustomText({ style: defaultFontStyle });
  setCustomTextInput({ style: defaultFontStyle });
  setCustomTouchableOpacity({ activeOpacity: 0.6 });
};
