import React, { useState } from 'react';
import styled from '@emotion/native';
import { SafeAreaView } from 'react-native';
import {NativeModules} from 'react-native';
import Button from '../components/atoms/Button';

const {RNKakaoLogins} = NativeModules;

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
  const [result, setResult] = useState<string>('');

  const signInWithKakao = async (): Promise<void> => {
    const token: any = await login();

    setResult(JSON.stringify(token));
  };

  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

    setResult(message);
  };

  const getProfile = async (): Promise<void> => {
    const profile = await getKakaoProfile();

    setResult(JSON.stringify(profile));
  };


  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();

    setResult(message);
  };

  return (
    <Container>
      <SafeAreaView style={{backgroundColor: '#fff'}} />
      <Text>Login Screen</Text>
      <Text>{result}</Text>
      <Button
        theme={'primary'}
        title={'kakao login'}
        onPress={() => signInWithKakao()}
      />
      <Button 
        theme={'primary'}
        title={'kakao profile'}
        onPress={() => getProfile()}
      />
      <Button 
        theme={'primary'}
        title={'kakao logout'}
        onPress={() => signOutWithKakao()}
      />
      <Button
        theme={'primary'}
        title={'unlink'}
        onPress={() => unlinkKakao()}
      />
    </Container>
  );
};

export default Login;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Text = styled.Text``
