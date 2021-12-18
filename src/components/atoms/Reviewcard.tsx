import React, { memo } from 'react';
import styled, { css } from '@emotion/native';
import Icon from './Icon';

interface Props {
  nickname: string;
  vaccine_text: string;
  like_count: number;
  card_list: React.ReactNode;
  comment_count: number;
  user_is_like: boolean;
  is_content: boolean;
  navigateToDetail: () => void;
  navigateToLogin: () => void;
  updateLikeReview: () => void;
  navigateToComment: () => void;
}

const Reviewcard = ({
  nickname,
  vaccine_text,
  like_count,
  comment_count,
  user_is_like,
  card_list,
  is_content,
  updateLikeReview,
  navigateToDetail,
  navigateToComment,
}: Props) => {
  return (
    <Container is_content={is_content}>
      <StyledWrapper onPress={navigateToDetail}>
        <NicknameText>{nickname}</NicknameText>
        <VaccineText>{vaccine_text}</VaccineText>
        <CardListWrapper>{card_list}</CardListWrapper>
      </StyledWrapper>
      <Cardfooter>
        <FooterBtn onPress={updateLikeReview}>
          <Icon type={user_is_like ? 'fill_heart' : 'heart'} />
          <Footertext>좋아요 {like_count}</Footertext>
        </FooterBtn>
        <FooterBtn onPress={navigateToComment}>
          <Icon type={'message'} />
          <Footertext>답글쓰기 {comment_count}</Footertext>
        </FooterBtn>
      </Cardfooter>
    </Container>
  );
};

export default memo(Reviewcard);

const FooterBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
`;

const Container = styled.View<{ is_content: boolean }>`
  width: 100%;
  padding: 24px 24px 34px 24px;
  height: ${({ is_content }) => (is_content ? '270' : '226')}px;
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
  font-size: 13px;
  line-height: 20px;
  color: #a5a5a5;
  margin-left: 3px;
`;
