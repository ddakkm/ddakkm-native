import React, { Fragment, useRef, useState } from 'react';
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
import { reviewApi } from '../../api/review';
import { useQueryClient } from 'react-query';
import { firebase } from '@react-native-firebase/analytics';
import { useIsLoggedIn } from '../../contexts/auth';

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
  const queryClient = useQueryClient();
  const is_loading = useRef<boolean>(false);
  const { goBack } = useAppNav();
  const { setIsSurvey } = useIsLoggedIn();
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

  const handleImageSubmit = async (imgs: any) => {
    const images = createFormData(imgs);
    try {
      const result = await reviewApi.postImageUpload({ body: images });
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleSubmitReview = async (
    content?: string,
    imgs?: any,
    keywords?: string[],
  ) => {
    if (is_loading.current) {
      return;
    }
    try {
      is_loading.current = true;
      await firebase.analytics().logEvent('survey_a_page', {
        category: 'A?????? ????????????',
        action: '?????? ????????? ?????? ??????',
      });
      let surveyBody: { [key: string]: any[] } = {};
      for (const [key, values] of Object.entries(surveyA)) {
        const { value, text } = values;
        if (text) {
          surveyBody[key] = [...value, text];
        } else {
          surveyBody[key] = [...value];
        }
      }

      const {
        vaccineType: vaccine_type,
        vaccineRound: vaccine_round,
        dateFrom: date_from,
        isCrossed: is_crossed,
        isPregnant: is_pregnant,
        isUnderlyingDisease: is_underlying_disease,
      } = basicInfo;

      const survey = {
        vaccine_type,
        vaccine_round,
        date_from,
        is_crossed,
        is_pregnant,
        is_underlying_disease,
        data: surveyBody,
      };
      let imgUrls: any = null;

      if (imgs) {
        imgUrls = await handleImageSubmit(imgs);
      }
      await reviewApi.postSurveyReview({
        survey,
        images: imgUrls,
        keywords,
        content,
      });
      queryClient.refetchQueries('review_list');
      goBack();
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      is_loading.current = false;
    }
  };

  const handleCompleteJoin = async (
    content?: string,
    imgs?: any,
    keywords?: string[],
  ) => {
    if (is_loading.current) {
      return;
    }
    try {
      is_loading.current = true;
      const surveyData =
        survey_type[0] === 1
          ? surveyA
          : survey_type[0] === 2
          ? surveyB
          : surveyC;

      let surveyBody: { [key: string]: any[] } = {};
      for (const [key, values] of Object.entries(surveyData)) {
        const { value, text } = values;
        if (text) {
          surveyBody[key] = [...value, text];
        } else {
          surveyBody[key] = [...value];
        }
      }

      const {
        vaccineType: vaccine_type,
        vaccineRound: vaccine_round,
        dateFrom: date_from,
        isCrossed: is_crossed,
        isPregnant: is_pregnant,
        isUnderlyingDisease: is_underlying_disease,
      } = basicInfo;

      let imgUrls: any = null;

      if (imgs) {
        imgUrls = await handleImageSubmit(imgs);
      }

      const body =
        survey_type[0] === 1
          ? {
              survey_type: 'A',
              survey_details: {
                vaccine_type,
                vaccine_round,
                date_from,
                is_crossed,
                is_pregnant,
                is_underlying_disease,
                data: surveyBody,
              },
              review_detail: {
                images: imgUrls,
                keywords,
                content,
              },
            }
          : {
              survey_type: survey_type[0] === 2 ? 'B' : 'C',
              survey_details: surveyBody,
            };

      await reviewApi.postJoinSurvey(body);
      setIsSurvey(true);
      queryClient.refetchQueries('review_list');
      goBack();
    } catch (e) {
      console.log(e);
    } finally {
      is_loading.current = false;
    }
  };

  const surveyBcomponents = [
    <CheckBoxForm
      title={'??????????????? ????????? ????????????????'}
      description="????????? ??????????????????"
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
      onNext={async () => {
        await firebase.analytics().logEvent('survey_b_page', {
          category: 'B?????? ????????????',
          action: '??? ???????????? ?????? ??????',
          label: '?????? ?????? ?????? ??????',
        });
        setStep(prevStep => prevStep + 1);
      }}
      onBack={handleBack}
    />,
    <CheckBoxForm
      title={'????????? ????????? ?????? ????????????????'}
      description="????????? ??????????????????"
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
      onNext={async () => {
        await firebase.analytics().logEvent('survey_b_page', {
          category: 'B?????? ????????????',
          action: '??? ???????????? ?????? ??????',
          label: '?????? ??? ?????? ???????????? ??? ?????? ??????',
        });
        handleCompleteJoin();
      }}
      onBack={handleBack}
    />,
  ];

  const surveyCcomponents = [
    <CheckBoxForm
      title={'??? ???????????? ????????????????'}
      description="????????? ??????????????????"
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
      onNext={async () => {
        await firebase.analytics().logEvent('survey_c_page', {
          category: 'C?????? ????????????',
          action: '??? ???????????? ?????? ??????',
          label: '???????????? ?????? ?????? ?????? ??????',
        });
        setStep(prevStep => prevStep + 1);
      }}
      onBack={handleBack}
    />,
    <CheckBoxForm
      title={'????????? ????????? ?????? ????????????????'}
      description="????????? ??????????????????"
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
      onNext={async () => {
        await firebase.analytics().logEvent('survey_c_page', {
          category: 'C?????? ????????????',
          action: '??? ???????????? ?????? ??????',
          label: '?????? ?????? ?????? ??????',
        });
        handleCompleteJoin();
      }}
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
      title={'???????????? ????????????????'}
      description={'?????? ?????? ????????? ??????????????????.'}
      options={SURVEY_A_LIST.q1}
      values={surveyA.q1.value}
      text={surveyA.q1.text}
      handleOnPress={(value: number) => {
        setSurveyA(prevState => ({
          ...prevState,
          q1: {
            ...prevState.q1,
            value: prevState.q1.value.includes(value)
              ? prevState.q1.value.filter(_value => _value !== value)
              : [...prevState.q1.value, value],
          },
        }));
      }}
      handleOnChange={(value: string) =>
        setSurveyA(prevState => ({
          ...prevState,
          q1: {
            ...prevState.q1,
            text: value,
          },
        }))
      }
      onNext={async () => {
        await firebase.analytics().logEvent('survey_a_page', {
          category: 'A?????? ????????????',
          action: '??? ???????????? ?????? ??????',
          label: '????????? ?????? ?????? ??????',
        });
        setStep(prevStep => prevStep + 1);
      }}
      onBack={handleBack}
    />,
    <CheckBoxForm
      title={'??????????????? ????????????????'}
      description={'????????? ??????????????????'}
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
      onNext={async () => {
        await firebase.analytics().logEvent('survey_a_page', {
          category: 'A?????? ????????????',
          action: '??? ???????????? ?????? ??????',
          label: '?????? ?????? ?????? ??????',
        });
        if (surveyA.q2.value.filter(_value => _value !== 1).length > 0) {
          setStep(prevStep => prevStep + 1);
        } else {
          setStep(prevStep => prevStep + 2);
        }
      }}
      onBack={handleBack}
    />,
    <CheckBoxForm
      title={'????????? ????????????\n????????? ????????????????'}
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
      onNext={async () => {
        await firebase.analytics().logEvent('survey_a_page', {
          category: 'A?????? ????????????',
          action: '??? ???????????? ?????? ??????',
          label: '?????? ?????? ?????? ?????? ??????',
        });
        setStep(prevStep => prevStep + 1);
      }}
      onBack={handleBack}
    />,
    <CheckBoxForm
      title={'?????? ??? ?????????????????? ????????????????'}
      description={'????????? ??????????????????'}
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
      onNext={async () => {
        await firebase.analytics().logEvent('survey_a_page', {
          category: 'A?????? ????????????',
          action: '??? ???????????? ?????? ??????',
          label: '??????, ???????????? ?????? ??????',
        });
        setStep(prevStep => prevStep + 1);
      }}
      onBack={handleBackFever}
    />,
    <CheckBoxForm
      title={'?????? ????????? ????????? ?????????????'}
      description={'?????? ?????? ????????? ??????????????????.'}
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
      onNext={async () => {
        await firebase.analytics().logEvent('survey_a_page', {
          category: 'A?????? ????????????',
          action: '??? ???????????? ?????? ??????',
          label: '??? ?????? ?????? ?????? ??????',
        });
        setStep(prevStep => prevStep + 1);
      }}
      onBack={handleBackFever}
    />,
    <CheckBoxForm
      title={'???????????? ???????????????????'}
      description={'????????? ??????????????????'}
      options={SURVEY_A_LIST.q5}
      values={surveyA.q5.value}
      handleOnPress={(value: number) =>
        setSurveyA(prevState => ({
          ...prevState,
          q5: {
            ...prevState.q5,
            value: prevState.q5.value.includes(value) ? [] : [value],
          },
        }))
      }
      onNext={async () => {
        await firebase.analytics().logEvent('survey_a_page', {
          category: 'A?????? ????????????',
          action: '??? ???????????? ?????? ??????',
          label: '?????? ?????? ?????? ??????',
        });
        setStep(prevStep => prevStep + 1);
      }}
      onBack={handleBack}
    />,
    <ReviewForm onBack={handleBack} onSubmit={handleSubmitReview} />,
  ];

  const surveyJoinAComponents = [
    <BasicInfoForm
      onBack={handleBack}
      basicInfo={basicInfo}
      setBasicInfo={setBasicInfo}
      onNext={() => setStep(prevStep => prevStep + 1)}
    />,
    <CheckBoxForm
      title={'???????????? ????????????????'}
      description={'?????? ?????? ????????? ??????????????????.'}
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
      title={'??????????????? ????????????????'}
      description={'????????? ??????????????????'}
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
      title={'????????? ????????????\n????????? ????????????????'}
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
      title={'?????? ??? ?????????????????? ????????????????'}
      description={'????????? ??????????????????'}
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
      title={'?????? ????????? ????????? ?????????????'}
      description={'?????? ?????? ????????? ??????????????????.'}
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
      title={'???????????? ???????????????????'}
      description={'????????? ??????????????????'}
      options={SURVEY_A_LIST.q5}
      values={surveyA.q5.value}
      handleOnPress={(value: number) =>
        setSurveyA(prevState => ({
          ...prevState,
          q5: {
            ...prevState.q5,
            value: prevState.q5.value.includes(value) ? [] : [value],
          },
        }))
      }
      onNext={() => setStep(prevStep => prevStep + 1)}
      onBack={handleBack}
    />,
    <ReviewForm onBack={handleBack} onSubmit={handleCompleteJoin} />,
  ];

  const surveyJoinComponents = () => {
    const BASE_COMPONENT = [
      <CheckBoxForm
        title={'????????? ????????????! ?????? ????????? ?????????????'}
        options={SURVEY_JOIN_LIST}
        values={survey_type}
        handleOnPress={(value: number) =>
          setSurveyType(prevState => (prevState.includes(value) ? [] : [value]))
        }
        onNext={async () => {
          await firebase.analytics().logEvent('login_page', {
            category:
              survey_type[0] === 1
                ? 'A?????? ????????????'
                : survey_type[0] === 2
                ? 'B?????? ????????????'
                : 'C?????? ????????????',
            action: '??????',
          });
          setStep(prevStep => prevStep + 1);
        }}
        onBack={handleBack}
      />,
    ];

    switch (survey_type[0]) {
      case 1:
        return [...BASE_COMPONENT, ...surveyJoinAComponents];
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
