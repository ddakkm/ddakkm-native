import React from 'react';
import styled from '@emotion/native';
import {TouchableOpacityProps} from 'react-native';

interface Props extends TouchableOpacityProps {
  title?: string;
  theme?: string;
}

const Button: React.FC<Props> = ({title, theme, ...props}) => (
  <Touchable theme={theme} {...props}>
    <Title>{title}</Title>
  </Touchable>
);

export default Button;

const Touchable = styled.TouchableOpacity<{theme?: string}>`
  width: 100%;
  height: 56px;
  border-radius: 8px;
  background-color: ${({theme}) => (theme === 'primary' ? '#53A7FF' : '#fff')};
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: #fff;
`;
