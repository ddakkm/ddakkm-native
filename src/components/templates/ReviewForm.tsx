import React, { useCallback, useState } from 'react';
import styled from '@emotion/native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import Textarea from '../atoms/Textarea';
import { useAppNav } from '../../hooks/useNav';
import KeywordModal from '../atoms/KeywordModal';
import ImageCard from '../atoms/ImageCard';
import { generateID } from '../../hooks/useId';

interface Props {
  onBack: () => void;
  onSubmit: ({
    content,
    imgs,
    keywords,
  }: {
    content?: string;
    imgs?: any;
    keywords?: string[];
  }) => void;
}

const ReviewForm = ({ onBack, onSubmit }: Props) => {
  const [content, setContent] = useState('');
  const [imgUrls, setImgUrls] = useState<any[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [show, handleVisible] = useState(false);
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

  const handleSubmit = useCallback(() => {
    onSubmit({
      content,
      imgs: imgUrls.length > 0 ? imgUrls : null,
      keywords,
    });
    goBack();
  }, [content, imgUrls, keywords]);

  const handleRemoveImage = (uri: string) => {
    setImgUrls(prev => prev.filter(img => img.uri !== uri));
  };

  return (
    <>
      <Header>
        <Icon type={'leftArrow'} onPress={onBack} />
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
            placeholder={'10자 이상 입력'}
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
          theme={content.length > 9 ? 'primary' : 'disabled'}
          disabled={content.length > 9 ? false : true}
          onPress={handleSubmit}
        />
      </Footer>
      <KeywordModal
        isVisible={show}
        handleVisible={() => handleVisible(false)}
        keyword_param={keywords}
        handleKeyword={handleKeywords}
      />
    </>
  );
};

export default ReviewForm;

const Space = styled.View`
  width: 24px;
  height: 24px;
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

const StyledImg = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 8px;
  margin-left: 8px;
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
