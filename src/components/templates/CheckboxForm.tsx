import React, { useState } from 'react';
import styled from '@emotion/native';
import Checkbox from '../atoms/Checkbox';
import Button from '../atoms/Button';
import Icon, { AssetIconType } from '../atoms/Icon';
import Textarea from '../atoms/Textarea';

interface Props {
  title: string;
  description?: string;
  options: Array<{ label: string; value: number; icon?: AssetIconType }>;
  text?: string;
  values?: Array<number>;
  handleOnPress: (value: number) => void;
  handleOnChange?: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const CheckBoxForm: React.FC<Props> = ({
  title,
  description,
  options,
  values = [],
  text,
  handleOnPress,
  handleOnChange,
  onNext,
  onBack,
}) => {
  return (
    <>
      <Header>
        <Icon type={'leftArrow'} onPress={onBack} />
      </Header>
      <TopWrapper>
        <Top03>{title}</Top03>
        {description ? <Top05>{description}</Top05> : null}
      </TopWrapper>
      <Wrapper>
        <ListWrapper>
          {options.map(({ label, value }, index) => (
            <>
              <Margin key={`margin-${index}`} />
              <Checkbox
                key={`box-${index}`}
                title={label}
                checked={values.includes(value)}
                onPress={() => handleOnPress(value)}
              />
            </>
          ))}
          <Margin />
          {handleOnChange && (
            <Textarea
              value={text}
              autoCorrect={false}
              placeholder={'직접입력(100자이내)'}
              onChangeText={handleOnChange}
            />
          )}
        </ListWrapper>
      </Wrapper>
      <Footer>
        <Button
          title={'다 골랐어요.'}
          theme={!text && !values.length ? 'disabled' : 'primary'}
          onPress={() => onNext()}
          disabled={!text && !values.length}
        />
      </Footer>
    </>
  );
};

export default CheckBoxForm;

const Top03 = styled.Text`
  font-size: 24px;
  line-height: 34px;
  font-weight: 600;
  color: #1d1d1d;
  text-align: center;
`;
const Top05 = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #afafaf;
  margin-top: 8px;
  letter-spacing: -0.6px;
`;
const Wrapper = styled.View`
  flex: 1;
`;

const TopWrapper = styled.View`
  width: 100%;
  height: 138px;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.View`
  height: 112px;
  padding-top: 24px;
  width: 100%;
  align-items: center;
`;

const Margin = styled.View`
  height: 8px;
`;

const ListWrapper = styled.ScrollView`
  flex: 1;
`;
const Header = styled.View`
  width: 100%;
  height: 60px;
  justify-content: center;
`;
