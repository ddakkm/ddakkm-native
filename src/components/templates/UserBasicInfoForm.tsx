import React from 'react';
import styled from '@emotion/native';
import SelectBox from '../atoms/SelectBox';
import Buttonbox from '../atoms/Buttonbox';
import Button from '../atoms/Button';

const UserBasicInfoForm = () => {
  return (
    <Container>
      <Header>
        <HeaderTitle>회원가입</HeaderTitle>
      </Header>
      <SelectBox
        title={'출생연도'}
        selectedValue={''}
        onPress={() => {}}
        placeholder={'출생년도를 선택해주세요'}
      />
      <Buttonbox
        title={'성별'}
        value={null}
        handlePress={() => {}}
        leftBtnText={'남자'}
        rightBtnText={'여자'}
      />
      <StyledFixedButton title={'입력 완료했어요'} theme={'disabled'} />
    </Container>
  );
};

export default UserBasicInfoForm;

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  width: 100%;
  height: 56px;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #f2f2f2;
  margin-bottom: 24px;
`;

const HeaderTitle = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: #1d1d1d;
`;

const StyledFixedButton = styled(Button)`
  position: absolute;
  bottom: 0;
`;
