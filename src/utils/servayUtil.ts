export const SURVEY_A_LIST: {
  [key: string]: Array<{ label: string; value: any }>;
} = {
  q1: [
    { label: '근육통은 없었어요', value: 1 },
    { label: '접종 부위만 아팠어요', value: 2 },
    { label: '접종한 팔만 아팠어요', value: 3 },
    { label: '겨드랑이가 아팠어요', value: 4 },
    { label: '어깨가 아팠어요', value: 5 },
    { label: '다리가 아팠어요', value: 6 },
    { label: '전신이 아팠어요', value: 7 },
  ],
  q2: [
    { label: '열은 없었어요', value: 1 },
    { label: '37.5도 미만', value: 2 },
    { label: '37.5도 이상 ~ 38도 미만', value: 3 },
    { label: '38도 이상 ~ 39도 미만', value: 4 },
    { label: '39도 이상 ~ 40도 미만', value: 5 },
    { label: '40도 이상', value: 6 },
  ],
  q2_1: [
    { label: '반나절', value: 1 },
    { label: '1일', value: 2 },
    { label: '2일', value: 3 },
    { label: '3일 이상', value: 4 },
  ],
  q3: [
    { label: '없었어요', value: 1 },
    { label: '두통', value: 2 },
    { label: '어지럼증', value: 3 },
    { label: '두통 및 어지럼증', value: 4 },
  ],
  q4: [
    { label: '없었어요', value: 1 },
    { label: '울렁거림 또는 매스꺼움', value: 2 },
    { label: '구토', value: 3 },
    { label: '복통', value: 4 },
    { label: '설사', value: 5 },
  ],
  q5: [
    { label: '평소보다 덜 피곤했어요', value: 1 },
    { label: '평소와 같았어요', value: 2 },
    { label: '평소보다 약간 피곤했어요', value: 3 },
    { label: '평소보다 매우 피곤했어요', value: 4 },
  ],
};

export const SURVEY_B_LIST = {
  q1: [
    { label: '코로나로부터 안전해지고 싶어서요', value: 1 },
    { label: '접종을 꼭 해야되는 직업이에요', value: 2 },
    { label: '일상 생활에 지장받고 싶지 않아서요', value: 3 },
    { label: '주변에서 맞으니 맞아야 할 것 같아서요', value: 4 },
  ],
  q2: [
    { label: '별 생각 없어요', value: 1 },
    { label: '일상 생활에 지장이 있을까봐요', value: 2 },
    { label: '부작용이요', value: 3 },
    { label: '효과가 없을 것 같아요', value: 4 },
    { label: '원하는 백신 종류를 선택하지 못할까봐요', value: 5 },
  ],
};

export const SURVEY_C_LIST = {
  q1: [
    { label: '부작용이 걱정돼서요', value: 1 },
    { label: '맞을 필요성을 느끼지 못해서요', value: 2 },
    { label: '개인적인 신념때문에요', value: 3 },
    { label: '시간 상 여유가 되지 않아서요', value: 4 },
    { label: '원하는 백신 종류를 선택하지 못해서요', value: 5 },
  ],
  q2: [
    { label: '치료제가 나오면 고민해볼게요', value: 1 },
    { label: '백신 효과가 개선되면 고민해볼게요', value: 2 },
    { label: '후기 반응을 좀 더 확인해보고 싶어요', value: 3 },
    { label: '희망하는 백신 접종이 가능하면 맞을게요', value: 4 },
    { label: '음..생각해볼게요', value: 5 },
  ],
};

export const SURVEY_JOIN_LIST = [
  { label: '백신 한 번 이상 맞았어요', value: 1 },
  { label: '곧 1차 맞을 예정이에요', value: 2 },
  { label: '안 맞았어요', value: 3 },
];
