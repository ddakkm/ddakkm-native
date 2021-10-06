import React, {useState} from 'react';
import styled from '@emotion/native';
import Button from '../components/atoms/Button';
import Checkbox from '../components/atoms/Checkbox';
import {SafeAreaView} from 'react-native-safe-area-context';
import CheckBoxForm from '../components/templates/CheckboxForm';

const Home = () => {
  return (
    <Container>
      <SafeAreaView style={{backgroundColor: '#fff'}} />
      <Wrapper>
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
      </Wrapper>
    </Container>
  );
};

export default Home;

const Container = styled.View`
  flex: 1;
  padding: 0px 24px;
  background-color: #fff;
`;

const Wrapper = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

const CustomInput = styled.TextInput`
  width: 100%;
  line-height: 22px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  height: 56px;
  font-weight: 400;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
