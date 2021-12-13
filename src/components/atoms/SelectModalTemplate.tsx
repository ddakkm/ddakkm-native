import React, { useState } from 'react';
import styled from '@emotion/native';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import Icon from './Icon';
import Button from './Button';

interface Props<T> {
  isVisible: boolean;
  handleVisible: (visible: boolean) => void;
  title: string;
  options: { label: string; value: T }[];
  selectOption: (value: T) => void;
}

function SelectModalTemplate<T>({
  isVisible,
  handleVisible,
  title,
  options = [],
  selectOption,
}: Props<T>) {
  const [selected_value, setSelectedValue] = useState<any>();

  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalStyle}
      onBackButtonPress={() => handleVisible(false)}
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
              selected={value === selected_value}
              onPress={() => {
                setSelectedValue(value);
              }}>
              <ModalItemTitle selected={value === selected_value}>
                {label}
              </ModalItemTitle>
            </ModalItemWrapper>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button
            title="확인"
            theme={'primary'}
            onPress={() => {
              selectOption(selected_value);
              handleVisible(false);
            }}
          />
        </ModalFooter>
      </ModalWrapper>
    </Modal>
  );
}

export default SelectModalTemplate;

const ModalWrapper = styled.View`
  width: 100%;
  background-color: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding-bottom: 32px;
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

const ModalBody = styled.ScrollView`
  width: 100%;
  height: 285px;
`;

const ModalItemTitle = styled.Text<{ selected: boolean }>`
  font-weight: ${({ selected }) => (selected ? '700' : '400')};
  font-size: 16px;
  color: ${({ selected }) => (selected ? '#53A7FF' : '#555')};
`;

const ModalItemWrapper = styled.TouchableOpacity<{ selected: boolean }>`
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-top-color: #e8e8e8;
  background-color: ${({ selected }) => (selected ? '#f7f7f7' : '#fff')};
`;

const ModalFooter = styled.View`
  padding: 24px;
`;
