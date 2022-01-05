import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from '@emotion/native';

import Icon from '../components/atoms/Icon';
import Button from '../components//atoms/Button';
import Textarea from '../components//atoms/Textarea';
import { userApi } from '../api/user';
import { useAppNav } from '../hooks/useNav';

const Feedback = () => {
  const is_loading = useRef(false);
  const [content, setContent] = useState('');
  const [is_visible, setIsVisible] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { goBack } = useAppNav();

  const handleSubmit = () => {
    if (is_loading.current) return;
    if (phone && !/010[^0][0-9]{2,3}[0-9]{3,4}/.test(phone)) {
      Alert.alert('휴대폰 번호를 확인 해주세요.');
      return;
    }

    if (
      email &&
      !/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
        email,
      )
    ) {
      Alert.alert('이메일 형식이 맞지 않습니다.');
      return;
    }

    try {
      is_loading.current = true;
      userApi.postQna(content, email, phone);
    } catch {
      /**  */
    } finally {
      is_loading.current = false;
      goBack();
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Header is_android={Platform.OS === 'android'}>
              <Icon
                type={'leftArrow'}
                onPress={() => {
                  goBack();
                }}
              />
              <HeaderText>피드백 남기기</HeaderText>
              <Space />
            </Header>
            <Wrapper>
              <BodyWrapper>
                <BodyTitle>피드백 입력</BodyTitle>
                <ReviewTextarea
                  value={content}
                  autoCorrect={false}
                  onChangeText={value => setContent(value)}
                  placeholder={'백신후기 서비스의 피드백을 남겨주세요'}
                  textAlignVertical={'top'}
                  placeholderTextColor={'#afafaf'}
                  multiline={true}
                />
              </BodyWrapper>
              <BodyWrapper>
                <BodyTitle>답변 받을 방식 (선택)</BodyTitle>
                <CheckboxWrapper
                  onPress={() => {
                    setPhone('');
                    setEmail('');
                    setIsVisible(true);
                  }}>
                  <Checkbox is_active={is_visible === true}>
                    {is_visible === true && <InnerCheckbox />}
                  </Checkbox>
                  <CheckboxText>이메일로 받기</CheckboxText>
                </CheckboxWrapper>
                {is_visible === true && (
                  <Textarea
                    value={email}
                    autoCorrect={false}
                    placeholder={'이메일을 입력해주세요.'}
                    onChangeText={value => setEmail(value)}
                    style={{ paddingHorizontal: 24 }}
                    placeholderTextColor={'#afafaf'}
                  />
                )}
                <CheckboxWrapper
                  onPress={() => {
                    setPhone('');
                    setEmail('');
                    setIsVisible(false);
                  }}>
                  <Checkbox is_active={is_visible === false}>
                    {is_visible === false && <InnerCheckbox />}
                  </Checkbox>
                  <CheckboxText>번호로 받기</CheckboxText>
                </CheckboxWrapper>
                {is_visible === false && (
                  <Textarea
                    value={phone}
                    autoCorrect={false}
                    placeholder={"'-'를 빼고 입력해주세요."}
                    onChangeText={value => setPhone(value)}
                    style={{ paddingHorizontal: 24 }}
                    placeholderTextColor={'#afafaf'}
                  />
                )}
              </BodyWrapper>
            </Wrapper>
            <Footer>
              <Button
                title={'피드백 제출하기'}
                theme={content.length > 0 ? 'primary' : 'disabled'}
                disabled={content.length > 0 ? false : true}
                onPress={handleSubmit}
              />
            </Footer>
          </>
        </TouchableWithoutFeedback>
      </Container>
    </SafeAreaView>
  );
};

export default Feedback;

const Container = styled.KeyboardAvoidingView`
  position: relative;
  flex: 1;
`;

const Space = styled.View`
  width: 24px;
  height: 24px;
`;

const Header = styled.View<{ is_android: boolean }>`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ is_android }) => (is_android ? `24px 24px 0` : `0 24px`)};
  border-bottom-width: 1px;
  border-bottom-color: #f2f2f2;
`;

const HeaderText = styled.Text`
  font-weight: 600;
  font-size: 18px;
`;

const Wrapper = styled.ScrollView`
  flex: 1;
  padding-top: 25px;
`;

const Footer = styled.View`
  width: 100%;
  height: 112px;
  padding: 24px 24px 0 24px;
`;

const BodyTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const BodyWrapper = styled.View`
  margin-bottom: 16px;
  padding: 0 24px;
`;

const ReviewTextarea = styled(Textarea)`
  padding: 16px;
  color: #555;
  margin-top: 8px;
  height: 196px;
`;

const CheckboxWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  flex-direction: row;
  margin-top: 24px;
`;

const Checkbox = styled.View<{ is_active: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 100px;
  border-width: 2px;
  border-color: ${({ is_active }) => (is_active ? '#53a7ff' : '#555')};
  margin-right: 16px;
  justify-content: center;
  align-items: center;
`;

const InnerCheckbox = styled.View`
  width: 10px;
  height: 10px;
  background-color: #53a7ff;
  border-radius: 100px;
`;

const CheckboxText = styled.Text`
  flex: 1;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #555;
`;
