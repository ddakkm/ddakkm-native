import React from 'react';
import styled from '@emotion/native';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import Icon from './Icon';
import { generateID } from '../../hooks/useId';

interface Props {
  isVisible: boolean;
  handleVisible: (visible: boolean) => void;
  title?: string;
  options: { label: string; sub_label?: string; handlePress: () => void }[];
}

function FixedBottomMenuModal({
  isVisible,
  handleVisible,
  title,
  options = [],
}: Props) {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalStyle}
      animationOutTiming={100}
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
          {options.map(({ label, sub_label, handlePress }) => (
            <ModalItemWrapper key={generateID()} onPress={handlePress}>
              <ModalItemTitle>{label}</ModalItemTitle>
              {sub_label && <ModalItemSubTitle>{sub_label}</ModalItemSubTitle>}
            </ModalItemWrapper>
          ))}
        </ModalBody>
      </ModalWrapper>
    </Modal>
  );
}

export default FixedBottomMenuModal;

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
`;

const ModalItemTitle = styled.Text`
  font-weight: 400;
  font-size: 16px;
  color: #555555;
`;

const ModalItemSubTitle = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #555;
  text-align: center;
  margin-top: 4px;
`;

const ModalItemWrapper = styled.TouchableOpacity`
  width: 100%;
  min-height: 60px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-top-color: #e8e8e8;
`;
