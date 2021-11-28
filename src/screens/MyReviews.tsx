import React from 'react';
import styled from '@emotion/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import Icon from '../components/atoms/Icon';
import { useAppNav } from '../hooks/useNav';
import { useQuery } from 'react-query';
import { userApi } from '../api/user';
import { useIsLoggedIn } from '../contexts/auth';
import ReviewItem from '../components/atoms/ReviewItem';
import Loading from '../components/atoms/Loading';

const MyReviews = () => {
  const { goBack, navigate } = useAppNav();
  const { is_loggedIn } = useIsLoggedIn();

  const { isLoading, data } = useQuery(['/myReviews'], userApi.getMyPost, {
    staleTime: Infinity,
    enabled: !!is_loggedIn,
  });

  const navigateToReview = (review_id: number) => {
    navigate('/detail', { review_id });
  };

  return (
    <Container>
      <SafeAreaView style={styles.safeArea}>
        <Header>
          <Icon type={'leftArrow'} onPress={goBack} />
          <HeaderText>작성글</HeaderText>
          <Space />
        </Header>
        <StyledScroll>
          {isLoading ? (
            <Loading />
          ) : data ? (
            data.map(item => (
              <ReviewItem
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
          ) : (
            []
          )}
        </StyledScroll>
      </SafeAreaView>
    </Container>
  );
};

export default MyReviews;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
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
  justify-content: space-between;
  padding-horizontal: 24px;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
`;
const HeaderText = styled.Text`
  font-weight: 600;
  font-size: 18px;
`;

const Space = styled.View`
    width: 24px;
    height: 24px;x
`;

const StyledScroll = styled.ScrollView``;
