import React from 'react';
import styled from '@emotion/native';
import Empty from '../../assets/images/empty.png';

const NoReview = () => (
  <Container>
    <Wrapper>
      <StyledImage source={Empty} />
      <StyledText>아직 작성된 후기가 없어요ㅠㅠ</StyledText>
      <StyledText>직접 후기를 작성해주세요!</StyledText>
    </Wrapper>
  </Container>
);
export default NoReview;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 88px;
`;

const Wrapper = styled.View`
  align-items: center;
`;

const StyledImage = styled.Image`
  margin-bottom: 24px;
`;

const StyledText = styled.Text`
  text-align: center;
  width: 100%;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`;
