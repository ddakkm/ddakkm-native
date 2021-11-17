import React from 'react';
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

const Detail = () => {
  const { goBack, navigate } = useAppNav();
  const {
    params: { review_id },
  } = useAppRoute<'/detail'>();

  const { isLoading, data, isError } = useReviewDetail(review_id);
  const { updateLikeReview } = useMyLikeList();
  const [is_like, setIsLike] = React.useState(
    data?.user_is_like ? data.user_is_like : false,
  );
  const [likeCount, setLikeCount] = React.useState(data ? data.like_count : 0);
  const handlePressLike = () => {
    try {
      // updateLikeReview(review_id + '', is_like ? false : true);
      setIsLike(prev => !prev);
      setLikeCount(prev => (is_like ? prev - 1 : prev + 1));
      mutate({ review_id });
    } catch (e) {
      // updateLikeReview(review_id + '', is_like ? false : true);
      setIsLike(prev => !prev);
      setLikeCount(prev => (is_like ? prev + 1 : prev - 1));
    }
  };

  const { mutate } = useReviewLikeStatus();

  return (
    <Container>
      <SafeAreaView style={styles.safeArea}>
        <Header>
          <Icon type={'leftArrow'} onPress={goBack} />
          <HeaderText>리뷰 상세 후기</HeaderText>
          <Icon type={'menu_verticle'} />
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
                  <StyledBodyTop03>{data.nickname}님</StyledBodyTop03>
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
                    ? Object.values(data.images).map(img => (
                        <StyledImg key={generateID()} source={{ uri: img }} />
                      ))
                    : null}
                </StyledImgWrapper>
              </StyledBody>
            </Wrapper>
            <StyledFooter>
              <Icon
                type={data.user_is_like ? 'fill_heart' : 'heart'}
                style={{ padding: 10 }}
                onPress={() => mutate({ review_id })}
              />
              <StyledFooterText>{data.like_count}</StyledFooterText>
              <Icon
                type={'message'}
                style={{ padding: 10 }}
                onPress={() => navigate('/comments', { review_id })}
              />
              <StyledFooterText>{data.comment_count}</StyledFooterText>
            </StyledFooter>
          </>
        ) : (
          <NoReview />
        )}
      </SafeAreaView>
    </Container>
  );
};

export default Detail;

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
  padding: 18px 24px;
  flex-direction: row;
  background-color: #fff;
`;

const StyledFooterText = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #555555;
  margin: 0 25px 0 8px;
`;

const StyledImgWrapper = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

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
