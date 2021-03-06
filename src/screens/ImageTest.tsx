import React, { useRef } from 'react';
import styled from '@emotion/native';
import ReviewForm from '../components/templates/ReviewForm';
import { Platform, SafeAreaView } from 'react-native';
import { reviewApi } from '../api/review';

const ImageTest = () => {
  const is_loading = useRef(false);

  const createFormData = (photos: any[], body = {}) => {
    if (photos.length === 0) {
      return null;
    }

    const data = new FormData();
    for (const photo of photos) {
      data.append('files', {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });
    }

    return data;
  };

  const handleSubmit = async (imgs: any) => {
    if (is_loading.current) {
      return;
    }
    const images = createFormData(imgs);
    try {
      is_loading.current = true;
      const result = await reviewApi.postImageUpload({ body: images });
      return result;
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      is_loading.current = false;
    }
  };
  return (
    <StyledContainer>
      <SafeAreaView />
      <ReviewForm onBack={() => {}} onSubmit={handleSubmit} />
    </StyledContainer>
  );
};

export default ImageTest;

const StyledContainer = styled.View`
  flex: 1;
  padding-horizontal: 24px;
`;
