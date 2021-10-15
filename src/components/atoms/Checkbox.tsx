import React from 'react';
import styled from '@emotion/native';
import { TouchableOpacityProps } from 'react-native';
import Icon, { AssetIconType } from './Icon';

interface Props extends TouchableOpacityProps {
  checked: boolean;
  title?: string;
  icon?: AssetIconType;
}

const Checkbox: React.FC<Props> = ({ checked, title, icon, ...props }) => (
  <Touchable checked={checked} {...props}>
    <Title>{title}</Title>
    {icon && <Icon type={icon} />}
  </Touchable>
);

export default Checkbox;

const Touchable = styled.TouchableOpacity<{ checked: boolean }>`
  width: 100%;
  height: 56px;
  border: 1px solid ${({ checked }) => (checked ? '#53A7FF' : '#e8e8e8')};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${({ checked }) => (checked ? '#EDF6FE' : 'transparent')};
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 400;
  color: #555555;
`;
