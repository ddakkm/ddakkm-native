import React from 'react';
import styled from '@emotion/native';

const Home = () => {
  return (
    <Container>
      <Text>Home</Text>
    </Container>
  );
};

export default Home;

const Container = styled.View`
  flex: 1;
  padding: 0px 43px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text``;
