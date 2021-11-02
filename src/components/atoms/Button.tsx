import React from 'react';
import styled from '@emotion/native';
import { TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  title?: string;
  theme?: 'primary' | 'disabled';
}

const Button: React.FC<Props> = ({ title, theme, ...props }) => (
  <Touchable theme={theme} {...props}>
    <Title theme={theme}>{title}</Title>
  </Touchable>
);

export default Button;

const Touchable = styled.TouchableOpacity<{ theme?: 'primary' | 'disabled' }>`
  width: 100%;
  height: 56px;
  border-radius: 8px;
  background-color: ${({ theme }) =>
    theme === 'primary' ? '#53A7FF' : '#E8E8E8'};
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text<{ theme?: 'primary' | 'disabled' }>`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: ${({ theme }) => (theme === 'primary' ? '#fff' : '#AFAFAF')}; ;
`;
