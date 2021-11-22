import { AssetIconType } from '../components/atoms/Icon';

export const sexOptions = [
  {
    label: '전체',
    value: '',
  },
  {
    label: '남자',
    value: 'MALE',
  },
  {
    label: '여자',
    value: 'FEMALE',
  },
];

export const vaccineTypeOptions = [
  {
    label: '전체',
    value: '',
  },
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

export const crossOptions = [
  {
    label: '전체',
    value: '',
  },
  {
    label: '교차접종 O',
    value: 'true',
  },
  {
    label: '교차접종 X',
    value: 'false',
  },
];

export const roundOptions = [
  {
    label: '전체',
    value: '',
  },
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

export const pregnantOptions = [
  {
    label: '전체',
    value: '',
  },
  {
    label: '임신 O',
    value: 'true',
  },
  {
    label: '임신 X',
    value: 'false',
  },
];

export const underlyingDiseaseOptions = [
  {
    label: '전체',
    value: '',
  },
  {
    label: '기저질환 O',
    value: 'true',
  },
  {
    label: '기저질환 X',
    value: 'false',
  },
];

export const ageOptions = [
  {
    label: '전체',
    value: '',
  },
  {
    label: '20대',
    value: '20',
  },
  {
    label: '30대',
    value: '30',
  },
  {
    label: '40대',
    value: '40',
  },
  {
    label: '50대',
    value: '50',
  },
  {
    label: '60대',
    value: '60',
  },
];

export const convertTypeToText = (value?: string) => {
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
    default:
      return '';
  }
};

export const convertRoundToText = (value?: string) => {
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

export const convertQuestionToText = (key: string) => {
  switch (key) {
    case 'q1':
      return '근육통';
    case 'q2':
      return '발열';
    case 'q2_1':
      return '발열기간';
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

export const convertQuestionToIcon = (key: string): AssetIconType => {
  switch (key) {
    case 'q1':
      return 'imojiArm';
    case 'q2':
      return 'imojiFever';
    case 'q2_1':
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
      return 'imojiChat';
  }
};

export const convertAnswerToText = (
  value: number | Array<number | string>,
): number => {
  if (typeof value === 'number') {
    return value;
  } else {
    return Number(value[0]);
  }
};
