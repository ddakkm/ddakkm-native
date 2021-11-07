import React, { Fragment, useState } from 'react';
import styled from '@emotion/native';
import CheckBoxForm from './CheckboxForm';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import BasicInfoForm from './BasicInfoForm';
import ReviewForm from './ReviewForm';
import {
  SURVEY_A_LIST,
  SURVEY_B_LIST,
  SURVEY_C_LIST,
  SURVEY_JOIN_LIST,
} from '../../utils/servayUtil';
import { useAppNav } from '../../hooks/useNav';

export type VaccineType =
  | 'ETC'
  | 'PFIZER'
  | 'AZ'
  | 'MODERNA'
  | 'JANSSEN'
  | null;

export type VaccineRound = 'FIRST' | 'SECOND' | 'THIRD' | null;
export type DateFrom =
  | 'ZERO_DAY'
  | 'TWO_DAY'
  | 'THREE_DAY'
  | 'OVER_FIVE'
  | 'OVER_WEEK'
  | 'OVER_MONTH'
  | null;

export interface BasicInfoProps {
  vaccineType: VaccineType;
  vaccineRound: VaccineRound;
  dateFrom: DateFrom;
  isCrossed: boolean | null;
  isPregnant: boolean | null;
  isUnderlyingDisease: boolean | null;
}

interface Props {
  surveyType?: 'JOIN';
}

