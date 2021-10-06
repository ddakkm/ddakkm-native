import React, {useState} from 'react';
import styled from '@emotion/native';
import Icon from '../atoms/Icon';
import CheckBoxForm from './CheckboxForm';

const SurveyForm = () => {
  const [step, setStep] = useState(0);

  const handleBack = () => {};

  return (
    <Container>
      <Header>
        <Icon type={'leftArrow'} onPress={handleBack} />
      </Header>
      <CheckBoxForm
        title={'근육통이 있으신가요?'}
        description={'있던 증상 모두를 선택해주세요.'}
        options={[
          {label: '근육통', value: '근육통'},
          {label: '근육통', value: '근육통'},
          {label: '근육통', value: '근육통'},
          {label: '근육통', value: '근육통'},
          {label: '근육통', value: '근육통'},
          {label: '근육통', value: '근육통'},
          {label: '근육통', value: '근육통'},
          {label: '근육통', value: '근육통'},
          {label: '근육통', value: '근육통'},
          {label: '근육통', value: '근육통'},
          {label: '근육통', value: '근육통'},
          {label: '근육통', value: '근육통'},
        ]}
      />
    </Container>
  );
};

export default SurveyForm;

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  width: 100%;
  height: 60px;
`;
