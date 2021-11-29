import React from 'react';
import styled from '@emotion/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import Icon from '../components/atoms/Icon';
import { convertRoundToText, convertTypeToText } from '../utils/filterUtil';
import { convertToCharactorSrc } from '../utils/charactor_image_utils';
import { useAppNav, useAppRoute } from '../hooks/useNav';
import { useQuery } from 'react-query';
import { userApi } from '../api/user';
import Loading from '../components/atoms/Loading';
import ReviewItem from '../components/atoms/ReviewItem';
import { generateID } from '../hooks/useId';

const UserProfile = () => {
  const { goBack, navigate } = useAppNav();
  const {
    params: { user_id },
  } = useAppRoute<'/userProfile'>();

  const { isLoading, data } = useQuery(
    ['/userProfile', user_id],
    () => userApi.getOtherProfile(user_id),
    {
      enabled: !!user_id,
    },
  );

  const { isLoading: isPostLoading, data: userPosts } = useQuery(
    ['/userProfile/post', user_id],
    () => userApi.getOtherPost(user_id),
    {
      enabled: !!user_id,
    },
  );

  const navigateToReview = (review_id: number) => {
    navigate('/detail', { review_id });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Container>
        <Header>
          <Icon type={'leftArrow'} onPress={goBack} />
        </Header>
        {isLoading || isPostLoading ? (
          <Loading />
        ) : data ? (
          <>
            <ProfileCard
              character_image={data.character_image}
              nickname={data.nickname}
              vaccine_status={data.vaccine_status}
            />
            <StyledRow>
              <Top02 is_number={false}>작성 후기</Top02>
              <Top02 is_number={true}>{userPosts ? userPosts.length : 0}</Top02>
            </StyledRow>
            <StyledScroll contentContainerStyle={styles.scroll}>
              {userPosts
                ? userPosts.map(item => (
                    <ReviewItem
                      key={generateID()}
                      nickname={item.nickname}
                      like_count={item.like_count}
                      comment_count={item.comment_count}
                      created_at={item.created_at}
                      is_cross={item.vaccine_status.details.is_crossed}
                      round={item.vaccine_status.details.vaccine_round}
                      type={item.vaccine_status.details.vaccine_type}
                      navigateReview={() => navigateToReview(item.id)}
                    />
                  ))
                : null}
            </StyledScroll>
          </>
        ) : null}
      </Container>
    </SafeAreaView>
  );
};

export default UserProfile;

interface ProfileCardProps {
  character_image?: string;
  nickname?: string;
  vaccine_status?: {
    details: {
      is_crossed: boolean;
      vaccine_round: string;
      vaccine_type: string;
    };
  };
}

const ProfileCard = ({
  character_image,
  nickname,
  vaccine_status,
}: ProfileCardProps) => (
  <ProfileCardWrapper>
    <ProfileImageWrapper>
      <Icon type={convertToCharactorSrc(character_image)} />
    </ProfileImageWrapper>
    <ProfileContentWrapper>
      <Top03>{nickname}</Top03>
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

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Top02 = styled.Text<{ is_number: boolean }>`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: ${({ is_number }) => (is_number ? '#53a7fe' : '#3a3a3a')};
  margin-right: 8px;
`;

const StyledRow = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 48px 24px 10px 24px;
  border-bottom-width: 1px;
  border-bottom-color: #f2f2f2;
`;

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#fff', flex: 1, position: 'relative' },
  scroll: { paddingBottom: 84 },
});

const Header = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 24px;
`;

const StyledScroll = styled.ScrollView``;

const ProfileCardWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 16px;
  padding: 0 24px 0 24px;
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
