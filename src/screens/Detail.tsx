import React, { useEffect } from 'react';
import styled, { css } from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/atoms/Icon';
import { useAppNav, useAppRoute } from '../hooks/useNav';
import useReviewDetail from '../hooks/useReviewDetail';
import {
  convertQuestionToIcon,
  convertQuestionToText,
  convertRoundToText,
  convertTypeToText,
} from '../utils/filterUtil';
import { SURVEY_A_LIST } from '../utils/servayUtil';
import { StyleSheet } from 'react-native';
import { generateID } from '../hooks/useId';
import useReviewLikeStatus from '../hooks/useReviewLikeStatus';
import { reviewApi } from '../api/review';
import { useQueryClient } from 'react-query';
import Loading from '../components/atoms/Loading';
import NoReview from '../components/atoms/NoReview';
import { useMyLikeList } from '../contexts/like';
import FixedBottomMenuModal from '../components/atoms/FixedBottomMenuModal';
import ImageView from 'react-native-image-viewing';
import { useIsLoggedIn } from '../contexts/auth';

const Detail = () => {
  const { goBack, navigate } = useAppNav();
  const {
    params: { review_id },
  } = useAppRoute<'/detail'>();
  const { is_loggedIn } = useIsLoggedIn();
  const [is_show_image, setIsShowImage] = React.useState(false);
  const [image_index, setImageIndex] = React.useState(0);
  const [show, setIsShow] = React.useState(false);
  const { isLoading, data, isError } = useReviewDetail(review_id);
  const { updateLikeReview, checkLikeReview } = useMyLikeList();
  const queryClient = useQueryClient();

  const handleUpdateLikeReview = (review_id: number, is_like: boolean) => {
    if (!is_loggedIn) {
      navigate('/login');
      return;
    }
    try {
      updateLikeReview(review_id + '', is_like);
      reviewApi.postReviewLikeStatus(review_id);
    } catch (e) {
      updateLikeReview(review_id + '', is_like);
    }
  };

  useEffect(() => {
    if (isError) {
      goBack();
    }
  }, [isError]);

  const viewer_images = React.useMemo(() => {
    if (data?.images) {
      return Object.values(data.images)
        .filter(img => img !== null)
        .map(img => ({ uri: img }));
    }
    return [];
  }, [data]);

  const navigateToUserProfile = (user_id: number) => {
    navigate('/userProfile', { user_id });
  };

  const options = React.useMemo(() => {
    return data?.is_writer
      ? [
          {
            label: '수정하기',
            handlePress: () => {
              navigate('/modifyReview', { review_id });
              setIsShow(false);
            },
          },
          {
            label: '삭제하기',
            handlePress: async () => {
              const data = await reviewApi.deleteReview({ review_id });
              console.log(data);
              queryClient.invalidateQueries('review_list');
              setIsShow(false);
              goBack();
            },
          },
        ]
      : [{ label: '신고하기', handlePress: () => {} }];
  }, [data]);

  const regex =
    /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  if (!data) {
    return null;
  }

  const is_liked_review = checkLikeReview(data.id + '');
  return (
    <Container>
      <SafeAreaView style={styles.safeArea}>
        <Header>
          <Icon type={'leftArrow'} onPress={goBack} />
          <HeaderText>리뷰 상세 후기</HeaderText>
          <Icon
            type={'menu_verticle'}
            onPress={() => {
              setIsShow(true);
            }}
          />
        </Header>
        {isLoading ? (
          <Loading />
        ) : data ? (
          <>
            <Wrapper contentContainerStyle={styles.scroll}>
              <StyledBody>
                <BodyTitleWrapper>
                  <StyledBodyTitle>
                    {convertRoundToText(data.survey.vaccine_round)} ·{' '}
                    {convertTypeToText(data.survey.vaccine_type)}
                    {data.survey.is_crossed ? ' · 교차접종' : null}
                  </StyledBodyTitle>
                  <NicknameBtn
                    onPress={() => navigateToUserProfile(data.user_id)}>
                    <StyledBodyTop03>{data.nickname}님</StyledBodyTop03>
                  </NicknameBtn>
                </BodyTitleWrapper>
                {Object.entries(data.survey.data).map(([key, value]: any[]) => {
                  if (value.length === 0) {
                    return null;
                  }

                  return (
                    <CardRowWrapper key={generateID()}>
                      <Icon type={convertQuestionToIcon(key)} />
                      <CardText>
                        {convertQuestionToText(key)} -{' '}
                        {value
                          .filter(
                            (item: string | number) => typeof item === 'number',
                          )
                          .map(
                            (item: number) =>
                              SURVEY_A_LIST[key][item - 1].label,
                          )
                          .join(', ')}
                        {value
                          .filter(
                            (item: string | number) => typeof item === 'string',
                          )
                          .join('')}
                      </CardText>
                    </CardRowWrapper>
                  );
                })}
                {data.content ? (
                  <CardRowWrapper key={generateID()}>
                    <Icon type={'imojiChat'} />
                    <CardText>{data.content}</CardText>
                  </CardRowWrapper>
                ) : null}
                <StyledKeywordWrapper>
                  {data.keywords.map(value => (
                    <StyledKeyword key={generateID()}>
                      <StyledKeywordText>#{value}</StyledKeywordText>
                    </StyledKeyword>
                  ))}
                </StyledKeywordWrapper>
                <StyledImgWrapper>
                  {data.images
                    ? Object.values(data.images).map((img, index) =>
                        regex.test(img) ? (
                          <StyledImgBtn
                            key={generateID()}
                            onPress={() => {
                              setImageIndex(index);
                              setIsShowImage(true);
                            }}>
                            <StyledImg source={{ uri: img }} />
                          </StyledImgBtn>
                        ) : null,
                      )
                    : null}
                </StyledImgWrapper>
              </StyledBody>
            </Wrapper>
            <StyledFooter>
              <FooterBtn
                onPress={() =>
                  handleUpdateLikeReview(review_id, !is_liked_review)
                }>
                <Icon type={is_liked_review ? 'fill_heart' : 'heart'} />
                <StyledFooterText>
                  좋아요{' '}
                  {!data.user_is_like && is_liked_review
                    ? data.like_count + 1
                    : data.user_is_like && !is_liked_review
                    ? data.like_count - 1
                    : data.like_count}
                </StyledFooterText>
              </FooterBtn>
              <FooterBtn
                onPress={() =>
                  is_loggedIn
                    ? navigate('/comments', { review_id })
                    : navigate('/login')
                }>
                <Icon type={'message'} />
                <StyledFooterText>
                  댓글쓰기 {data.comment_count}
                </StyledFooterText>
              </FooterBtn>
            </StyledFooter>
          </>
        ) : (
          <NoReview />
        )}
        <FixedBottomMenuModal
          isVisible={show}
          handleVisible={() => setIsShow(false)}
          options={options}
        />
      </SafeAreaView>
      <ImageView
        images={viewer_images}
        imageIndex={image_index}
        visible={is_show_image}
        onRequestClose={() => setIsShowImage(false)}
        animationType={'slide'}
      />
    </Container>
  );
};

