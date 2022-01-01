import React, { useEffect } from 'react';
import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignupForm from '../components/templates/SignupForm';
import { firebase } from '@react-native-firebase/analytics';

const SignUp = () => {
  useEffect(() => {
    firebase.analytics().logScreenView({
      screen_name: '회원가입 페이지',
    });
  }, []);
  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Wrapper>
          <SignupForm />
        </Wrapper>
      </SafeAreaView>
    </Container>
  );
};

export default SignUp;

const Container = styled.View`
  flex: 1;
  padding: 0px 24px;
  background-color: #fff;
`;

const Wrapper = styled.View`
  flex: 1;
`;
