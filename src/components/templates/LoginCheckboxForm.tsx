import React, { useState } from 'react';
import styled from '@emotion/native';
import Icon from '../atoms/Icon';
import { TouchableOpacityProps } from 'react-native';
import Button from '../atoms/Button';
import LoginImage from '../../assets/images/login.png';
import { useAppNav } from '../../hooks/useNav';
interface Props {
  onNext: () => void;
}

const LoginCheckboxForm = ({ onNext }: Props) => {
  const [is_all_check, setIsAllCheck] = useState(false);
  const [active, isActive] = React.useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const { navigate } = useAppNav();

  const handleAllCheck = () => {
    setIsAllCheck(!is_all_check);
    isActive({
      one: !is_all_check,
      two: !is_all_check,
      three: !is_all_check,
      four: !is_all_check,
    });
  };

  return (
    <Container>
      <Wrapper>
        <Top03>백신후기를 공유해주세요</Top03>
        <Top05>여러분은 어떠셨나요?</Top05>
        <StyledImage source={LoginImage} />
        <CheckBoxWrapper>
          <AllCheckBtn active={is_all_check} onPress={handleAllCheck}>
            <Icon type={is_all_check ? 'check' : 'unCheck'} />
            <BtnText active={is_all_check}>모두 동의합니다</BtnText>
          </AllCheckBtn>
          <CheckboxButton
            title={'서비스 이용 약관 동의'}
            active={active.one}
            goToPage={() => {
              navigate('/terms', { type: '서비스 이용 약관 동의' });
            }}
            onPress={() => isActive({ ...active, one: !active.one })}
          />
          <CheckboxButton
            title={'개인정보 수집 및 이용동의'}
            active={active.two}
            goToPage={() => {
              navigate('/terms', { type: '개인정보 수집 및 이용동의' });
            }}
            onPress={() => isActive({ ...active, two: !active.two })}
          />
          <CheckboxButton
            title={'개인 민감정보 처리 방침 동의'}
            active={active.three}
            goToPage={() => {
              navigate('/terms', { type: '개인 민감정보 처리 방침 동의' });
            }}
            onPress={() => isActive({ ...active, three: !active.three })}
          />
          <CheckboxButton
            title={'만 14세 이상 동의'}
            active={active.four}
            onPress={() => isActive({ ...active, four: !active.four })}
          />
        </CheckBoxWrapper>
        <Button
          title={'시작하기'}
          theme={
            Object.values(active).filter(value => value === false).length === 0
              ? 'primary'
              : 'disabled'
          }
          disabled={
            !Object.values(active).filter(value => value === false).length === 0
          }
          onPress={onNext}
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
    {goToPage && (
      <Icon
        btnStyle={{ position: 'absolute', right: 16 }}
        type={'rightArrow'}
        onPress={goToPage}
      />
    )}
  </CheckboxBtn>
);

const Container = styled.View`
  flex: 1;
`;
const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
`;

const StyledImage = styled.Image`
  margin-bottom: 8px;
`;

const Top03 = styled.Text`
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
`;

const Top05 = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #afafaf;
  margin: 8px 0 32px 0;
`;

const CheckBoxWrapper = styled.View`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 24px;
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
  position: relative;
  width: 100%;
  height: 24px;
  margin-top: 16px;
  flex-direction: row;
  align-items: center;
`;
