import React from 'react';
import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignupForm from '../components/templates/SignupForm';

const SignUp = () => {
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
