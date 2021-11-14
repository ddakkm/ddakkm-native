import React, { useState } from 'react';
import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/atoms/Icon';
import { useAppNav, useAppRoute } from '../hooks/useNav';
import Button from '../components/atoms/Button';

const Keyword = () => {
  const { goBack } = useAppNav();
  const { params } = useAppRoute<'/keyword'>();

  const [selected_keyword, setSelectedKeyword] = useState<string[]>([]);
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
  const setting = [
    { label: '당일', value: '당일' },
    { label: '2일차', value: '2일차' },
    { label: '3일차', value: '3일차' },
    { label: '5일차', value: '5일차' },
    { label: '1주일 이상', value: '1주일 이상' },
    { label: '1달 이상', value: '1달 이상' },
    { label: '발열', value: '발열' },
    { label: '두통', value: '두통' },
    { label: '어지러움', value: '어지러움' },
    { label: '울렁거림', value: '울렁거림' },
    { label: '메스꺼움', value: '메스꺼움' },
    { label: '구토', value: '구토' },
    { label: '복통', value: '복통' },
    { label: '설사', value: '설사' },
  ];
  return (
    <Container>
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
        <Wrapper>
          <Header>
            <Icon type={'leftArrow'} onPress={goBack} />
            <HeaderText>키워드 알림</HeaderText>
            <Space />
          </Header>
          <BtnList>
            <StyledBtnWrapper>
              {keywords.map(({ label, value }) => (
                <StyledBtn
                  onPress={() => handleSelectKeyword(value)}
                  active={selected_keyword.includes(value)}>
                  <StyledBtnText active={selected_keyword.includes(value)}>
                    {label}
                  </StyledBtnText>
                </StyledBtn>
              ))}
              {params.type
                ? setting.map(({ label, value }) => (
                    <StyledBtn
                      onPress={() => handleSelectKeyword(value)}
                      active={selected_keyword.includes(value)}>
                      <StyledBtnText active={selected_keyword.includes(value)}>
                        {label}
                      </StyledBtnText>
                    </StyledBtn>
                  ))
                : null}
            </StyledBtnWrapper>
          </BtnList>
          <StyledFixedBtnWrapper>
            <Button
              title={'적용하기'}
              theme={selected_keyword.length > 0 ? 'primary' : 'disabled'}
              disabled={selected_keyword.length === 0}
              onPress={() => {
                if (params.handleKeywords) {
                  params.handleKeywords(selected_keyword);
                  goBack();
                }
              }}
            />
          </StyledFixedBtnWrapper>
        </Wrapper>
      </SafeAreaView>
    </Container>
  );
};

export default Keyword;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-horizontal: 24px;
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
