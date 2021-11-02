import React from 'react';
import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Keyword = () => {
  return (
    <Container>
      <SafeAreaView style={{ backgroundColor: '#fff' }} />
      <Wrapper></Wrapper>
    </Container>
  );
};

export default Keyword;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Wrapper = styled.View`
  flex: 1;
`;
