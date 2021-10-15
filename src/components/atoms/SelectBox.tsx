import React from 'react';
import styled from '@emotion/native';
import Icon from './Icon';
import { Colors } from '../../constants/colors';

interface Props {
  title: string;
  selectedValue: string;
  placeholder: string;
  onPress: () => void;
}

const SelectBox = ({ title, selectedValue, placeholder, onPress }: Props) => (
  <Container>
    <SelectboxTitle>{title}</SelectboxTitle>
    <InputWrapper onPress={onPress}>
      <SelectboxText>{selectedValue || placeholder}</SelectboxText>
      <Icon type={'caretDown'} />
    </InputWrapper>
  </Container>
);

export default SelectBox;

const Container = styled.View`
  width: 100%;
  height: 104px;
`;

const SelectboxTitle = styled.Text`
  font-weight: 400;
  font-size: 16px;
  color: #1d1d1d;
`;

const InputWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: #e8e8e8;
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
`;

const SelectboxText = styled.Text`
  font-size: 16px;
  font-family: 'Pretendard-Regular';
  font-weight: 400;
  color: ${Colors.gray300};
`;
