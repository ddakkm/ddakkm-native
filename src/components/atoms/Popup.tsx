import React from 'react';
import styled from '@emotion/native';

import Modal from 'react-native-modal';
import Button from './Button';

interface Props {
  isVisible: boolean;
  handleVisible: (visible: boolean) => void;
  title: string;
  sub_title?: string;
  onOk?: () => void;
  onClose?: () => void;
  ok_text?: string;
  close_text?: string;
}

const Popup: React.FC<Props> = ({
  isVisible,
  handleVisible,
  title,
  sub_title,
  onClose,
  onOk,
  ok_text,
  close_text,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationOutTiming={0}
      onBackButtonPress={() => handleVisible(false)}
      onBackdropPress={() => handleVisible(false)}>
      <StyledContainer>
        <Top03>{title}</Top03>
        <Top05>{sub_title}</Top05>
        <ButtonWrapper>
          {onClose && (
            <Button
              style={{ flex: 1, marginRight: 8 }}
              title={close_text}
              onPress={onClose}
              theme={'disabled'}
            />
          )}
          {onOk && (
            <Button
              style={{ flex: 1 }}
              title={ok_text}
              onPress={onOk}
              theme={'primary'}
            />
          )}
          {!onOk && !onClose && (
            <Button
              title={ok_text}
              onPress={() => handleVisible(false)}
              theme={'primary'}
            />
          )}
        </ButtonWrapper>
      </StyledContainer>
    </Modal>
  );
};

export default Popup;

const StyledContainer = styled.View`
  width: 100%;
  padding: 32px 24px;
  min-height: 162px;
  background-color: #fff;
  border-radius: 8px;
`;

const Top03 = styled.Text`
  font-weight: 700;
  font-size: 18px;
  height: 26px;
  line-height: 26px;
  color: #1d1d1d;
  text-align: center;
`;

const Top05 = styled.Text`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #555;
  text-align: center;
`;

const ButtonWrapper = styled.View`
  margin-top: 24px;
  flex-direction: row;
  width: 100%;
`;
