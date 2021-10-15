import React from 'react';
import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SurveyForm from '../components/templates/SurveyForm';

const Survey = () => {
  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Wrapper>
          <SurveyForm />
        </Wrapper>
      </SafeAreaView>
    </Container>
  );
};

export default Survey;

const Container = styled.View`
  flex: 1;
  padding: 0px 24px;
  background-color: #fff;
`;

const Wrapper = styled.View`
  flex: 1;
`;
