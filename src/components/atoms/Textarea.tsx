import React from 'react';
import styled from '@emotion/native';

import { TextInputProps } from 'react-native';

interface Props extends TextInputProps {}

const Textarea = ({ ...rest }: Props) => <Input {...rest} />;

export default Textarea;

const Input = styled.TextInput`
  font-size: 16px;
  font-family: 'Pretendard-Regular';
  color: #555;
  font-weight: 400;
  width: 100%;
  height: 60px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
`;
