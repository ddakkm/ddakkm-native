import React from 'react';
import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/atoms/Icon';
import { useAppNav, useAppRoute } from '../hooks/useNav';
import SelectBox from '../components/atoms/SelectBox';
import FixedBottomMenuModal from '../components/atoms/FixedBottomMenuModal';
import Button from '../components/atoms/Button';
import { Platform } from 'react-native';
import { reviewApi } from '../api/review';
import Popup from '../components/atoms/Popup';

const Report = () => {
  const { goBack } = useAppNav();
  const is_loading = React.useRef(false);
  const { params } = useAppRoute<'/report'>();
  const [is_visible, setIsVisible] = React.useState(false);
  const [selected_value, setSelectValue] = React.useState('');
  const [reason, setReason] = React.useState(0);
  const [is_complete, setIsComplete] = React.useState(false);

  const options = [
    {
      label: '부적절한 홍보 / 영리목적',
      sub_label: '상업적, 홍보, 영리, 불법적인 정보를 제공하는 행위',
      handlePress: () => {
        setSelectValue('부적절한 홍보 / 영리목적');
        setReason(1);
        setIsVisible(false);
      },
    },
    {
      label: '욕설 / 반말 / 부적절한 언어 사용',
      sub_label:
        '욕설, 혐오표현 등 타인의 감정을 상하게 하거나\n불쾌감을 유발하는 행위',
      handlePress: () => {
        setSelectValue('욕설 / 반말 / 부적절한 언어 사용');
        setReason(2);
        setIsVisible(false);
      },
    },
    {
      label: '도배 / 스팸성',
      sub_label:
        '동일한 내용을 반복적으로 등록하거나\n유해한 내용을 게시하는 행위',
      handlePress: () => {
        setSelectValue('도배 / 스팸성');
        setReason(3);
        setIsVisible(false);
      },
    },
    {
      label: '분란 유도',
      sub_label:
        '확인되지 않은 정보 혹은 친목,\n단합 등을 통해 분란을 유도하는 행위',
      handlePress: () => {
        setSelectValue('분란 유도');
        setReason(4);
        setIsVisible(false);
      },
    },
  ];

  const handleReport = async () => {
    if (is_loading.current) {
      return;
    }
    try {
      is_loading.current = true;
      if (params.review_id) {
        await reviewApi.reportReview({ review_id: params.review_id, reason });
        setIsComplete(true);
      } else if (params.comment_id) {
        await reviewApi.reportComment({
          comment_id: params.comment_id,
          reason,
        });
        setIsComplete(true);
      }
    } catch {
      /** */
    } finally {
      is_loading.current = false;
    }
  };

  const handleOk = () => {
    goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Container>
        <Header>
          <Space />
          <HeaderText>신고</HeaderText>
          <Icon type={'close'} onPress={goBack} />
        </Header>
        <Body>
          <Top03>신고 사유를 선택해주세요.</Top03>
          <SelectBox
            title={''}
            selectedValue={selected_value}
            placeholder="신고 사유를 선택해주세요."
            onPress={() => setIsVisible(true)}
          />
          <FixedWrapper>
            <Button
              title={'신고하기'}
              onPress={handleReport}
              theme={selected_value ? 'primary' : 'disabled'}
              disabled={selected_value ? false : true}
            />
          </FixedWrapper>
          {Platform.OS === 'android' && <AndroidPadding />}
        </Body>
        <FixedBottomMenuModal
          isVisible={is_visible}
          handleVisible={setIsVisible}
          title="신고사유 선택"
          options={options}
        />
        <Popup
          title="신고가 완료되었습니다."
          isVisible={is_complete}
          handleVisible={setIsComplete}
          onOk={handleOk}
          ok_text="확인"
        />
      </Container>
    </SafeAreaView>
  );
};

export default Report;

const AndroidPadding = styled.View`
  width: 100%;
  height: 32px;
`;

const FixedWrapper = styled.View`
  width: 100%;
  position: absolute;
  left: 24px;
  bottom: 0;
`;

const Container = styled.View`
  flex: 1;
`;
const Header = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 24px;
  border-bottom-color: #f7f7f7;
  border-bottom-width: 1px;
`;
const HeaderText = styled.Text`
  font-weight: 600;
  font-size: 18px;
`;
const Space = styled.View`
  width: 24px;
  height: 24px;
`;

const Body = styled.View`
  padding: 24px;
  flex: 1;
`;

const Top03 = styled.Text`
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
`;
