import React from 'react';
import { StyleSheet } from 'react-native';
import styled from '@emotion/native';
import Icon from '../atoms/Icon';
import Modal from 'react-native-modal';
import Button from '../atoms/Button';
import SelectBox from '../atoms/SelectBox';
import Buttonbox from '../atoms/Buttonbox';

interface Props {
  onBack: () => void;
}

const BasicInfoForm = ({ onBack }: Props) => {
  return (
    <>
      <Header>
        <Icon type={'leftArrow'} onPress={onBack} />
        <HeaderText>기본 입력 정보</HeaderText>
        <Space />
      </Header>
      <Wrapper>
        <SelectBox
          title={'접종회차'}
          placeholder={'접종회차를 선택해주세요'}
          selectedValue={''}
          onPress={() => {}}
        />
        <SelectBox
          title={'백신종류'}
          placeholder={'백신종류를 선택해주세요'}
          selectedValue={''}
          onPress={() => {}}
        />
        <Buttonbox title={'교차접종'} value={'y'} handlePress={() => {}} />
        <Buttonbox title={'임신'} value={'n'} handlePress={() => {}} />
        <Buttonbox title={'기저질환'} value={'y'} handlePress={() => {}} />
        <SelectBox
          title={'백신 접종일로부터'}
          placeholder={'백신 맞고 지난 일 수를 선택해주세요'}
          selectedValue={''}
          onPress={() => {}}
        />
      </Wrapper>
      <Footer>
        <Button theme={'primary'} title={'동의 완료 했어요'} />
      </Footer>
      {/* <Modal isVisible={true} style={styles.modalStyle}>
        <ModalWrapper>
          <HeaderText>hello</HeaderText>
        </ModalWrapper>
      </Modal> */}
    </>
  );
};

export default BasicInfoForm;

const styles = StyleSheet.create({
  modalStyle: {
    width: '100%',
    justifyContent: 'flex-end',
    margin: 0,
  },
});

const Header = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderText = styled.Text`
  font-weight: 600;
  font-size: 18px;
`;

const Wrapper = styled.ScrollView`
  flex: 1;
`;

const Space = styled.View`
  width: 24px;
  height: 24px;
`;

const Footer = styled.View`
  width: 100%;
  height: 112px;
  padding-top: 24px;
`;

const ModalWrapper = styled.View`
  width: 100%;
  padding: 100px;
  background-color: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
