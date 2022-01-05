import React from 'react';
import styled from '@emotion/native';
import { useAppNav, useAppRoute } from '../hooks/useNav';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from '../components/atoms/Icon';
import KeywordModal from '../components/atoms/KeywordModal';
import Button from '../components/atoms/Button';
import {
  Keyboard,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import Textarea from '../components/atoms/Textarea';
import ImageCard from '../components/atoms/ImageCard';
import { useQuery, useQueryClient } from 'react-query';
import { reviewApi } from '../api/review';
import Loading from '../components/atoms/Loading';
import { generateID } from '../hooks/useId';

const ModifyReview = () => {
  const is_loading = React.useRef(false);
  const [loading, setLoading] = React.useState(false);
  const queryClient = useQueryClient();
  const [content, setContent] = React.useState('');
  const [imgUrls, setImgUrls] = React.useState<any[]>([]);
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const [show, handleVisible] = React.useState(false);
  const { navigate, goBack, reset } = useAppNav();
  const {
    params: { review_id },
  } = useAppRoute<'/modifyReview'>();

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await reviewApi.getReviewContent({ review_id });
        setContent(data.content);
        setKeywords(data.keywords);
        if (data.images) {
          setImgUrls(
            Object.entries(data.images).map(([key, value]) => {
              return {
                fileName: key,
                uri: value,
              };
            }),
          );
        }
      } catch (e) {
        /** */
      } finally {
        setLoading(false);
      }
    })();
  }, [review_id]);

  // const imageGalleryLaunch = () => {
  //   launchImageLibrary(
  //     {
  //       maxHeight: 200,
  //       maxWidth: 200,
  //       selectionLimit: 3,
  //       mediaType: 'photo',
  //       includeBase64: false,
  //     },
  //     res =>
  //       res?.assets
  //         ? setImgUrls(
  //             res.assets.map((asset, index) => ({
  //               fileName: `image${index + 1}+url`,
  //               uri: asset.uri,
  //             })),
  //           )
  //         : setImgUrls([]),
  //   );
  // };

  const handleKeywords = (value: string[]) => {
    setKeywords([...value]);
  };

  const handleRemoveImage = (uri: string) => {
    setImgUrls(prev =>
      prev.map(img => {
        if (img.uri === uri) {
          img.uri = null;
          return img;
        }
        return img;
      }),
    );
  };

  const handleSubmit = async () => {
    if (is_loading.current) {
      return;
    }
    try {
      is_loading.current = true;
      const body: { content?: string; keywords?: string[]; images?: any } = {
        content,
        keywords,
      };

      if (imgUrls.length > 0) {
        body.images = imgUrls.reduce(
          (acc, cur) => (acc[cur.fileName] = cur.uri),
          {},
        );
      }

      await reviewApi.updateReviewContent({ review_id, body });

      queryClient.invalidateQueries('review_list');
      queryClient.invalidateQueries(['review_detail', review_id]);
      goBack();
    } catch (e) {
      /** */
    } finally {
      is_loading.current = false;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <StyledWrapper>
            <Header is_android={Platform.OS === 'android'}>
              <Icon type={'leftArrow'} onPress={goBack} />
              <HeaderText>후기쓰기</HeaderText>
              <Space />
            </Header>
            <Wrapper>
              <BodyWrapper>
                <BodyTitle>자유 후기</BodyTitle>
                <ReviewTextarea
                  value={content}
                  autoCorrect={false}
                  onChangeText={value => setContent(value)}
                  placeholder={'3000자 이내'}
                  textAlignVertical={'top'}
                  multiline={true}
                />
              </BodyWrapper>
              <BodyWrapper>
                <BodyTitle>키워드 알림</BodyTitle>
                <StyledKeywordBtn onPress={() => handleVisible(true)}>
                  <StyledKeywordBtnText>
                    여기를 눌러 해시태그를 선택해주세요.
                  </StyledKeywordBtnText>
                </StyledKeywordBtn>
                <StyledBtnWrapper>
                  {keywords.map(value => (
                    <StyledBtn key={generateID()}>
                      <StyledBtnText>{value}</StyledBtnText>
                      <Icon
                        type={'close'}
                        onPress={() =>
                          setKeywords(keywords.filter(item => item !== value))
                        }
                      />
                    </StyledBtn>
                  ))}
                </StyledBtnWrapper>
              </BodyWrapper>
              <BodyWrapper>
                <BodyTitle>사진 수정</BodyTitle>
                <StyledImgWrapper>
                  {/* <StyledImgBtn onPress={imageGalleryLaunch}>
                    <Icon type={'search'} />
                    <StyledImgText>
                      {imgUrls.filter(img => img.uri !== null).length}/3
                    </StyledImgText>
                  </StyledImgBtn> */}
                  {imgUrls.map(img =>
                    img.uri ? (
                      <ImageCard
                        key={img.fileName}
                        source={{ uri: img.uri }}
                        handleRemoveImage={() => {
                          handleRemoveImage(img.uri);
                        }}
                      />
                    ) : null,
                  )}
                </StyledImgWrapper>
              </BodyWrapper>
            </Wrapper>
            <Footer>
              <Button
                title={'후기 수정하기'}
                theme={content || keywords.length > 0 ? 'primary' : 'disabled'}
                disabled={content || keywords.length > 0 ? false : true}
                onPress={handleSubmit}
              />
            </Footer>
            <KeywordModal
              isVisible={show}
              handleVisible={() => handleVisible(false)}
              keyword_param={keywords}
              handleKeyword={handleKeywords}
            />
          </StyledWrapper>
        </TouchableWithoutFeedback>
        {loading && <Loading />}
      </Container>
    </SafeAreaView>
  );
};

export default ModifyReview;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

const StyledWrapper = styled.View`
  flex: 1;
  padding: 0 24px;
`;

const Space = styled.View`
  width: 24px;
  height: 24px;
`;

const Header = styled.View<{ is_android: boolean }>`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ is_android }) => (is_android ? `24px 0` : `0`)};
`;

const HeaderText = styled.Text`
  font-weight: 600;
  font-size: 18px;
`;

const Wrapper = styled.ScrollView`
  flex: 1;
  padding-top: 25px;
`;

const HeaderBtn = styled.TouchableOpacity`
  width: 45px;
`;

const HeaderBtnText = styled.Text`
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: #a5a5a5;
`;

const Footer = styled.View`
  width: 100%;
  height: 112px;
  padding-top: 24px;
`;

const BodyTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const BodyWrapper = styled.View`
  margin-bottom: 16px;
`;

const ReviewTextarea = styled(Textarea)`
  padding: 16px;
  color: #555;
  margin-top: 8px;
  height: 196px;
`;

const StyledKeywordBtn = styled.TouchableOpacity`
  width: 100%;
  padding: 16px;
  border-width: 1px;
  border-color: #e8e8e8;
  border-radius: 8px;
  margin-top: 8px;
`;

const StyledKeywordBtnText = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #555555;
`;

const StyledImgBtn = styled.TouchableOpacity`
  width: 72px;
  height: 72px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #e8e8e8;
  border-radius: 8px;
`;

const StyledImgText = styled.Text`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #c1c1c1;
  margin-top: 4px;
`;

const StyledImgWrapper = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

const StyledBtnWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 24px;
`;

const StyledBtn = styled.View`
  flex-direction: row;
  border-width: 1px;
  border-color: #e8e8e8;
  padding: 8px 8px 8px 16px;
  border-radius: 100px;
  margin-right: 8px;
  margin-bottom: 12px;
`;

const StyledBtnText = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #1d1d1d;
`;
