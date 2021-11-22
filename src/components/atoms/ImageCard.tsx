import React from 'react';
import styled from '@emotion/native';
import { ImageSourcePropType } from 'react-native';
import Icon from './Icon';

interface Props {
  source: ImageSourcePropType;
  handleRemoveImage: () => void;
}

const ImageCard = ({ source, handleRemoveImage }: Props) => (
  <StyledContainer>
    <IconWrapper>
      <Icon type="whiteClose" onPress={handleRemoveImage} />
    </IconWrapper>
    <StyledImage source={source} />
  </StyledContainer>
);

export default ImageCard;

const StyledContainer = styled.View`
  position: relative;
  margin-left: 10px;
`;

const StyledImage = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 8px;
`;

const IconWrapper = styled.View`
  border-radius: 100px;
  background-color: #555;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -8px;
  top: -8px;
  z-index: 100;
`;
