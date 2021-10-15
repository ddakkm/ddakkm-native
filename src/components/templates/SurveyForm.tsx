import React, { Fragment, useState } from 'react';
import styled from '@emotion/native';
import Icon from '../atoms/Icon';
import CheckBoxForm from './CheckboxForm';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import BasicInfoForm from './BasicInfoForm';

const SurveyForm = () => {
  const [step, setStep] = useState(0);
  const [basicInfo, setBasicInfo] = useState<{
    vaccineType: 'ETC' | 'PFIZER' | 'AZ' | 'MODERNA' | 'JANSSEN' | null;
    vaccineRound: 'FIRST' | 'SECOND' | 'THIRD' | null;
    dateFrom:
      | 'ZERO_DAY'
      | 'TWO_DAY'
      | 'THREE_DAY'
      | 'OVER_FIVE'
      | 'OVER_WEEK'
      | 'OVER_MONTH'
      | null;
    isCrossed: 'y' | 'n' | null;
    isPregnant: 'y' | 'n' | null;
    isUnderlyingDisease: 'y' | 'n' | null;
  }>({
    vaccineType: null,
    vaccineRound: null,
    dateFrom: null,
    isCrossed: null,
    isPregnant: null,
    isUnderlyingDisease: null,
  });
  const [surveyA, setSurveyA] = useState<{
    [key: string]: { value: number[]; text: string };
  }>({
    q1: { value: [], text: '' },
    q2: { value: [], text: '' },
    q2_1: { value: [], text: '' },
    q3: { value: [], text: '' },
    q4: { value: [], text: '' },
    q5: { value: [], text: '' },
  });

  const handleBack = () => {
    if (step > 0) {
      setStep(prevStep => prevStep - 1);
    }
  };

  const handleBackFever = () => {
    if (surveyA.q2_1.value.length > 0) {
      setStep(prevStep => prevStep - 1);
    } else {
      setStep(prevStep => prevStep - 2);
    }
  };
  const surveyAComponents = [
    <CheckBoxForm
      title={'근육통이 있으신가요?'}
      description={'있던 증상 모두를 선택해주세요.'}
      options={[
        { label: '근육통은 없었어요', value: 1 },
        { label: '접종 부위만 아팠어요', value: 2 },
        { label: '접종한 팔만 아팠어요', value: 3 },
        { label: '겨드랑이가 아팠어요', value: 4 },
        { label: '어깨가 아팠어요', value: 5 },
        { label: '다리가 아팠어요', value: 6 },
        { label: '전신이 아팠어요', value: 7 },
      ]}
      values={surveyA.q1.value}
      text={surveyA.q1.text}
      handleOnPress={(value: number) =>
        setSurveyA(prevState => ({
          ...prevState,
          q1: {
            ...prevState.q1,
            value: prevState.q1.value.includes(value)
              ? prevState.q1.value.filter(_value => _value !== value)
              : [...prevState.q1.value, value],
          },
        }))
      }
      handleOnChange={(value: string) =>
        setSurveyA(prevState => ({
          ...prevState,
          q1: {
            ...prevState.q1,
            text: value,
          },
        }))
      }
      onNext={() => setStep(prevStep => prevStep + 1)}
      onBack={handleBack}
    />,
    <CheckBoxForm
      title={'발열증상이 있으셨나요?'}
      description={'하나만 선택해주세요'}
      options={[
        { label: '열은 없었어요', value: 1 },
        { label: '37.5도 미만', value: 2 },
        { label: '37.5도 이상 ~ 38도 미만', value: 3 },
        { label: '38도 이상 ~ 39도 미만', value: 4 },
        { label: '39도 이상 ~ 40도 미만', value: 5 },
        { label: '40도 이상', value: 6 },
      ]}
      values={surveyA.q2.value}
      handleOnPress={(value: number) =>
        setSurveyA(prevState => ({
          ...prevState,
          q2: {
            ...prevState.q2,
            value: prevState.q2.value.includes(value) ? [] : [value],
          },
        }))
      }
      onNext={() => {
        if (surveyA.q2.value.filter(_value => _value !== 1).length > 0) {
          setStep(prevStep => prevStep + 1);
        } else {
          setStep(prevStep => prevStep + 2);
        }
      }}
      onBack={handleBack}
    />,
    <CheckBoxForm
      title={'발열이 있었다면\n얼마나 지속됐나요?'}
      options={[
        { label: '반나절', value: 1 },
        { label: '1일', value: 2 },
        { label: '2일', value: 3 },
        { label: '3일 이상', value: 4 },
      ]}
      values={surveyA.q2_1.value}
      handleOnPress={(value: number) =>
        setSurveyA(prevState => ({
          ...prevState,
          q2_1: {
            ...prevState.q2_1,
            value: prevState.q2_1.value.includes(value) ? [] : [value],
          },
        }))
      }
      onNext={() => setStep(prevStep => prevStep + 1)}
      onBack={handleBack}
    />,
    <CheckBoxForm
      title={'속이 불편한 증상은 있었나요?'}
      description={'있던 증상 모두를 선택해주세요.'}
      options={[
        { label: '없었어요', value: 1 },
        { label: '울렁거림 또는 매스꺼움', value: 2 },
        { label: '구토', value: 3 },
        { label: '복통', value: 4 },
        { label: '설사', value: 5 },
      ]}
      values={surveyA.q3.value}
      text={surveyA.q3.text}
      handleOnPress={(value: number) =>
        setSurveyA(prevState => ({
          ...prevState,
          q3: {
            ...prevState.q3,
            value: prevState.q3.value.includes(value)
              ? prevState.q3.value.filter(_value => _value !== value)
              : [...prevState.q3.value, value],
          },
        }))
      }
      handleOnChange={(value: string) =>
        setSurveyA(prevState => ({
          ...prevState,
          q3: {
            ...prevState.q3,
            text: value,
          },
        }))
      }
      onNext={() => setStep(prevStep => prevStep + 1)}
      onBack={handleBackFever}
    />,
    <CheckBoxForm
      title={'평소보다 피곤하셨나요?'}
      description={'하나만 선택해주세요'}
      options={[
        { label: '평소보다 덜 피곤했어요', value: 1 },
        { label: '평소와 같았어요', value: 2 },
        { label: '평소보다 약간 피곤했어요', value: 3 },
        { label: '평소보다 매우 피곤했어요', value: 4 },
      ]}
      values={surveyA.q4.value}
      handleOnPress={(value: number) =>
        setSurveyA(prevState => ({
          ...prevState,
          q4: {
            ...prevState.q4,
            value: prevState.q4.value.includes(value) ? [] : [value],
          },
        }))
      }
      onNext={() => {
        setStep(prevStep => prevStep + 1);
      }}
      onBack={handleBack}
    />,
  ];

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Wrapper>
          <BasicInfoForm onBack={() => {}} />
          {/* {surveyAComponents.map((component, index) => {
            if (index === step) {
              return <Fragment key={index}>{component}</Fragment>;
            }

            return null;
          })} */}
        </Wrapper>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default SurveyForm;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Header = styled.View`
  width: 100%;
  height: 60px;
  justify-content: center;
`;

const Wrapper = styled.View`
  flex: 1;
`;
