import React from 'react';
import styled from '@emotion/native';
import {
  Keyboard,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from '../components/atoms/Icon';
import { useAppNav, useAppRoute } from '../hooks/useNav';
import Textarea from '../components/atoms/Textarea';
import { useQuery, useQueryClient } from 'react-query';
import { reviewApi } from '../api/review';
import Loading from '../components/atoms/Loading';

const ModifyComment = () => {
  const queryClient = useQueryClient();
  const is_loading = React.useRef(false);
  const [content, setContent] = React.useState('');
  const { goBack } = useAppNav();
  const {
    params: { comment_id },
  } = useAppRoute<'/modifyComment'>();

  const { isLoading } = useQuery(
    ['modify_comment', comment_id],
    () => reviewApi.getCommentContent({ comment_id }),
    {
      enabled: !!comment_id,
      onSuccess: data => {
        setContent(data.content);
      },
    },
  );

  const modifyComment = async () => {
    if (is_loading.current) {
      return;
    }
    try {
      await reviewApi.updateComment({ comment_id, content });
      queryClient.invalidateQueries('comment_replay');
      queryClient.invalidateQueries('comment_list');
      goBack();
    } catch (e) {
      /** */
    } finally {
      is_loading.current = false;
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Wrapper>
            <Header is_android={Platform.OS === 'android'}>
              <Icon type={'close'} onPress={goBack} />
              <HeaderText>수정</HeaderText>
              <HeaderTextBtn disabled={!content} onPress={modifyComment}>
                <Top05 isActive={!!content}>답글쓰기</Top05>
              </HeaderTextBtn>
            </Header>
            <StyledBody>
              <Textarea
                value={content}
                onChangeText={value => {
                  setContent(value);
                }}
                style={{
                  height: 206,
                  padding: 16,
                  fontSize: 16,
                  fontWeight: '400',
                  color: '#555',
                  lineHeight: 24,
                }}
                autoCorrect={false}
                multiline={true}
              />
            </StyledBody>
          </Wrapper>
        </TouchableWithoutFeedback>
        {isLoading && <Loading />}
      </Container>
    </SafeAreaView>
  );
};

export default ModifyComment;

const Container = styled.KeyboardAvoidingView`
  position: relative;
  flex: 1;
`;

const Wrapper = styled.View`
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

const HeaderTextBtn = styled.TouchableOpacity``;
const Top05 = styled.Text<{ isActive: boolean }>`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${({ isActive }) => (isActive ? '#53A7FF' : '#afafaf')};
`;

const StyledBody = styled.View`
  flex: 1;
  padding: 16px 24px 0;
`;
