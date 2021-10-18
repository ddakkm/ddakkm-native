import React, { useState } from 'react';
import styled from '@emotion/native';
import Icon from '../atoms/Icon';

import Button from '../atoms/Button';
import SelectBox from '../atoms/SelectBox';
import Buttonbox from '../atoms/Buttonbox';
import {
  BasicInfoProps,
  DateFrom,
  VaccineRound,
  VaccineType,
} from './SurveyForm';
import SelectModal from '../atoms/SelectModal';

interface Props {
  onBack: () => void;
  basicInfo: BasicInfoProps;
  setBasicInfo: React.Dispatch<React.SetStateAction<BasicInfoProps>>;
  onNext: () => void;
}

const BasicInfoForm = ({ onBack, basicInfo, setBasicInfo, onNext }: Props) => {
  const [isVisibleRound, setIsVisibleRound] = useState(false);
  const [isVisibleVaccineType, setIsVisibleVaccineType] = useState(false);
  const [isVisibleDateFrom, setIsVisibleDateFrom] = useState(false);
  const { isCrossed, isPregnant, isUnderlyingDisease } = basicInfo;

  const isNext =
    Object.values(basicInfo).filter(value => value === null).length === 0;

  return (
    <>
      <Header>
        <Icon type={'leftArrow'} onPress={onBack} />
        <HeaderText>기본 입력 정보</HeaderText>
        <Space />
      </Header>
      <Wrapper>
        <SelectBox
          title={'접종회차'}
          placeholder={'접종회차를 선택해주세요'}
          selectedValue={
            roundOptions.find(({ value }) => value === basicInfo.vaccineRound)
              ?.label || ''
          }
          onPress={() => {
            setIsVisibleRound(true);
          }}
        />
        <SelectBox
          title={'백신종류'}
          placeholder={'백신종류를 선택해주세요'}
          selectedValue={
            vaccineTypeOptions.find(
              ({ value }) => value === basicInfo.vaccineType,
            )?.label || ''
          }
          onPress={() => {
            setIsVisibleVaccineType(true);
          }}
        />
        <Buttonbox
          title={'교차접종'}
          value={isCrossed}
          handlePress={(value: boolean) => {
            setBasicInfo(prevState => ({
              ...prevState,
              isCrossed: value,
            }));
          }}
        />
        <Buttonbox
          title={'임신'}
          value={isPregnant}
          handlePress={(value: boolean) => {
            setBasicInfo(prevState => ({ ...prevState, isPregnant: value }));
          }}
        />
        <Buttonbox
          title={'기저질환'}
          value={isUnderlyingDisease}
          handlePress={(value: boolean) => {
            setBasicInfo(prevState => ({
              ...prevState,
              isUnderlyingDisease: value,
            }));
          }}
        />
        <SelectBox
          title={'백신 접종일로부터'}
          placeholder={'백신 맞고 지난 일 수를 선택해주세요'}
          selectedValue={
            dateFromOptions.find(({ value }) => value === basicInfo.dateFrom)
              ?.label || ''
          }
          onPress={() => {
            setIsVisibleDateFrom(true);
          }}
        />
      </Wrapper>
      <Footer>
        <Button
          theme={isNext ? 'primary' : 'disabled'}
          title={'동의 완료 했어요'}
          onPress={() => onNext()}
          disabled={!isNext}
        />
      </Footer>
      <SelectModal
        isVisible={isVisibleRound}
        handleVisible={setIsVisibleRound}
        title={'접종회차'}
        options={roundOptions}
        selectOption={(vaccineRound: VaccineRound) => {
          setBasicInfo(prevState => ({ ...prevState, vaccineRound }));
        }}
      />
      <SelectModal
        isVisible={isVisibleVaccineType}
        handleVisible={setIsVisibleVaccineType}
        title={'백신종류'}
        options={vaccineTypeOptions}
        selectOption={(vaccineType: VaccineType) => {
          setBasicInfo(prevState => ({ ...prevState, vaccineType }));
        }}
      />
      <SelectModal
        isVisible={isVisibleDateFrom}
        handleVisible={setIsVisibleDateFrom}
        title={'백신 접종일로부터'}
        options={dateFromOptions}
        selectOption={(dateFrom: DateFrom) => {
          setBasicInfo(prevState => ({ ...prevState, dateFrom }));
        }}
      />
    </>
  );
};

export default BasicInfoForm;

const roundOptions: { label: string; value: VaccineRound }[] = [
  {
    label: '1차',
    value: 'FIRST',
  },
  {
    label: '2차',
    value: 'SECOND',
  },
  {
    label: '부스터샷',
    value: 'THIRD',
  },
];

const vaccineTypeOptions: { label: string; value: VaccineType }[] = [
  {
    label: '모더나',
    value: 'MODERNA',
  },
  {
    label: '화이자',
    value: 'PFIZER',
  },
  {
    label: '아스트라제네카',
    value: 'AZ',
  },
  {
    label: '얀센',
    value: 'JANSSEN',
  },
  {
    label: '기타',
    value: 'ETC',
  },
];

const dateFromOptions: { label: string; value: DateFrom }[] = [
  {
    label: '당일',
    value: 'ZERO_DAY',
  },
  {
    label: '2일차',
    value: 'TWO_DAY',
  },
  {
    label: '3일차',
    value: 'THREE_DAY',
  },
  {
    label: '5일차 이상',
    value: 'OVER_FIVE',
  },
  {
    label: '1주일 이상',
    value: 'OVER_WEEK',
  },
  {
    label: '1달 이상',
    value: 'OVER_MONTH',
  },
];

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
