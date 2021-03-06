import React, { useState } from 'react';
import styled from '@emotion/native';
import SelectBox from '../atoms/SelectBox';
import Buttonbox from '../atoms/Buttonbox';
import Button from '../atoms/Button';
import SelectModalTemplate from '../atoms/SelectModalTemplate';

interface Props {
  handleSignUp: (gender: 'MALE' | 'FEMALE', age: number) => void;
}

const options = Array(50)
  .fill(0)
  .map((_, index) => ({
    label: 2010 - index + '',
    value: 2010 - index,
  }));

const UserBasicInfoForm = ({ handleSignUp }: Props) => {
  const [selected_year, setSelectedYear] = useState<any>();
  const [is_show_modal, setIsShowModal] = useState(false);
  const [selected_sex, setSelectedSex] = useState<boolean | null>(null);

  return (
    <Container>
      <Header>
        <HeaderTitle>회원가입</HeaderTitle>
      </Header>
      <SelectBox
        title={'출생연도'}
        selectedValue={selected_year}
        onPress={() => {
          setIsShowModal(true);
        }}
        placeholder={'출생년도를 선택해주세요'}
      />
      <Buttonbox
        title={'성별'}
        value={selected_sex}
        handlePress={value => {
          setSelectedSex(value);
        }}
        leftBtnText={'남자'}
        rightBtnText={'여자'}
      />
      <StyeldFixedFooter>
        <Button
          title={'입력 완료했어요'}
          theme={
            selected_sex !== null && selected_year ? 'primary' : 'disabled'
          }
          disabled={!(selected_sex !== null && selected_year)}
          onPress={() =>
            handleSignUp(selected_sex ? 'FEMALE' : 'MALE', selected_year)
          }
        />
      </StyeldFixedFooter>
      <SelectModalTemplate
        title={'년도 선택'}
        isVisible={is_show_modal}
        handleVisible={setIsShowModal}
        options={options}
        selectOption={setSelectedYear}
      />
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

const StyeldFixedFooter = styled.View`
  width: 100%;
  position: absolute;
  bottom: 24px;
`;
