import React, { useState } from 'react';
import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import Icon from './Icon';
import Button from './Button';
import { generateID } from '../../hooks/useId';

interface Props {
  isVisible: boolean;
  handleVisible: () => void;
  keyword_param: string[];
  handleKeyword: (value: string[]) => void;
}

const KeywordModal = ({
  isVisible,
  handleVisible,
  keyword_param,
  handleKeyword,
}: Props) => {
  const [selected_keyword, setSelectedKeyword] =
    useState<string[]>(keyword_param);
  const handleSelectKeyword = (value: string) => {
    if (selected_keyword.includes(value)) {
      setSelectedKeyword(selected_keyword.filter(item => item !== value));
      return;
    }

    if (selected_keyword.length >= 5) {
      return;
    }
    setSelectedKeyword(prev => [...prev, value]);
  };

  const keywords = [
    { value: '심근염/심낭염', label: '심근염/심낭염' },
    { value: '혈전증', label: '혈전증' },
    { value: '피로감', label: '피로감' },
    { value: '여드름', label: '여드름' },
    { value: '월경장애', label: '월경장애' },
    { value: '관절통', label: '관절통' },
    { value: '두드러기', label: '두드러기' },
    { value: '얼굴, 손, 다리붓기', label: '얼굴, 손, 다리붓기' },
    { value: '호흡곤란', label: '호흡곤란' },
    { value: '가슴 통증', label: '가슴 통증' },
    { value: '소화장애', label: '소화장애' },
    { value: '두근거림', label: '두근거림' },
    { value: '멍', label: '멍' },
    { value: '시야흐림', label: '시야흐림' },
    { value: '오한', label: '오한' },
    { value: '인후 부종', label: '인후 부종' },
    { value: '홍조', label: '홍조' },
    { value: '간지러움', label: '간지러움' },
    { value: '해열제', label: '해열제' },
    { value: '부스터샷', label: '부스터샷' },
  ];

  return (
    <Modal isVisible={isVisible} hasBackdrop={false}>
      <Container>
        <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
          <Wrapper>
            <Header>
              <Icon type={'leftArrow'} onPress={handleVisible} />
              <HeaderText>키워드 알림</HeaderText>
              <Space />
            </Header>
            <BtnList>
              <StyledBtnWrapper>
                {keywords.map(({ label, value }) => (
                  <StyledBtn
                    key={generateID()}
                    onPress={() => handleSelectKeyword(value)}
                    active={selected_keyword.includes(value)}>
                    <StyledBtnText active={selected_keyword.includes(value)}>
                      {label}
                    </StyledBtnText>
                  </StyledBtn>
                ))}
              </StyledBtnWrapper>
            </BtnList>
            <StyledFixedBtnWrapper>
              <Button
                title={'적용하기'}
                theme={selected_keyword.length > 0 ? 'primary' : 'disabled'}
                disabled={selected_keyword.length === 0}
                onPress={() => {
                  handleKeyword(selected_keyword);
                  handleVisible();
                }}
              />
            </StyledFixedBtnWrapper>
          </Wrapper>
        </SafeAreaView>
      </Container>
    </Modal>
  );
};

export default KeywordModal;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Wrapper = styled.View`
  flex: 1;
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

const Space = styled.View`
  width: 24px;
  height: 24px;
`;

const BtnList = styled.ScrollView`
  flex: 1;
`;

const StyledBtnWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 24px;
`;

const StyledBtn = styled.TouchableOpacity<{ active: boolean }>`
  border-width: 1px;
  border-color: #e8e8e8;
  padding: 6px 18px;
  border-radius: 100px;
  margin-left: 12px;
  margin-bottom: 12px;
  background-color: ${({ active }) => (active ? '#53A7FF' : '#fff')};
`;

const StyledBtnText = styled.Text<{ active: boolean }>`
  font-weight: ${({ active }) => (active ? '700' : '400')};
  font-size: 16px;
  line-height: 24px;
  color: ${({ active }) => (active ? '#fff' : '#1d1d1d')};
`;

const StyledFixedBtnWrapper = styled.View`
  width: 100%;
  padding: 24px 0 24px;
`;
