import React from 'react';
import styled from '@emotion/native';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import Textarea from '../atoms/Textarea';

interface Props {
  onBack: () => void;
}

const ReviewForm = ({ onBack }: Props) => {
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
            placeholder={'3000자 이내'}
            textAlignVertical={'top'}
            multiline={true}
          />
        </BodyWrapper>
        {/* <BodyWrapper>
          <BodyTitle>해시태그</BodyTitle>
          <Textarea placeholder={'10자 이내'} />
        </BodyWrapper> */}
        <BodyWrapper>
          <BodyTitle>사진 첨부(선택)</BodyTitle>
        </BodyWrapper>
      </Wrapper>
      <Footer>
        <Button title={'후기 올리기'} />
      </Footer>
    </>
  );
};

export default ReviewForm;

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

const Space = styled.View`
  width: 24px;
  height: 24px;
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