export default Detail;

const FooterBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const NicknameBtn = styled.TouchableOpacity`
  width: 100%;
`;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Header = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 24px;
  border-bottom-color: #f7f7f7;
  border-bottom-width: 1px;
`;
const HeaderText = styled.Text`
  font-weight: 600;
  font-size: 18px;
`;

const Wrapper = styled.ScrollView`
  flex: 1;
`;

const StyledBody = styled.View`
  flex: 1;
  padding: 24px;
`;

const BodyTitleWrapper = styled.View`
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f7f7f7;
`;

const StyledBodyTitle = styled.Text`
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  color: #1d1d1d;
`;

const StyledBodyTop03 = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #afafaf;
  margin-top: 4px;
`;

const CardRowWrapper = styled.View`
  width: 100%;
  padding: 12px;
  margin-bottom: 4px;
  flex-direction: row;
  align-items: flex-start;
`;

const text = () => css`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #555;
`;

const CardText = styled.Text`
  ${text()};
  padding: 0 24px 0 0;
  margin-left: 6px;
`;

const StyledKeywordWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 35px;
`;

const StyledKeyword = styled.View`
  border-width: 1px;
  border-color: #e8e8e8;
  padding: 6px 18px;
  border-radius: 100px;
  margin-right: 8px;
  margin-bottom: 12px;
`;

const StyledKeywordText = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #555;
`;

const StyledFooter = styled.View`
  position: absolute;
  width: 100%;
  height: 84px;
  bottom: 0;
  border-top-width: 1px;
  border-top-color: #f7f7f7;
  padding: 0 24px 18px 24px;
  flex-direction: row;
  background-color: #fff;
`;

const StyledFooterText = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #afafaf;
  margin: 0 25px 0 8px;
`;

const StyledImgWrapper = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

const StyledImgBtn = styled.TouchableOpacity``;

const StyledImg = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 8px;
  margin-left: 8px;
`;

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#fff', flex: 1, position: 'relative' },
  scroll: { paddingBottom: 84 },
});
