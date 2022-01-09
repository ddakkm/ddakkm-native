import React, { useState } from 'react';
import styled from '@emotion/native';
import {
  Keyboard,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from '../components/atoms/Icon';
import { useAppNav, useAppRoute } from '../hooks/useNav';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { reviewApi } from '../api/review';
import Loading from '../components/atoms/Loading';
import { generateID } from '../hooks/useId';
import FixedBottomInput from '../components/atoms/FixedBottomInput';
import FixedBottomMenuModal from '../components/atoms/FixedBottomMenuModal';
import { getTime } from '../utils/timeUtil';
import { AxiosError } from 'axios';
import Popup from '../components/atoms/Popup';

const Comments = () => {
  const is_loading = React.useRef(false);
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const { goBack, navigate } = useAppNav();
  const [show, setIsShow] = React.useState(false);
  const [is_active, setIsActive] = React.useState(false);
  const selected_comment_id = React.useRef(0);
  const [is_delete_comment, setIsDeleteComment] = React.useState(false);
  const {
    params: { review_id },
  } = useAppRoute<'/comments'>();

  const { isLoading, data } = useQuery(['comment_list', review_id], () =>
    reviewApi.getCommentList(review_id),
  );

  const { mutate } = useMutation(
    ({ review_id, content }: { review_id: number; content: string }) =>
      reviewApi.postComment({ review_id, content }),
    {
      onMutate: () => {
        setContent('');
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['comment_list', review_id]);
      },
      onError: (err: AxiosError) => {
        if (err.response?.status === 401) {
          navigate('/login');
        }
      },
    },
  );

  const { mutate: updateCommentLike } = useMutation(
    (comment_id: number) => reviewApi.postLikeComment({ comment_id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comment_list', review_id]);
      },
      onError: (err: AxiosError) => {
        if (err.response?.status === 401) {
          navigate('/login');
        }
      },
    },
  );

  const options = is_active
    ? [
        {
          label: '수정하기',
          handlePress: () => {
            navigate('/modifyComment', {
              comment_id: selected_comment_id.current,
            });
            setIsShow(false);
          },
        },
        {
          label: '삭제하기',
          handlePress: () => {
            setIsShow(false);
            setTimeout(() => {
              setIsDeleteComment(true);
            }, 300);
          },
        },
      ]
    : [
        {
          label: '신고하기',
          handlePress: () => {
            setIsShow(false);
            setTimeout(() => {
              if (!is_loading) {
                navigate('/login');
                return;
              }
              navigate('/report', {
                comment_id: selected_comment_id.current,
              });
            }, 300);
          },
        },
      ];

  const handleDeleteComment = async () => {
    if (is_loading.current) return;
    try {
      is_loading.current = true;
      await reviewApi.deleteComment(selected_comment_id.current);
      queryClient.invalidateQueries(['comment_list', review_id]);
    } catch (err) {
      /** */
    } finally {
      is_loading.current = false;
      setIsDeleteComment(false);
    }
  };

  const comment_list = React.useMemo(() => {
    return data
      ? data.comment_list.map(item => {
          let result = [
            <CommnetItem
              key={generateID()}
              nickname={item.nickname}
              created_at={item.created_at}
              content={item.content}
              like_count={item.like_count}
              comment_count={item.nested_comment.length}
              user_is_like={item.user_is_like}
              is_comment_option={() => {
                selected_comment_id.current = item.id;
                setIsActive(item.user_is_writer);
                setIsShow(true);
              }}
              navigateToReply={() =>
                navigate('/replyComment', {
                  comment_id: item.id,
                  review_id,
                })
              }
              navigateToUserProfile={() => {
                navigate('/userProfile', { user_id: item.user_id });
              }}
              updateCommentLike={() => updateCommentLike(item.id)}
            />,
          ];

          if (item.nested_comment.length > 0) {
            const arr = item.nested_comment.map(recomment => (
              <ReCommnetItem
                key={generateID()}
                navigateToUserProfile={() => {
                  navigate('/userProfile', { user_id: recomment.user_id });
                }}
                nickname={recomment.nickname}
                created_at={recomment.created_at}
                content={recomment.content}
                like_count={recomment.like_count}
                user_is_like={recomment.user_is_like}
                is_comment_option={() => {
                  selected_comment_id.current = recomment.id;
                  setIsActive(recomment.user_is_writer);
                  setIsShow(true);
                }}
                updateCommentLike={() => updateCommentLike(recomment.id)}
              />
            ));
            result = result.concat(arr);
            result.push(
              <ReCommentReplyBtn
                key={generateID()}
                onPress={() =>
                  navigate('/replyComment', {
                    comment_id: item.id,
                    review_id,
                  })
                }>
                <Top08>답글을 입력해주세요.</Top08>
              </ReCommentReplyBtn>,
            );
          }

          result.push(<Divider />);
          return result;
        })
      : [];
  }, [data]);

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Wrapper>
            <Header>
              <Icon type={'close'} onPress={goBack} />
              <HeaderText>답글 {data?.comment_count}</HeaderText>
              <Space />
            </Header>
            {isLoading ? (
              <Loading />
            ) : comment_list.length > 0 ? (
              <StyledCommentList>{comment_list}</StyledCommentList>
            ) : (
              <Wrapper />
            )}
            <FixedBottomInput
              value={content}
              onChangeText={value => setContent(value)}
              autoCorrect={false}
              placeholder={'답글을 입력해주세요'}
              handleSubmit={() => {
                if (content) {
                  mutate({ review_id, content });
                }
              }}
            />
          </Wrapper>
        </TouchableWithoutFeedback>
      </Container>
      <FixedBottomMenuModal
        isVisible={show}
        handleVisible={() => setIsShow(false)}
        options={options}
      />
      <Popup
        isVisible={is_delete_comment}
        handleVisible={setIsDeleteComment}
        title="답글을 삭제하시겠어요?"
        ok_text="삭제"
        close_text="취소"
        onOk={handleDeleteComment}
        onClose={() => setIsDeleteComment(false)}
      />
    </SafeAreaView>
  );
};

