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
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: rgba(19, 19, 19, 0.7);
`;
