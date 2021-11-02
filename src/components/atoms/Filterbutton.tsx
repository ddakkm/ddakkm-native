import React from 'react';
import styled from '@emotion/native';
import Icon, { AssetIconType } from './Icon';

interface Props {
  title: string;
  handleFilterPress: () => void;
  iconType: AssetIconType;
}

const Filterbutton = ({ title, handleFilterPress, iconType }: Props) => {
  return (
    <FilterButtonContainer onPress={handleFilterPress}>
      <FilterButtonText>{title}</FilterButtonText>
      <FilterButtonIcon type={iconType} />
    </FilterButtonContainer>
  );
};

export default Filterbutton;

export const FilterButtonContainer = styled.TouchableOpacity`
  border-width: 1px;
  border-color: #dfdfdf;
  height: 28px;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  flex-direction: row;
  padding-left: 12px;
  padding-right: 5px;
  margin-top: 16px;
  margin-right: 8px;
`;

const FilterButtonText = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #232b3a;
`;

const FilterButtonIcon = styled(Icon)``;