export default Comments;

const Wrapper = styled.View`
  flex: 1;
`;
export interface CommentItemProps {
  nickname: string;
  created_at: string;
  content: string;
  like_count: number;
  comment_count: number;
  user_is_like: boolean;
  is_comment_option: () => void;
  navigateToReply?: () => void;
  navigateToUserProfile: () => void;
  updateCommentLike: () => void;
}

const CommnetItem = ({
  nickname,
  created_at,
  content,
  like_count,
  user_is_like,
  comment_count,
  navigateToReply,
  is_comment_option,
  navigateToUserProfile,
  updateCommentLike,
}: CommentItemProps) => (
  <StyledCommentItemWrapper>
    <StyledCommentItemHeader>
      <StyledNicknameBtn onPress={navigateToUserProfile}>
        <StyledCommentNickname>{nickname}</StyledCommentNickname>
      </StyledNicknameBtn>
      <StyledCommentDate>{getTime(created_at)}</StyledCommentDate>
      <StyledColumn>
        <Icon type={'menu_verticle'} onPress={is_comment_option} />
      </StyledColumn>
    </StyledCommentItemHeader>
    <StyledCommentContent>{content}</StyledCommentContent>
    <StyledCommentFooter>
      <FooterBtn onPress={updateCommentLike}>
        <Icon
          type={user_is_like ? 'fill_heart' : 'heart'}
          style={{ padding: 10 }}
        />
        <StyledFooterText>좋아요 {like_count}</StyledFooterText>
      </FooterBtn>
      <FooterBtn>
        <Icon type={'message'} style={{ padding: 10 }} />
        <StyledFooterText>답글 {comment_count}</StyledFooterText>
      </FooterBtn>
      <StyledTextBtn onPress={navigateToReply}>
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
  is_comment_option,
  navigateToUserProfile,
  updateCommentLike,
}: Omit<CommentItemProps, 'comment_count'>) => (
  <StyledReCommentItemWrapper>
    <StyledReCommentIcon />
    <StyledCommentItemHeader>
      <StyledNicknameBtn onPress={navigateToUserProfile}>
        <StyledCommentNickname>{nickname}</StyledCommentNickname>
      </StyledNicknameBtn>
      <StyledCommentDate>{getTime(created_at)}</StyledCommentDate>
      <StyledColumn>
        <Icon type={'menu_verticle'} onPress={is_comment_option} />
      </StyledColumn>
    </StyledCommentItemHeader>
    <StyledCommentContent>{content}</StyledCommentContent>
    <StyledCommentFooter>
      <FooterBtn onPress={updateCommentLike}>
        <Icon
          type={user_is_like ? 'fill_heart' : 'heart'}
          style={{ padding: 10 }}
        />
        <StyledFooterText>좋아요 {like_count}</StyledFooterText>
      </FooterBtn>
      {/* <Icon type={'message'} style={{ padding: 10 }} />
      <StyledFooterText>{comment_count}</StyledFooterText> */}
    </StyledCommentFooter>
  </StyledReCommentItemWrapper>
);

const FooterBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
`;

const Space = styled.View`
  width: 24px;
  height: 24px;
`;

const Divider = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #efefef;
  margin-top: 24px;
`;

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

const ReCommentReplyBtn = styled.TouchableOpacity`
  margin: 0 24px 0 60px;
  padding: 12px 0 12px 15px;
  border-width: 1px;
  border-color: #e8e8e8;
  border-radius: 8px;
`;

const Container = styled.KeyboardAvoidingView`
  padding-top: ${StatusBar.currentHeight + 'px'};
  position: relative;
  flex: 1;
`;

const Header = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom-color: #f7f7f7;
  border-bottom-width: 1px;
`;
const HeaderText = styled.Text`
  font-weight: 600;
  font-size: 18px;
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

const StyledNicknameBtn = styled.TouchableOpacity``;

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

const StyledColumn = styled.View`
  position: absolute;
  right: 0;
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
  color: #c9c6c6;
  margin: 0 0 0 8px;
`;

const StyledTextBtn = styled.TouchableOpacity``;

const Top08 = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #555555;
`;
