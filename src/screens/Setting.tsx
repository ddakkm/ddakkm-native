import React from 'react';
import styled from '@emotion/native';
import Icon from '../components/atoms/Icon';
import { SafeAreaView } from 'react-native';
import { useAppNav } from '../hooks/useNav';
import { useQuery } from 'react-query';
import { userApi } from '../api/user';
import { convertToCharactorSrc } from '../utils/charactor_image_utils';
import { convertRoundToText, convertTypeToText } from '../utils/filterUtil';
import { removeTokens } from '../contexts/auth/storage';
import { useIsLoggedIn } from '../contexts/auth';
import Loading from '../components/atoms/Loading';

const Setting = () => {
  const [is_logout_loading, setLogoutLoading] = React.useState(false);
  const { is_loggedIn, logout } = useIsLoggedIn();
  const { navigate, reset } = useAppNav();
  const { isLoading, data, isError, remove } = useQuery(
    ['/user-profile'],
    userApi.getProfile,
    {
      enabled: !!is_loggedIn,
    },
  );

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await removeTokens();
      remove();
      logout();
      reset({ index: 0, routes: [{ name: '/' }] });
    } catch {
      /** */
    } finally {
      setLogoutLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToMyReviews = () => {
    navigate('/myReviews');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Container>
        <Header>
          <ProfileCard
            character_image={data?.character_image}
            vaccine_status={data?.vaccine_status}
            nickname={data?.nickname}
            navigateToLogin={navigateToLogin}
          />
          <ProfileInfoCount
            comment_counts={data?.comment_counts}
            like_counts={data?.like_counts}
            post_counts={data?.post_counts}
            navigateToMyReviews={navigateToMyReviews}
          />
        </Header>
        <MenuListWrapper>
          {/* <MenuListItem>
            <MenuListItemText>통계보기</MenuListItemText>
          </MenuListItem> */}
          {/* <MenuListItem>
            <MenuListItemText>공지사항</MenuListItemText>
          </MenuListItem>
           */}
          <MenuListItem>
            <MenuListItemText>피드백 남기기</MenuListItemText>
          </MenuListItem>
          <MenuListItem>
            <MenuListItemText>개인정보처리방침</MenuListItemText>
          </MenuListItem>
          {is_loggedIn ? (
            <>
              <MenuListItem onPress={() => navigate('/pushSetting')}>
                <MenuListItemText>알림설정</MenuListItemText>
              </MenuListItem>
              <MenuListItem onPress={() => navigate('/keyword')}>
                <MenuListItemText>키워드 설정</MenuListItemText>
              </MenuListItem>
              <MenuListItem onPress={handleLogout}>
                <MenuListItemText>로그아웃</MenuListItemText>
              </MenuListItem>
              <MenuListItem>
                <MenuListItemText style={{ color: '#afafaf' }}>
                  탈퇴하기
                </MenuListItemText>
              </MenuListItem>
            </>
          ) : null}
        </MenuListWrapper>
        {is_logout_loading && <Loading />}
      </Container>
    </SafeAreaView>
  );
};

export default Setting;

interface ProfileCardProps {
  character_image?: string;
  nickname?: string;
  vaccine_status?: {
    details: {
      is_crossed: boolean;
      vaccine_round: string;
      vaccine_type: string;
    } | null;
    join_survey_code: string;
  };
  navigateToLogin: () => void;
}

const ProfileCard = ({
  character_image,
  nickname,
  vaccine_status,
  navigateToLogin,
}: ProfileCardProps) => (
  <ProfileCardWrapper>
    <ProfileImageWrapper>
      <Icon type={convertToCharactorSrc(character_image)} />
    </ProfileImageWrapper>
    <ProfileContentWrapper>
      {nickname ? (
        <Top03>{nickname}</Top03>
      ) : (
        <TouchText onPress={navigateToLogin}>
          <Top03>로그인하러가기 {'>'}</Top03>
        </TouchText>
      )}
      {vaccine_status ? (
        <Top05>
          {convertRoundToText(vaccine_status.details?.vaccine_round)} ·{' '}
          {convertTypeToText(vaccine_status.details?.vaccine_type)}
          {vaccine_status.details?.is_crossed ? ' · 교차접종' : ''}
        </Top05>
      ) : null}
    </ProfileContentWrapper>
  </ProfileCardWrapper>
);

interface ProfileInfoCountProps {
  comment_counts?: number;
  post_counts?: number;
  like_counts?: number;
  navigateToMyReviews: () => void;
}

const ProfileInfoCount = ({
  comment_counts,
  post_counts,
  like_counts,
  navigateToMyReviews,
}: ProfileInfoCountProps) => (
  <ProfileInfoCountWrapper onPress={navigateToMyReviews}>
    <ProfileInfoBoxWrapper>
      <ProfileInfoCountText>
        {post_counts ? post_counts : '-'}
      </ProfileInfoCountText>
      <ProfileInfoText>작성한 후기</ProfileInfoText>
    </ProfileInfoBoxWrapper>
    <DividerWrapper>
      <Divider />
    </DividerWrapper>
    <ProfileInfoBoxWrapper>
      <ProfileInfoCountText>
        {comment_counts ? comment_counts : '-'}
      </ProfileInfoCountText>
      <ProfileInfoText>댓글 단 후기</ProfileInfoText>
    </ProfileInfoBoxWrapper>
    <DividerWrapper>
      <Divider />
    </DividerWrapper>
    <ProfileInfoBoxWrapper>
      <ProfileInfoCountText>
        {like_counts ? like_counts : '-'}
      </ProfileInfoCountText>
      <ProfileInfoText>좋아요 한 후기</ProfileInfoText>
    </ProfileInfoBoxWrapper>
  </ProfileInfoCountWrapper>
);

const Container = styled.View`
  position: relative;
  flex: 1;
`;

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

const ProfileInfoCountWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 96px;
  background-color: #f7f7f7;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
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

const TouchText = styled.TouchableOpacity``;
