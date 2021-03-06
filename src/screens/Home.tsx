import React from 'react';
import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainForm from '../components/templates/MainForm';

const Home = () => {
  return (
    <Container>
      <SafeAreaView style={{ backgroundColor: '#fff' }} />
      <Wrapper>
        <MainForm />
      </Wrapper>
    </Container>
  );
};

export default Home;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Wrapper = styled.View`
  flex: 1;
`;
