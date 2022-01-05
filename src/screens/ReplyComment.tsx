import React from 'react';
import styled from '@emotion/native';
import { useAppNav, useAppRoute } from '../hooks/useNav';
import {
  Keyboard,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { generateID } from '../hooks/useId';
import Icon from '../components/atoms/Icon';
import { CommentItemProps } from './Comments';
import FixedBottomInput from '../components/atoms/FixedBottomInput';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { reviewApi } from '../api/review';
import FixedBottomMenuModal from '../components/atoms/FixedBottomMenuModal';
import Loading from '../components/atoms/Loading';

const ReplyComment = () => {
  const queryClient = useQueryClient();
  const { goBack } = useAppNav();
  const {
    params: { comment_id, review_id },
  } = useAppRoute<'/replyComment'>();
  const [content, setContent] = React.useState('');
  const [show, setIsShow] = React.useState(false);
  const [is_active, setIsActive] = React.useState(false);
  const { isLoading, data } = useQuery(['comment_replay', { comment_id }], () =>
    reviewApi.getReplyComment(comment_id),
  );

  const { mutate } = useMutation(
    ({ comment_id, content }: { comment_id: number; content: string }) =>
      reviewApi.postReplyComment({ comment_id, content }),
    {
      onMutate: () => {
        setContent('');
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['comment_replay', { comment_id }]);
        queryClient.invalidateQueries(['comment_list', review_id]);
      },
    },
  );

  const options = React.useMemo(() => {
    return is_active
      ? [
          { label: '수정하기', handlePress: () => {} },
          { label: '삭제하기', handlePress: () => {} },
        ]
      : [{ label: '신고하기', handlePress: () => {} }];
  }, [is_active]);

  const comment_list = React.useMemo(() => {
    if (!data) {
      return [];
    }
    let result = [
      <CommnetItem
        key={generateID()}
        nickname={data.nickname}
        created_at={data.created_at}
        content={data.content}
        like_count={data.like_count}
        comment_count={data.nested_comment.length}
        user_is_like={data.user_is_like}
        is_comment_option={() => {
          setIsActive(data.user_is_active);
          setIsShow(true);
        }}
      />,
    ];

    if (data.nested_comment.length > 0) {
      const arr = data.nested_comment.map(recomment => (
        <ReCommnetItem
          key={generateID()}
          nickname={recomment.nickname}
          created_at={recomment.created_at}
          content={recomment.content}
          like_count={recomment.like_count}
          user_is_like={recomment.user_is_like}
          is_comment_option={() => {
            setIsActive(recomment.user_is_active);
            setIsShow(true);
          }}
        />
      ));
      result = result.concat(arr);
    }

    return result;
  }, [data]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <StyledContainer>
            <Header is_android={Platform.OS === 'android'}>
              <Icon type={'close'} onPress={goBack} />
              <HeaderText>답글</HeaderText>
              <Space />
            </Header>
            <StyledBody>
              <StyledCommentList>{comment_list}</StyledCommentList>
            </StyledBody>
            <FixedBottomInput
              value={content}
              onChangeText={value => setContent(value)}
              autoCorrect={false}
              placeholder={'답글을 입력해주세요'}
              handleSubmit={() => {
                if (content) {
                  mutate({ comment_id, content });
                }
              }}
            />
          </StyledContainer>
        </TouchableWithoutFeedback>
        {isLoading && <Loading />}
      </Container>
      <FixedBottomMenuModal
        isVisible={show}
        handleVisible={() => setIsShow(false)}
        options={options}
      />
    </SafeAreaView>
  );
};

export default ReplyComment;

const Container = styled.KeyboardAvoidingView`
  position: relative;
  flex: 1;
`;

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
      {/* <StyledCommentMenu type={'menu_verticle'} /> */}
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
      {/* <StyledCommentMenu type={'menu_verticle'} /> */}
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

const Header = styled.View<{ is_android: boolean }>`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ is_android }) => (is_android ? `24px 24px 0` : `0 24px`)};
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

const StyledCommentList = styled.ScrollView`
  flex: 1;
`;

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
