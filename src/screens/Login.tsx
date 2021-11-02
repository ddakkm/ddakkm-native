import React, { useState } from 'react';
import styled from '@emotion/native';
import { Alert, Platform, SafeAreaView } from 'react-native';
import { NativeModules } from 'react-native';
import Button from '../components/atoms/Button';
import {
  NaverLogin,
  getProfile as getNaverProfile,
} from '@react-native-seoul/naver-login';
import Icon from '../components/atoms/Icon';
import { authApi } from '../api/auth';

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

const login = async (): Promise<any> => {
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

  const signInWithNaver = async () => {
    if (is_loading.current) {
      return;
    }
    try {
      is_loading.current = true;
      const token: any = await naverLogin(initials);
      const { data } = await authApi.login('NAVER', token.accessToken);
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      is_loading.current = false;
    }
  };

  const signInWithKakao = async (): Promise<void> => {
    if (is_loading.current) {
      return;
    }
    try {
      is_loading.current = true;
      const token: any = await login();
      const { data } = await authApi.login('KAKAO', token.accessToken);

      console.log(data);
    } catch (e) {
      console.log(e);
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
        <Title>여러분의</Title>
        <Title>백신후기를 공유해주세요.</Title>
        <ButtonWrapper>
          <StyledKakaoBtn onPress={signInWithKakao}>
            <Icon type={'kakao'} style={{ marginRight: 16 }} />
            <BtnText>카카오톡으로 후기 작성하기</BtnText>
          </StyledKakaoBtn>
          <StyledNaverBtn onPress={signInWithNaver}>
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

const Title = styled.Text`
  font-weight: 600;
  font-size: 28px;
  line-height: 36px;
`;

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
