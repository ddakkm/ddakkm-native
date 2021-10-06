import React from 'react';
import styled from '@emotion/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SurveyForm from '../components/templates/SurveyForm';

const Home = () => {
  return (
    <Container>
      <SafeAreaView style={{backgroundColor: '#fff'}} />
      <Wrapper>
        <SurveyForm />
      </Wrapper>
    </Container>
  );
};

export default Home;

const Container = styled.View`
  flex: 1;
  padding: 0px 24px;
  background-color: #fff;
`;

const Wrapper = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

const CustomInput = styled.TextInput`
  width: 100%;
  line-height: 22px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  height: 56px;
  font-weight: 400;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
