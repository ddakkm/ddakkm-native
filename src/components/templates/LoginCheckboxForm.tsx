import React from 'react';
import styled from '@emotion/native';
import Icon from '../atoms/Icon';
import { TouchableOpacityProps } from 'react-native';
import Button from '../atoms/Button';

const LoginCheckboxForm = () => {
  const [active, isActive] = React.useState(false);
  return (
    <Container>
      <Wrapper>
        <Title>여러분의</Title>
        <Title>백신후기를 공유해주세요.</Title>
        <CheckBoxWrapper>
          <AllCheckBtn active={active} onPress={() => isActive(prev => !prev)}>
            <Icon type={active ? 'check' : 'unCheck'} />
            <BtnText active={active}>모두 동의합니다</BtnText>
          </AllCheckBtn>
          <CheckboxButton
            title={'서비스 이용 약관 동의'}
            active={active}
            onPress={() => isActive(prev => !prev)}
          />
          <CheckboxButton
            title={'개인정보 수집 및 이용동의'}
            active={active}
            onPress={() => isActive(prev => !prev)}
          />
          <CheckboxButton
            title={'개인 민감정보 처리 방침 동의'}
            active={active}
            onPress={() => isActive(prev => !prev)}
          />
          <CheckboxButton
            title={'14세이상 가입자 동의 순서'}
            active={active}
            onPress={() => isActive(prev => !prev)}
          />
        </CheckBoxWrapper>
        <Button
          title={'시작하기'}
          theme={active ? 'primary' : 'disabled'}
          disabled={!active}
        />
      </Wrapper>
    </Container>
  );
};

export default LoginCheckboxForm;

const CheckboxButton = ({
  title,
  active,
  goToPage,
  ...props
}: {
  title: string;
  active: boolean;
  goToPage?: () => void;
} & TouchableOpacityProps) => (
  <CheckboxBtn {...props}>
    <Icon type={active ? 'check' : 'unCheck'} />
    <BtnText style={{ color: '#53A7FF' }}>[필수]</BtnText>
    <BtnText style={{ marginLeft: 5 }}>{title}</BtnText>
    <Icon
      style={{ position: 'absolute', right: 16 }}
      type={'rightArrow'}
      onPress={goToPage}
    />
  </CheckboxBtn>
);

const Container = styled.View`
  flex: 1;
`;
const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 28px;
  line-height: 36px;
`;

const CheckBoxWrapper = styled.View`
  width: 100%;
  margin-top: 26px;
  margin-bottom: 40px;
`;

const AllCheckBtn = styled.TouchableOpacity<{ active: boolean }>`
  width: 100%;
  height: 56px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ active }) => (active ? '#53A7FF' : '#e8e8e8')};
  background-color: ${({ active }) => (active ? '#EDF6FE' : '#fff')};
  padding: 16px;
  flex-direction: row;
  align-items: center;
`;

const BtnText = styled.Text<{ active?: boolean }>`
  color: ${({ active }) => (active ? '#53A7FF' : '#555555')};
  font-weight: ${({ active }) => (active ? '700' : '400')};
  font-size: 16px;
  line-height: 24px;
  margin-left: 10px;
`;

const CheckboxBtn = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  flex-direction: row;
  align-items: center;
`;
