import React from 'react';
import styled from '@emotion/native';
import { ActivityIndicator } from 'react-native';

const Loading = () => (
  <Container>
    <ActivityIndicator size="large" color="#53a7ff" />
  </Container>
);

export default Loading;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
