import React from 'react';
import styled from '@emotion/native';
import { TextInputProps } from 'react-native';
import Textarea from './Textarea';

interface Props extends TextInputProps {
  handleSubmit: () => void;
}

const FixedBottomInput = ({ handleSubmit, ...rest }: Props) => (
  <FixedWrapper>
    <Textarea
      {...rest}
      style={{ borderWidth: 0, flex: 1, paddingTop: 16, paddingLeft: 16 }}
      multiline={true}
    />
    <InputBtn onPress={handleSubmit}>
      <BtnText isActive={!!rest.value}>등록</BtnText>
    </InputBtn>
  </FixedWrapper>
);

export default FixedBottomInput;

const FixedWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  min-height: 56px;
  border-top-width: 1px;
  border-top-color: #efefef;
`;

const InputBtn = styled.TouchableOpacity`
  right: 0;
  bottom: 0;
  padding: 16px 14px 16px 24px;
`;

const BtnText = styled.Text<{ isActive?: boolean }>`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${({ isActive }) => (isActive ? '#53A7FF' : '#afafaf')};
`;
