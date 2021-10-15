import { createContext } from 'react';

type SurveyType = 'A' | 'B' | 'C' | 'JOIN' | null;

interface SurveyProviderContextProps {
  step: number;
  serveyType: SurveyType;
  data: {
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
    surveyA: {
      q1: Array<number>;
      q1_text: '';
      q2: Array<number>;
      q2_1: Array<number> | null;
      q3: number[];
      q4: number[];
      q5: number[];
    };
    surveyB: {
      [key: string]: [number | string];
    };
    surveyC: {
      [key: string]: [number | string];
    };
  };
}

export const SurveyProviderContext = createContext<SurveyProviderContextProps>({
  step: 0,
  serveyType: null,
  data: {
    vaccineType: null,
    vaccineRound: null,
    dateFrom: null,
    surveyA: {
      q1: [],
      q1_text: '',
      q2: [],
      q2_1: null,
      q3: [],
      q4: [],
      q5: [],
    },
    surveyB: {},
    surveyC: {},
  },
});
