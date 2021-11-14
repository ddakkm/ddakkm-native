import React from 'react';
import styled from '@emotion/native';
import Icon from '../components/atoms/Icon';
import { SafeAreaView } from 'react-native';
import { useAppNav } from '../hooks/useNav';
import { useQuery } from 'react-query';
import { userApi } from '../api/user';

const Setting = () => {
  const { navigate } = useAppNav();
  const { isLoading, data, isError } = useQuery(
    '/user-profile',
    userApi.getProfile,
  );

  console.log(data);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Container>
        <Header>
          <ProfileCard />
          <ProfileInfoCount />
        </Header>
        <MenuListWrapper>
          {/* <MenuListItem>
            <MenuListItemText>통계보기</MenuListItemText>
          </MenuListItem> */}
          {/* <MenuListItem>
            <MenuListItemText>공지사항</MenuListItemText>
          </MenuListItem>
          <MenuListItem>
            <MenuListItemText>알림설정</MenuListItemText>
          </MenuListItem> */}
          <MenuListItem
            onPress={() => navigate('/keyword', { type: 'SETTING' })}>
            <MenuListItemText>키워드 설정</MenuListItemText>
          </MenuListItem>
          <MenuListItem>
            <MenuListItemText>문의하기</MenuListItemText>
          </MenuListItem>
          <MenuListItem>
            <MenuListItemText>개인정보처리방침</MenuListItemText>
          </MenuListItem>
          <MenuListItem>
            <MenuListItemText>로그아웃</MenuListItemText>
          </MenuListItem>
          <MenuListItem>
            <MenuListItemText style={{ color: '#afafaf' }}>
              탈퇴하기
            </MenuListItemText>
          </MenuListItem>
        </MenuListWrapper>
      </Container>
    </SafeAreaView>
  );
};

export default Setting;

const ProfileCard = () => (
  <ProfileCardWrapper>
    <ProfileImageWrapper>
      <Icon type={'imojiPanda'} />
    </ProfileImageWrapper>
    <ProfileContentWrapper>
      <Top03>달콤한 호랑이</Top03>
      <Top05>2차 · 화이자 · 교차접종</Top05>
    </ProfileContentWrapper>
  </ProfileCardWrapper>
);

const ProfileInfoCount = () => (
  <ProfileInfoCountWrapper>
    <ProfileInfoBoxWrapper>
      <ProfileInfoCountText>999+</ProfileInfoCountText>
      <ProfileInfoText>작성한 후기</ProfileInfoText>
    </ProfileInfoBoxWrapper>
    <DividerWrapper>
      <Divider />
    </DividerWrapper>
    <ProfileInfoBoxWrapper>
      <ProfileInfoCountText>0</ProfileInfoCountText>
      <ProfileInfoText>댓글 단 후기</ProfileInfoText>
    </ProfileInfoBoxWrapper>
    <DividerWrapper>
      <Divider />
    </DividerWrapper>
    <ProfileInfoBoxWrapper>
      <ProfileInfoCountText>0</ProfileInfoCountText>
      <ProfileInfoText>좋아요 한 후기</ProfileInfoText>
    </ProfileInfoBoxWrapper>
  </ProfileInfoCountWrapper>
);

const Container = styled.View``;

const MenuListWrapper = styled.View`
  padding: 16px 24px;
`;

const MenuListItem = styled.TouchableOpacity`
  padding: 16px 0;
`;

const MenuListItemText = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #555;
`;

const Header = styled.View`
  padding: 0 24px 32px 24px;
  border-bottom-color: #e8e8e8;
  border-bottom-width: 1px;
`;

const ProfileCardWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 16px;
  padding: 16px 0 24px 0;
`;

const ProfileImageWrapper = styled.View`
  width: 72px;
  height: 72px;
  border-radius: 100px;
  background-color: #f7f7f7;
  justify-content: center;
  align-items: center;
`;

const ProfileContentWrapper = styled.View`
  margin-left: 16px;
  justify-content: center;
`;

const Top03 = styled.Text`
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  color: #1d1d1d;
`;
const Top05 = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  color: #555;
`;

const ProfileInfoCountWrapper = styled.View`
  width: 100%;
  height: 96px;
  background-color: #f7f7f7;
  border-radius: 8px;
  flex-direction: row;
`;

const ProfileInfoBoxWrapper = styled.View`
  padding: 24px;
  align-items: center;
`;
const ProfileInfoCountText = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #53a7ff;
`;
const ProfileInfoText = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #555555;
  margin-top: 4px;
`;

const DividerWrapper = styled.View`
  height: 100%;
  padding: 31px 0;
`;

const Divider = styled.View`
  height: 100%;
  border-left-color: #e8e8e8;
  border-left-width: 1px;
`;
