import React, { memo } from 'react';
import styled, { css } from '@emotion/native';
import Icon from './Icon';
import { SURVEY_A_LIST } from '../../utils/servayUtil';
import { useAppNav } from '../../hooks/useNav';
import {
  convertAnswerToText,
  convertQuestionToIcon,
  convertQuestionToText,
  convertRoundToText,
  convertTypeToText,
} from '../../utils/filterUtil';
import { generateID } from '../../hooks/useId';
import { reviewApi } from '../../api/review';
import { useIsLoggedIn } from '../../contexts/auth';

interface Props {
  id: number;
  nickname: string;
  vaccine_round: string;
  vaccine_type: string;
  like_count: number;
  comment_count: number;
  user_is_like: boolean;
  content: string;
  symptom: {
    [key: string]: Array<number | string>;
  };
  navigateToDetail: () => void;
  is_loggedIn: boolean | null;
  navigateToLogin: () => void;
  updateLikeReview: (review_id: string, is_like: boolean) => void;
}

const Reviewcard = ({
  id,
  nickname,
  vaccine_round,
  vaccine_type,
  like_count,
  comment_count,
  user_is_like,
  symptom,
  content,
  navigateToDetail,
  is_loggedIn,
  navigateToLogin,
}: Props) => {
  // const [is_like, setIsLike] = React.useState(!!user_is_like);
  // const [likeCount, setLikeCount] = React.useState(like_count);

  // const handlePressLike = () => {
  //   if (!is_loggedIn) {
  //     navigateToLogin();
  //   }
  //   try {
  //     setIsLike(prev => !prev);
  //     setLikeCount(prev => (is_like ? prev - 1 : prev + 1));
  //     reviewApi.postReviewLikeStatus(id);
  //   } catch (e) {
  //     setIsLike(prev => !prev);
  //     setLikeCount(prev => (is_like ? prev + 1 : prev - 1));
  //   }
  // };
  return (
    <Container>
      <StyledWrapper onPress={navigateToDetail}>
        <NicknameText>{nickname}</NicknameText>
        <VaccineText>
          {convertRoundToText(vaccine_round)} ·{' '}
          {convertTypeToText(vaccine_type)}
        </VaccineText>
        <CardListWrapper>
          {symptom
            ? Object.entries(symptom).map(([key, value]) => (
                <CardRowWrapper key={generateID()}>
                  <Icon type={convertQuestionToIcon(key)} />
                  <CardText>
                    {convertQuestionToText(key)} -{' '}
                    {SURVEY_A_LIST[key][convertAnswerToText(value)]?.label}
                  </CardText>
                </CardRowWrapper>
              ))
            : null}
          {content ? (
            <CardRowWrapper key={generateID()}>
              <Icon type={convertQuestionToIcon('')} />
              <CardText numberOfLines={3}>{content}</CardText>
            </CardRowWrapper>
          ) : null}
        </CardListWrapper>
      </StyledWrapper>
      <Cardfooter>
        <Icon type={user_is_like ? 'fill_heart' : 'heart'} onPress={() => {}} />
        <Footertext>{like_count}</Footertext>
        <Icon type={'message'} style={{ marginLeft: 9 }} />
        <Footertext>{comment_count}</Footertext>
      </Cardfooter>
    </Container>
  );
};

export default memo(Reviewcard);

const Container = styled.View`
  width: 100%;
  padding: 24px 0 34px 0;
`;

const StyledWrapper = styled.TouchableOpacity`
  flex: 1;
`;

const NicknameText = styled.Text`
  font-weight: 400;
  font-size: 12px;
  color: #a5a5a5;
`;

const VaccineText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: #232b3a;
  margin-top: 4px;
  margin-bottom: 12px;
`;

const CardRowWrapper = styled.View`
  width: 100%;
  padding: 12px;
  border-width: 1px;
  border-color: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 4px;
  flex-direction: row;
  align-items: center;
`;

const text = () => css`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #000;
`;

const CardText = styled.Text`
  ${text()};
  padding-right: 20px;
  margin-left: 6px;
`;

const CardListWrapper = styled.View``;

const Cardfooter = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

const Footertext = styled.Text`
  font-weight: 400;
  font-size: 12px;
  color: #a5a5a5;
  margin-left: 3px;
`;
