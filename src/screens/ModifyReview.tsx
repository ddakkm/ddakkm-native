import React from 'react';
import styled from '@emotion/native';
import { useAppNav } from '../hooks/useNav';
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

const ModifyReview = () => {
  const [content, setContent] = React.useState('');
  const [imgUrls, setImgUrls] = React.useState<any[]>([]);
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const [show, handleVisible] = React.useState(false);
  const { navigate, goBack } = useAppNav();

  const imageGalleryLaunch = () => {
    launchImageLibrary(
      {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 3,
        mediaType: 'photo',
        includeBase64: false,
      },
      res => (res?.assets ? setImgUrls([...res.assets]) : setImgUrls([])),
    );
  };

  const handleKeywords = (value: string[]) => {
    setKeywords([...value]);
  };

  const handleRemoveImage = (uri: string) => {
    setImgUrls(prev => prev.filter(img => img.uri !== uri));
  };

  const handleSubmit = React.useCallback(() => {
    goBack();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <StyledWrapper>
            <Header>
              <Icon type={'leftArrow'} onPress={goBack} />
              <HeaderText>후기쓰기</HeaderText>
              <HeaderBtn onPress={() => handleSubmit()}>
                <HeaderBtnText>건너뛰기</HeaderBtnText>
              </HeaderBtn>
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
                    <StyledBtn>
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
                <BodyTitle>사진 첨부(선택)</BodyTitle>
                <StyledImgWrapper>
                  <StyledImgBtn onPress={imageGalleryLaunch}>
                    <Icon type={'search'} />
                    <StyledImgText>{imgUrls.length}/3</StyledImgText>
                  </StyledImgBtn>
                  {imgUrls.map(img => (
                    <ImageCard
                      key={img.fileName}
                      source={{ uri: img.uri }}
                      handleRemoveImage={() => {
                        handleRemoveImage(img.uri);
                      }}
                    />
                  ))}
                </StyledImgWrapper>
              </BodyWrapper>
            </Wrapper>
            <Footer>
              <Button
                title={'후기 올리기'}
                theme={
                  content || imgUrls.length > 0 || keywords.length > 0
                    ? 'primary'
                    : 'disabled'
                }
                disabled={
                  content || imgUrls.length > 0 || keywords.length > 0
                    ? false
                    : true
                }
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

const Header = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
