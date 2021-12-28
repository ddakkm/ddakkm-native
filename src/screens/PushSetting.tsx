import React, { useRef, useState } from 'react';
import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/atoms/Icon';
import { useAppNav } from '../hooks/useNav';
import { useQuery } from 'react-query';
import { userApi } from '../api/user';
import Loading from '../components/atoms/Loading';

const PushSetting = () => {
  const { goBack } = useAppNav();
  const is_keyword_loading = useRef<boolean>(false);
  const is_activity_loading = useRef<boolean>(false);
  const [is_keyword, setIsKeyword] = useState(false);
  const [is_active, setIsActive] = useState(false);

  const { isLoading } = useQuery('getMyPush', userApi.getMyPush, {
    onSuccess: data => {
      setIsKeyword(data.agree_keyword_push);
      setIsActive(data.agree_activity_push);
    },
  });

  const handleChangeKeyword = async () => {
    if (is_keyword_loading.current) {
      return;
    }
    is_keyword_loading.current = true;
    try {
      setIsKeyword(prev => !prev);
      await userApi.postKeywordPush();
    } catch (e) {
      setIsKeyword(prev => !prev);
    } finally {
      is_keyword_loading.current = false;
    }
  };

  const handleChangeActivity = async () => {
    if (is_activity_loading.current) {
      return;
    }
    is_activity_loading.current = true;
    try {
      setIsActive(prev => !prev);
      await userApi.postActivityPush();
    } catch (e) {
      setIsActive(prev => !prev);
    } finally {
      is_activity_loading.current = false;
    }
  };

  return (
    <Container>
      <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
        <Wrapper>
          <Header>
            <Icon type={'leftArrow'} onPress={goBack} />
            <HeaderText>알림설정</HeaderText>
            <Space />
          </Header>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <StyledSwitchList>
                <StyledLitItem>
                  <StyledTextWrapper>
                    <Top03>키워드 알림</Top03>
                    <Top05>설정한 키워드 관련 게시물 알림</Top05>
                  </StyledTextWrapper>
                  <StyledSwitch
                    trackColor={{ false: '#767577', true: '#3a3a3a' }}
                    value={is_keyword}
                    onValueChange={handleChangeKeyword}
                  />
                </StyledLitItem>
                <StyledLitItem>
                  <StyledTextWrapper>
                    <Top03>활동 알림</Top03>
                    <Top05>답글, 좋아요 알림</Top05>
                  </StyledTextWrapper>
                  <StyledSwitch
                    trackColor={{ false: '#767577', true: '#3a3a3a' }}
                    value={is_active}
                    onValueChange={handleChangeActivity}
                  />
                </StyledLitItem>
              </StyledSwitchList>
            </>
          )}
        </Wrapper>
      </SafeAreaView>
    </Container>
  );
};

export default PushSetting;

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

const StyledSwitchList = styled.View`
  flex: 1;
  padding: 32px 0;
`;

const StyledLitItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const StyledTextWrapper = styled.View``;

const Top03 = styled.Text`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #3a3a3a;
`;

const Top05 = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #afafaf;
`;

const StyledSwitch = styled.Switch``;
