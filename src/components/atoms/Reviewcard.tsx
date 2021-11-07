import React from 'react';
import styled, { css } from '@emotion/native';
import Icon, { AssetIconType } from './Icon';
import { SURVEY_A_LIST } from '../../utils/servayUtil';

interface Props {
  id: number;
  nickname: string;
  vaccine_round: string;
  vaccine_type: string;
  like_count: number;
  comment_count: number;
  user_is_like: boolean;
  symptom: {
    [key: string]: Array<number | string>;
  };
}

const convertTypeToText = (value: string) => {
  switch (value) {
    case 'ETC':
      return '기타';
    case 'PFIZER':
      return '화이자';
    case 'AZ':
      return '아스트라제네카';
    case 'MODERNA':
      return '모더나';
    case 'JANSSEN':
      return '얀센';
  }
};

const convertRoundToText = (value: string) => {
  switch (value) {
    case 'FIRST':
      return '1회차';
    case 'SECOND':
      return '2회차';
    case 'THIRD':
      return '부스타샷';
    default:
      return '';
  }
};

const convertQuestionToText = (key: string) => {
  switch (key) {
    case 'q1':
      return '근육통';
    case 'q2':
      return '발열';
    case 'q3':
      return '두통,어지럼증';
    case 'q4':
      return '속 불편';
    case 'q5':
      return '피곤정도';
    case 'q6':
      return '자유후기 이모지';
    default:
      return '';
  }
};

const convertQuestionToIcon = (key: string): AssetIconType => {
  switch (key) {
    case 'q1':
      return 'imojiArm';
    case 'q2':
      return 'imojiFever';
    case 'q3':
      return 'brain';
    case 'q4':
      return 'imojiFeelverysad';
    case 'q5':
      return 'imojiLowfever';
    case 'q6':
      return 'imojiArm';
    default:
      return 'imojiArm';
  }
};

const convertAnswerToText = (
  value: number | Array<number | string>,
): number => {
  if (typeof value === 'number') {
    return value;
  } else {
    return Number(value[0]);
  }
};

const Reviewcard = ({
  id,
  nickname,
  vaccine_round,
  vaccine_type,
  like_count,
  comment_count,
  user_is_like,
  symptom,
}: Props) => {
  return (
    <Container>
      <NicknameText>{nickname}</NicknameText>
      <VaccineText>
        {convertRoundToText(vaccine_round)} · {convertTypeToText(vaccine_type)}
      </VaccineText>
      <CardListWrapper>
        {symptom
          ? Object.entries(symptom).map(
              ([key, value]: [string, Array<number | string>]) => (
                <CardRowWrapper key={key}>
                  <Icon type={convertQuestionToIcon(key)} />
                  <CardText>
                    {convertQuestionToText(key)} -{' '}
                    {SURVEY_A_LIST[key][convertAnswerToText(value)].label}
                  </CardText>
                </CardRowWrapper>
              ),
            )
          : null}
      </CardListWrapper>
      <Cardfooter>
        <Icon type={'heart'} onPress={() => {}} />
        <Footertext>{like_count}</Footertext>
        <Icon type={'message'} style={{ marginLeft: 9 }} />
        <Footertext>{comment_count}</Footertext>
      </Cardfooter>
    </Container>
  );
};

export default Reviewcard;

const Container = styled.View`
  width: 100%;
  padding: 24px 0 34px 0;
`;

const NicknameText = styled.Text`
  font-weight: 400;
  font-size: 12px;
  color: #a5a5a5;
`;

const VaccineText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: #232b3a;
  margin-top: 4px;
  margin-bottom: 12px;
`;

const CardRowWrapper = styled.View`
  width: 100%;
  padding: 12px;
  border-width: 1px;
  border-color: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 4px;
  flex-direction: row;
  align-items: center;
`;

const text = () => css`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #000;
`;

const CardText = styled.Text`
  ${text()};
  margin-left: 6px;
`;

const CardListWrapper = styled.View``;

const Cardfooter = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

const Footertext = styled.Text`
  font-weight: 400;
  font-size: 12px;
  color: #a5a5a5;
  margin-left: 3px;
`;
