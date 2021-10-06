import React from 'react';
import styled from '@emotion/native';
import {FlatList, StyleSheet} from 'react-native';
import Checkbox from '../atoms/Checkbox';
import Button from '../atoms/Button';

interface Props {
  title: string;
  description?: string;
  options: Array<{label: string; value: string}>;
  values?: Array<string>;
}

const CheckBoxForm: React.FC<Props> = ({
  title,
  description,
  options,
  values = [],
}) => {
  return (
    <>
      <TopWrapper>
        <Top03>{title}</Top03>
        {description ? <Top05>{description}</Top05> : null}
      </TopWrapper>
      <Wrapper>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={options}
          keyExtractor={(_, index) => `checkbox-${title}-${index}`}
          ItemSeparatorComponent={Margin}
          renderItem={({item: {label, value}}) => (
            <Checkbox title={label} checked={values.includes(value)} />
          )}
        />
      </Wrapper>
      <Footer>
        <Button title={'다 골랐어요.'} theme={'primary'} />
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

const styles = StyleSheet.create({
  flatList: {
    paddingTop: 8,
  },
});

const Margin = styled.View`
  height: 8px;
`;
