import React from 'react';
import styled from '@emotion/native';
import Modal from 'react-native-modal';
import Icon from './Icon';
import { useQuery } from 'react-query';
import { Comment, reviewApi } from '../../api/review';
import { CommentItemProps } from '../../screens/Comments';
import { generateID } from '../../hooks/useId';

interface Props {
  show: boolean;
  handleVisible: () => void;
  comment: Comment;
}

const ReplyCommentModal = ({ show, handleVisible, comment }: Props) => {
  const comment_list = React.useMemo(() => {
    let result = [
      <CommnetItem
        key={generateID()}
        nickname={comment.nickname}
        created_at={comment.created_at}
        content={comment.content}
        like_count={comment.like_count}
        comment_count={comment.nested_comment.length}
        user_is_like={comment.user_is_like}
      />,
    ];
    if (comment.nested_comment.length > 0) {
      const arr = comment.nested_comment.map(recomment => (
        <ReCommnetItem
          key={generateID()}
          nickname={recomment.nickname}
          created_at={recomment.created_at}
          content={recomment.content}
          like_count={recomment.like_count}
          user_is_like={recomment.user_is_like}
        />
      ));
      result = result.concat(arr);
    }

    return result;
  }, [comment]);

  return (
    <Modal isVisible={show} hasBackdrop={false}>
      <StyledContainer>
        <Header>
          <Icon type={'close'} onPress={handleVisible} />
          <HeaderText>답글</HeaderText>
          <Space />
        </Header>
        <StyledBody>
          <StyledCommentList>{comment_list}</StyledCommentList>
        </StyledBody>
      </StyledContainer>
    </Modal>
  );
};

export default ReplyCommentModal;

const CommnetItem = ({
  nickname,
  created_at,
  content,
  like_count,
  user_is_like,
  comment_count,
}: CommentItemProps) => (
  <StyledCommentItemWrapper>
    <StyledCommentItemHeader>
      <StyledCommentNickname>{nickname}</StyledCommentNickname>
      <StyledCommentDate>3일전</StyledCommentDate>
      <StyledCommentMenu type={'menu_verticle'} />
    </StyledCommentItemHeader>
    <StyledCommentContent>{content}</StyledCommentContent>
    <StyledCommentFooter>
      <Icon
        type={user_is_like ? 'fill_heart' : 'heart'}
        style={{ padding: 10 }}
      />
      <StyledFooterText>{like_count}</StyledFooterText>
      <Icon type={'message'} style={{ padding: 10 }} />
      <StyledFooterText>{comment_count}</StyledFooterText>
      <StyledTextBtn>
        <Top08>답글쓰기</Top08>
      </StyledTextBtn>
    </StyledCommentFooter>
  </StyledCommentItemWrapper>
);

const ReCommnetItem = ({
  nickname,
  created_at,
  content,
  like_count,
  user_is_like,
}: Omit<CommentItemProps, 'comment_count'>) => (
  <StyledReCommentItemWrapper>
    <StyledReCommentIcon />
    <StyledCommentItemHeader>
      <StyledCommentNickname>{nickname}</StyledCommentNickname>
      <StyledCommentDate>3일전</StyledCommentDate>
      <StyledCommentMenu type={'menu_verticle'} />
    </StyledCommentItemHeader>
    <StyledCommentContent>{content}</StyledCommentContent>
    <StyledCommentFooter>
      <Icon
        type={user_is_like ? 'fill_heart' : 'heart'}
        style={{ padding: 10 }}
      />
      <StyledFooterText>{like_count}</StyledFooterText>
    </StyledCommentFooter>
  </StyledReCommentItemWrapper>
);

const StyledContainer = styled.View`
  flex: 1;
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

const Space = styled.View``;

const StyledReCommentIcon = styled.View`
  width: 16px;
  height: 16px;
  position: absolute;
  top: -5px;
  left: -24px;

  border-left-width: 1px;
  border-left-color: #afafaf;
  border-bottom-width: 1px;
  border-bottom-color: #afafaf;
`;

const StyledReCommentItemWrapper = styled.View`
  padding-right: 20px;
  margin-left: 60px;
  /* margin-bottom: 16px; */
`;

const StyledBody = styled.View`
  flex: 1;
`;

const StyledCommentList = styled.ScrollView``;

const StyledCommentItemWrapper = styled.View`
  padding: 24px 24px 0 24px;
  margin-bottom: 23px;
`;

const StyledCommentItemHeader = styled.View`
  width: 100%;
  flex-direction: row;
  position: relative;
`;

const StyledCommentNickname = styled.Text`
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
  color: #3a3a3a;
`;

const StyledCommentDate = styled.Text`
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: #afafaf;
  margin-left: 8px;
`;

const StyledCommentMenu = styled(Icon)`
  position: absolute;
  right: 0;
`;

const StyledCommentContent = styled.Text`
  width: 100%;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #3a3a3a;
`;

const StyledCommentFooter = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
`;

const StyledFooterText = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #555555;
  margin: 0 25px 0 8px;
`;

const StyledTextBtn = styled.TouchableOpacity``;

const Top08 = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #555555;
`;
