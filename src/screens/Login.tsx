import React, { useState } from 'react';
import styled from '@emotion/native';
import { Platform, SafeAreaView } from 'react-native';
import { NativeModules } from 'react-native';
import {
  NaverLogin,
  getProfile as getNaverProfile,
} from '@react-native-seoul/naver-login';
import Icon from '../components/atoms/Icon';
import { authApi } from '../api/auth';
import { useAppNav } from '../hooks/useNav';
import { storeTokens } from '../contexts/auth/storage';
import LoginImage from '../assets/images/login.png';
import { useIsLoggedIn } from '../contexts/auth';

const iosKeys = {
  kConsumerKey: 'nFv0sp8OBRZiQG0AzYCB',
  kConsumerSecret: 'htT0bOwtI9',
  kServiceAppName: '테스트앱(iOS)',
  kServiceAppUrlScheme: 'ddakkmnaverlogin', // only for iOS
};

const androidKeys = {
  kConsumerKey: 'nFv0sp8OBRZiQG0AzYCB',
  kConsumerSecret: 'htT0bOwtI9',
  kServiceAppName: '테스트앱(안드로이드)',
};

const initials = Platform.OS === 'ios' ? iosKeys : androidKeys;

const { RNKakaoLogins } = NativeModules;

const kakaoLogin = async (): Promise<any> => {
  try {
    const result = await RNKakaoLogins.login();

    return result;
  } catch (err) {
    throw err;
  }
};

export const loginWithKakaoAccount = async (): Promise<KakaoOAuthToken> => {
  try {
    const result: KakaoOAuthToken = await RNKakaoLogins.loginWithKakaoAccount();

    return result;
  } catch (err) {
    throw err;
  }
};

export const logout = async (): Promise<string> => {
  try {
    const result: string = await RNKakaoLogins.logout();

    return result;
  } catch (err) {
    throw err;
  }
};

export const unlink = async (): Promise<string> => {
  try {
    const result: string = await RNKakaoLogins.unlink();

    return result;
  } catch (err) {
    throw err;
  }
};

export const getKakaoProfile = async (): Promise<KakaoProfile> => {
  try {
    const result: KakaoProfile = await RNKakaoLogins.getProfile();

    return result;
  } catch (err) {
    throw err;
  }
};

export const getAccessToken = async (): Promise<KakaoAccessTokenInfo> => {
  try {
    const result: KakaoAccessTokenInfo = await RNKakaoLogins.getAccessToken();

    return result;
  } catch (err) {
    throw err;
  }
};

const Login = () => {
  const is_loading = React.useRef<boolean>(false);
  const { navigate } = useAppNav();
  const { setIsLoggedIn, setIsSurvey, setNickname } = useIsLoggedIn();
  const naverLogin = (props: any) => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    });
  };

  const handlesignIn = async (sns_provider: 'KAKAO' | 'NAVER') => {
    if (is_loading.current) {
      return;
    }
    try {
      is_loading.current = true;
      const token: any =
        sns_provider === 'NAVER'
          ? await naverLogin(initials)
          : await kakaoLogin();
      const {
        data: { access_token, is_user, done_survey, nickname },
      } = await authApi.login(sns_provider, token.accessToken);

      if (!is_user) {
        navigate('/signUp', { access_token: token.accessToken, sns_provider });
      } else {
        await storeTokens({ accessToken: access_token });
        setIsLoggedIn(true);
        setIsSurvey(done_survey);
        setNickname(nickname);
        navigate('/');
      }
    } catch (e) {
      console.log(e);
      navigate('/');
    } finally {
      is_loading.current = false;
    }
  };

  // const naverLogout = () => {
  //   NaverLogin.logout();
  //   setNaverToken('');
  // };

  // const getUserProfile = async () => {
  //   const profileResult = await getNaverProfile(naverToken.accessToken);
  //   if (profileResult.resultcode === '024') {
  //     Alert.alert('로그인 실패', profileResult.message);
  //     return;
  //   }
  //   console.log(profileResult);
  // };

  // const signOutWithKakao = async (): Promise<void> => {
  //   const message = await logout();

  //   setResult(message);
  // };

  // const getProfile = async (): Promise<void> => {
  //   const profile = await getKakaoProfile();

  //   setResult(JSON.stringify(profile));
  // };

  // const unlinkKakao = async (): Promise<void> => {
  //   const message = await unlink();

  //   setResult(message);
  // };

  return (
    <Container>
      <SafeAreaView style={{ backgroundColor: '#fff' }} />
      <Wrapper>
        <Top03>백신후기를 공유해주세요</Top03>
        <Top05>여러분은 어떠셨나요?</Top05>
        <StyledImage source={LoginImage} />
        <ButtonWrapper>
          <StyledKakaoBtn onPress={() => handlesignIn('KAKAO')}>
            <Icon type={'kakao'} style={{ marginRight: 16 }} />
            <BtnText>카카오톡으로 후기 작성하기</BtnText>
          </StyledKakaoBtn>
          <StyledNaverBtn onPress={() => handlesignIn('NAVER')}>
            <Icon type={'naver'} style={{ marginRight: 8 }} />
            <BtnText style={{ color: '#fff' }}>
              네이버으로 후기 작성하기
            </BtnText>
          </StyledNaverBtn>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
};

export default Login;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Top03 = styled.Text`
  font-weight: 600;
  font-size: 28px;
  line-height: 36px;
`;

const Top05 = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #afafaf;
  margin: 8px 0 32px 0;
`;

const StyledImage = styled.Image``;

const ButtonWrapper = styled.View`
  padding-horizontal: 24px;
  width: 100%;
  margin-top: 40px;
`;

const StyledKakaoBtn = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  background-color: #ffe613;
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
  padding: 16px;
`;

const StyledNaverBtn = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  background-color: #58bf38;
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
  padding: 16px 8px 16px 8px;
  margin-top: 8px;
`;

const BtnText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #3c1c1e;
`;
