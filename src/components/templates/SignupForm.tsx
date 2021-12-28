import React, { Fragment, useState } from 'react';
import styled from '@emotion/native';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import LoginCheckboxForm from './LoginCheckboxForm';
import UserBasicInfoForm from './UserBasicInfoForm';
import { useAppNav, useAppRoute } from '../../hooks/useNav';
import { CommonActions } from '@react-navigation/native';
import { authApi } from '../../api/auth';
import { storeTokens } from '../../contexts/auth/storage';
import { useIsLoggedIn } from '../../contexts/auth';

const SignupForm = () => {
  const is_loading = React.useRef<boolean>(false);
  const [step, setStep] = useState(0);
  const { setIsLoggedIn, setIsSurvey, setNickname } = useIsLoggedIn();
  const { dispatch } = useAppNav();
  const {
    params: { access_token, sns_provider },
  } = useAppRoute<'/signUp'>();

  const handleSignUp = async (gender: 'MALE' | 'FEMALE', age: number) => {
    if (is_loading.current) {
      return;
    }
    try {
      is_loading.current = true;
      const fcm_token = await messaging().getToken();
      const { data } = await authApi.signUp(
        sns_provider,
        access_token,
        gender,
        age,
        fcm_token,
      );

      if (data.access_token) {
        await storeTokens({ accessToken: data.access_token });
        setIsLoggedIn(true);
        setIsSurvey(data.done_survey);
        setNickname(data.nickname);
      }
    } catch (e) {
      console.log(e);
    } finally {
      is_loading.current = false;
    }
    dispatch(_ => {
      return CommonActions.reset({
        index: 1,
        routes: [
          { name: '/' },
          { name: '/survey', params: { surveyType: 'JOIN' } },
        ],
      });
    });
  };

  const onNext = () => {
    if (signUpComponents.length - 1 === step) {
      return;
    }
    setStep(1);
  };

  const signUpComponents = [
    <LoginCheckboxForm onNext={onNext} />,
    <UserBasicInfoForm handleSignUp={handleSignUp} />,
  ];

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Wrapper>
          {signUpComponents.map((component, index) => {
            if (index === step) {
              return <Fragment key={index}>{component}</Fragment>;
            }

            return null;
          })}
        </Wrapper>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default SignupForm;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Wrapper = styled.View`
  flex: 1;
`;
