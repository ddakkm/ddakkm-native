import React from 'react';
import styled from '@emotion/native';
import { SafeAreaView } from 'react-native';
import Icon from '../components/atoms/Icon';
import { useAppNav, useAppRoute } from '../hooks/useNav';

const Comments = () => {
  const { goBack, navigate } = useAppNav();
  const {
    params: { comments },
  } = useAppRoute<'/comments'>();

  return (
    <Container>
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
        <Header>
          <Icon type={'close'} onPress={goBack} />
          <HeaderText>댓글</HeaderText>
          <HeaderBtn onPress={() => {}}>
            <HeaderBtnText>댓글쓰기</HeaderBtnText>
          </HeaderBtn>
        </Header>
        <StyledBody>
          <StyledCommentList>
            {comments.map(item => (
              <CommnetItem
                key={item.id + ''}
                nickname={item.nickname}
                created_at={item.created_at}
                content={item.content}
                like_count={item.like_count}
                comment_count={item.nested_comment.length}
              />
            ))}
          </StyledCommentList>
        </StyledBody>
      </SafeAreaView>
    </Container>
  );
};

export default Comments;

interface CommentItemProps {
  nickname: string;
  created_at: string;
  content: string;
  like_count: number;
  comment_count: number;
}

const CommnetItem = ({
  nickname,
  created_at,
  content,
  like_count,
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
      <Icon type={'heart'} style={{ padding: 10 }} />
      <StyledFooterText>{like_count}</StyledFooterText>
      <Icon type={'message'} style={{ padding: 10 }} />
      <StyledFooterText>{comment_count}</StyledFooterText>
    </StyledCommentFooter>
  </StyledCommentItemWrapper>
);

const Container = styled.View`
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

const HeaderBtn = styled.TouchableOpacity`
  padding: 0 0;
`;

const HeaderBtnText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #232b3a;
`;

const StyledBody = styled.View`
  flex: 1;
`;

const StyledCommentList = styled.ScrollView``;

const StyledCommentItemWrapper = styled.View`
  padding: 24px 24px 0 24px;
  border-bottom-width: 1px;
  border-bottom-color: #f7f7f7;
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
