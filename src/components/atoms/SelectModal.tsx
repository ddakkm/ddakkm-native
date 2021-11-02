import React from 'react';
import styled from '@emotion/native';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import Icon from './Icon';

interface Props<T> {
  isVisible: boolean;
  handleVisible: (visible: boolean) => void;
  title: string;
  options: { label: string; value: T }[];
  selectOption: (value: T) => void;
}

function SelectModal<T>({
  isVisible,
  handleVisible,
  title,
  options = [],
  selectOption,
}: Props<T>) {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalStyle}
      onBackdropPress={() => handleVisible(false)}>
      <ModalWrapper>
        <ModalHeader>
          <HeaderTitle>{title}</HeaderTitle>
          <IconWrapper>
            <Icon type={'close'} onPress={() => handleVisible(false)} />
          </IconWrapper>
        </ModalHeader>
        <ModalBody>
          {options.map(({ label, value }, index) => (
            <ModalItemWrapper
              key={index}
              onPress={() => {
                selectOption(value);
                handleVisible(false);
              }}>
              <ModalItemTitle>{label}</ModalItemTitle>
            </ModalItemWrapper>
          ))}
        </ModalBody>
      </ModalWrapper>
    </Modal>
  );
}

export default SelectModal;

const ModalWrapper = styled.View`
  width: 100%;
  background-color: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const styles = StyleSheet.create({
  modalStyle: {
    width: '100%',
    justifyContent: 'flex-end',
    margin: 0,
  },
});

const IconWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
`;

const ModalHeader = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-weight: 700;
  font-size: 16px;
  color: #555;
`;

const ModalBody = styled.View`
  padding-bottom: 32px;
`;

const ModalItemWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-top-color: #e8e8e8;
`;

const ModalItemTitle = styled.Text`
  font-weight: 400;
  font-size: 16px;
  color: #555;
`;
