import React from 'react';
import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/atoms/Icon';
import { useAppNav } from '../hooks/useNav';

const Notification = () => {
  const { goBack } = useAppNav();

  return (
    <Container>
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
        <Wrapper>
          <Header>
            <Icon type={'leftArrow'} onPress={goBack} />
            <HeaderText>키워드 알림</HeaderText>
            <Space />
          </Header>
        </Wrapper>
      </SafeAreaView>
    </Container>
  );
};

export default Notification;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-horizontal: 24px;
`;

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

const Space = styled.View`
  width: 24px;
  height: 24px;
`;
