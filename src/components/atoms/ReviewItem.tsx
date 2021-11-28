import React from 'react';
import styled from '@emotion/native';
import Icon from './Icon';
import { convertRoundToText, convertTypeToText } from '../../utils/filterUtil';
import dayjs from 'dayjs';

interface Props {
  round: string;
  type: string;
  is_cross: boolean;
  like_count: number;
  comment_count: number;
  nickname: string;
  created_at: string;
  navigateReview: () => void;
}

const ReviewItem = ({
  round,
  type,
  is_cross,
  like_count,
  comment_count,
  created_at,
  nickname,
  navigateReview,
}: Props) => (
  <Container>
    <Wrapper onPress={navigateReview}>
      <TitleRow>
        <Top03>
          {convertRoundToText(round)} · {convertTypeToText(type)}{' '}
          {is_cross ? ' · 교차접종' : null}
        </Top03>
        <Icon type={'rightArrow'} />
      </TitleRow>
      <Row>
        <Top05>
          {nickname} / {dayjs(created_at).format('YYYY.MM.DD')}
        </Top05>
      </Row>
      <FooterRow>
        <Icon type={'heart'} />
        <IconText>{like_count}</IconText>
        <Icon type={'message'} />
        <IconText>{comment_count}</IconText>
      </FooterRow>
    </Wrapper>
  </Container>
);

export default ReviewItem;

const Container = styled.View`
  width: 100%;
  padding: 24px 32px 24px 24px;
`;

const Row = styled.View`
  position: relative;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const TitleRow = styled.View`
  position: relative;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;
const FooterRow = styled.View`
  position: relative;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-top: 16px;
`;

const IconText = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #555;
  margin: 0 18px 0 6px;
`;

const Top03 = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #3a3a3a;
`;

const Top05 = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #afafaf;
`;

const Wrapper = styled.TouchableOpacity`
  flex: 1;
`;
