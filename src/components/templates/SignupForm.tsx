import React, { Fragment, useState } from 'react';
import styled from '@emotion/native';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import LoginCheckboxForm from './LoginCheckboxForm';
import UserBasicInfoForm from './UserBasicInfoForm';

const SignupForm = () => {
  const [step, setStep] = useState(1);

  const signUpComponents = [<LoginCheckboxForm />, <UserBasicInfoForm />];

  const onNext = () => {
    if (signUpComponents.length - 1 === step) {
      return;
    }
    setStep(prevStep => prevStep + 1);
  };
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