const SurveyForm = ({ surveyType }: Props) => {
  const { goBack } = useAppNav();
  const [step, setStep] = useState(0);
  const [survey_type, setSurveyType] = useState<number[]>([]);
  const [basicInfo, setBasicInfo] = useState<BasicInfoProps>({
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
  const [surveyB, setSurveyB] = useState<{
    [key: string]: { value: number[]; text: string };
  }>({
    q1: { value: [], text: '' },
    q2: { value: [], text: '' },
  });
  const [surveyC, setSurveyC] = useState<{
    [key: string]: { value: number[]; text: string };
  }>({
    q1: { value: [], text: '' },
    q2: { value: [], text: '' },
  });

  const handleBack = () => {
    if (step > 0) {
      setStep(prevStep => prevStep - 1);
    } else {
      goBack();
    }
  };

  const handleBackFever = () => {
    if (surveyA.q2_1.value.length > 0) {
      setStep(prevStep => prevStep - 1);
    } else {
      setStep(prevStep => prevStep - 2);
    }
  };

  const surveyBcomponents = [
    <CheckBoxForm
      title={'접종하려는 이유가 무엇인가요?'}
      description="하나만 선택해주세요"
      options={SURVEY_B_LIST.q1}
      values={surveyB.q1.value}
      text={surveyB.q1.text}
      handleOnPress={(value: number) =>
        setSurveyB(prevState => ({
          ...prevState,
          q1: {
            value: prevState.q1.value.includes(value) ? [] : [value],
            text: '',
          },
        }))
      }
      handleOnChange={(value: string) =>
        setSurveyB(prevState => ({
          ...prevState,
          q1: {
            value: [],
            text: value,
          },
        }))
      }
      onNext={() => setStep(prevStep => prevStep + 1)}
      onBack={handleBack}
    />,
    <CheckBoxForm
      title={'접종시 무엇이 가장 우려되나요?'}
      description="하나만 선택해주세요"
      options={SURVEY_B_LIST.q2}
      values={surveyB.q2.value}
      text={surveyB.q2.text}
      handleOnPress={(value: number) =>
        setSurveyB(prevState => ({
          ...prevState,
          q2: {
            ...prevState.q2,
            value: prevState.q2.value.includes(value) ? [] : [value],
          },
        }))
      }
      onNext={() => setStep(prevStep => prevStep + 1)}
      onBack={handleBack}
    />,
  ];

  const surveyCcomponents = [
    <CheckBoxForm
      title={'왜 접종하지 않으셨나요?'}
      description="하나만 선택해주세요"
      options={SURVEY_C_LIST.q1}
      values={surveyC.q1.value}
      text={surveyC.q1.text}
      handleOnPress={(value: number) =>
        setSurveyC(prevState => ({
          ...prevState,
          q1: {
            value: prevState.q1.value.includes(value) ? [] : [value],
            text: '',
          },
        }))
      }
      handleOnChange={(value: string) =>
        setSurveyC(prevState => ({
          ...prevState,
          q1: {
            text: value,
            value: [],
          },
        }))
      }
      onNext={() => setStep(prevStep => prevStep + 1)}
      onBack={handleBack}
    />,
    <CheckBoxForm
      title={'접종시 무엇이 가장 우려되나요?'}
      description="하나만 선택해주세요"
      options={SURVEY_C_LIST.q2}
      values={surveyC.q2.value}
      text={surveyC.q2.text}
      handleOnPress={(value: number) =>
        setSurveyC(prevState => ({
          ...prevState,
          q2: {
            ...prevState.q2,
            value: prevState.q2.value.includes(value) ? [] : [value],
          },
        }))
      }
      onNext={() => setStep(prevStep => prevStep + 1)}
      onBack={handleBack}
    />,
  ];

  const surveyAComponents = [
    <BasicInfoForm
      onBack={handleBack}
      basicInfo={basicInfo}
      setBasicInfo={setBasicInfo}
      onNext={() => setStep(prevStep => prevStep + 1)}
    />,
    <CheckBoxForm
      title={'근육통이 있으신가요?'}
      description={'있던 증상 모두를 선택해주세요.'}
      options={SURVEY_A_LIST.q1}
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
      options={SURVEY_A_LIST.q2}
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
      options={SURVEY_A_LIST.q2_1}
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
      title={'두통 및 어지러움증이 있으셨나요?'}
      description={'하나만 선택해주세요'}
      options={SURVEY_A_LIST.q3}
      values={surveyA.q3.value}
      text={surveyA.q3.text}
      handleOnPress={(value: number) =>
        setSurveyA(prevState => ({
          ...prevState,
          q3: {
            value: prevState.q3.value.includes(value) ? [] : [value],
            text: '',
          },
        }))
      }
      handleOnChange={(value: string) =>
        setSurveyA(prevState => ({
          ...prevState,
          q3: {
            value: [],
            text: value,
          },
        }))
      }
      onNext={() => setStep(prevStep => prevStep + 1)}
      onBack={handleBackFever}
    />,
    <CheckBoxForm
      title={'속이 불편한 증상은 있었나요?'}
      description={'있던 증상 모두를 선택해주세요.'}
      options={SURVEY_A_LIST.q4}
      values={surveyA.q4.value}
      text={surveyA.q4.text}
      handleOnPress={(value: number) =>
        setSurveyA(prevState => ({
          ...prevState,
          q4: {
            ...prevState.q4,
            value: prevState.q4.value.includes(value)
              ? prevState.q4.value.filter(_value => _value !== value)
              : [...prevState.q4.value, value],
          },
        }))
      }
      handleOnChange={(value: string) =>
        setSurveyA(prevState => ({
          ...prevState,
          q4: {
            ...prevState.q4,
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
      options={SURVEY_A_LIST.q5}
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
    <ReviewForm onBack={handleBack} />,
  ];

  const surveyJoinComponents = () => {
    const BASE_COMPONENT = [
      <CheckBoxForm
        title={'만나서 반가워요! 백신 접종은 하셨나요?'}
        options={SURVEY_JOIN_LIST}
        values={survey_type}
        handleOnPress={(value: number) =>
          setSurveyType(prevState => (prevState.includes(value) ? [] : [value]))
        }
        onNext={() => setStep(prevStep => prevStep + 1)}
        onBack={handleBack}
      />,
    ];

    switch (survey_type[0]) {
      case 1:
        return [...BASE_COMPONENT, ...surveyAComponents];
      case 2:
        return [...BASE_COMPONENT, ...surveyBcomponents];
      case 3:
        return [...BASE_COMPONENT, ...surveyCcomponents];
      default:
        return [...BASE_COMPONENT];
    }
  };

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Wrapper>
          {surveyType
            ? surveyJoinComponents().map((component, index) => {
                if (index === step) {
                  return <Fragment key={index}>{component}</Fragment>;
                }

                return null;
              })
            : surveyAComponents.map((component, index) => {
                if (index === step) {
                  return <Fragment key={index}>{component}</Fragment>;
                }

                return null;
              })}
        </Wrapper>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default SurveyForm;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Wrapper = styled.View`
  flex: 1;
`;