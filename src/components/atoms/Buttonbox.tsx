import React from 'react';
import styled from '@emotion/native';

interface Props {
  title: string;
  value: boolean | null;
  handlePress: (value: boolean) => void;
  leftBtnText?: string;
  rightBtnText?: string;
}

const Buttonbox = ({
  title,
  value,
  handlePress,
  leftBtnText,
  rightBtnText,
}: Props) => (
  <Container>
    <ButtonboxTitle>{title}</ButtonboxTitle>
    <ButtonGroup>
      <Button onPress={() => handlePress(false)} active={value === false}>
        <ButtonText active={value === false}>
          {leftBtnText ? leftBtnText : '아니오'}
        </ButtonText>
      </Button>
      <Button onPress={() => handlePress(true)} active={value === true}>
        <ButtonText active={value === true}>
          {rightBtnText ? rightBtnText : '예'}
        </ButtonText>
      </Button>
    </ButtonGroup>
  </Container>
);

export default Buttonbox;

const Container = styled.View`
  width: 100%;
  height: 106px;
`;

const ButtonboxTitle = styled.Text`
  font-weight: 400;
  font-size: 16px;
  color: #1d1d1d;
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

const Button = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  height: 56px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ active }) => (active ? '#53A7FF' : '#e8e8e8')};
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  background-color: ${({ active }) => (active ? '#EDF6FE' : '#FFF')};
`;

const ButtonText = styled.Text<{ active: boolean }>`
  font-size: 16px;
  font-weight: 400;
  color: ${({ active }) => (active ? '#1d1d1d' : '#555')};
`;
