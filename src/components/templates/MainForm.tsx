import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/native';
import Icon, { AssetIconType } from '../atoms/Icon';
import Filterbutton from '../atoms/Filterbutton';
import SelectModal from '../atoms/SelectModal';
import Reviewcard from '../atoms/Reviewcard';
import {
  ageOptions,
  sexOptions,
  vaccineTypeOptions,
  crossOptions,
  roundOptions,
  pregnantOptions,
  underlyingDiseaseOptions,
} from '../../utils/filterUtil';
import { FlatList, Platform, StyleSheet } from 'react-native';
import { useIsLoggedIn } from '../../contexts/auth';
import { useAppNav } from '../../hooks/useNav';
import useReviews from '../../hooks/useReviews';
import NoReview from '../atoms/NoReview';
import Loading from '../atoms/Loading';
import { useMyLikeList } from '../../contexts/like';

const FilterbuttunArr: Array<{
  title: string;
  iconType: AssetIconType;
  value: string;
  options: Array<{ label: string; value: string }>;
}> = [
  {
    title: '연령대',
    iconType: 'underArrow',
    value: 'age',
    options: ageOptions,
  },
  {
    title: '성별',
    iconType: 'underArrow',
    value: 'sex',
    options: sexOptions,
  },
  {
    title: '백신종류',
    iconType: 'underArrow',
    value: 'type',
    options: vaccineTypeOptions,
  },
  {
    title: '교차접종',
    iconType: 'underArrow',
    value: 'cross',
    options: crossOptions,
  },
  {
    title: '회차',
    iconType: 'underArrow',
    value: 'round',
    options: roundOptions,
  },
  {
    title: '임신',
    iconType: 'underArrow',
    value: 'pregnant',
    options: pregnantOptions,
  },
  {
    title: '기저질환',
    iconType: 'underArrow',
    value: 'underlying',
    options: underlyingDiseaseOptions,
  },
];

const MainForm = () => {
  const { is_loggedIn, is_survey } = useIsLoggedIn();
  const { fetchList, checkLikeReview, updateLikeReview } = useMyLikeList();
  const { navigate } = useAppNav();
  const [selectedModal, setSelectModal] = useState('');
  const [filterValue, setFilterValue] = useState<{ [key: string]: string }>({
    age: '',
    sex: '',
    type: '',
    cross: '',
    round: '',
    pregnant: '',
    underlying: '',
  });

  const { isLoading, data, hasNextPage, fetchNextPage, refetch } =
    useReviews(filterValue);

  useEffect(() => {
    if (is_loggedIn) {
      fetchList();
    }
  }, [is_loggedIn]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const navigateSurvey = () => {
    if (!is_loggedIn) {
      navigate('/login');
    } else {
      is_survey
        ? navigate('/survey', {})
        : navigate('/survey', { surveyType: 'JOIN' });
    }
  };

  const review_list = useMemo(
    () => (data ? data.pages.map(({ contents }) => contents).flat() : []),
    [data],
  );

  const navigateToLogin = () => {
    navigate('/login');
  };
  return (
    <>
      <Header>
        <HeaderTitle>백신후기</HeaderTitle>
        <IconWrapper>
          <Icon
            type={'notification'}
            btnStyle={{ marginRight: 12 }}
            onPress={() => {
              navigate('/notification');
            }}
          />
          <Icon
            type={'setting'}
            onPress={() => {
              navigate('/settings');
            }}
          />
        </IconWrapper>
      </Header>
      <FilterContainer>
        <FilterWrapper
          horizontal={true}
          contentContainerStyle={{ paddingHorizontal: 24, height: 60 }}>
          <Filterbutton
            key={'filter-btn-reset'}
            title={'초기화'}
            iconType={'reset'}
            handleFilterPress={() => {
              setFilterValue({
                age: '',
                sex: '',
                type: '',
                cross: '',
                round: '',
                pregnant: '',
                underlying: '',
              });
              refetch();
            }}
          />
          {FilterbuttunArr.map(({ title, iconType, value, options }, index) => (
            <Filterbutton
              key={`filter-btn-${index}`}
              title={
                filterValue[value]
                  ? options.filter(
                      ({ value: _value }) => _value === filterValue[value],
                    )[0]?.label
                  : title
              }
              iconType={iconType}
              handleFilterPress={() => {
                setSelectModal(value);
              }}
            />
          ))}
        </FilterWrapper>
      </FilterContainer>
      <CardWrapper>
        {isLoading ? (
          <Loading />
        ) : review_list.length > 0 ? (
          <FlatList
            contentContainerStyle={styles.flatList}
            data={review_list}
            keyExtractor={item => item.id + ''}
            onEndReachedThreshold={0.3}
            onEndReached={loadMore}
            ListEmptyComponent={<NoReview />}
            renderItem={({
              item: {
                id,
                nickname,
                vaccine_round,
                vaccine_type,
                like_count,
                comment_count,
                user_is_like,
                symptom,
              },
            }: any) => (
              <Reviewcard
                nickname={nickname}
                vaccine_round={vaccine_round}
                vaccine_type={vaccine_type}
                id={id}
                like_count={like_count}
                comment_count={comment_count}
                is_loggedIn={is_loggedIn}
                user_is_like={user_is_like}
                symptom={symptom}
                navigateToDetail={() => {
                  navigate('/detail', { review_id: id });
                }}
                navigateToLogin={navigateToLogin}
                updateLikeReview={updateLikeReview}
              />
            )}
          />
        ) : (
          <NoReview />
        )}
      </CardWrapper>
      <FixedWrapper>
        <FixedButton onPress={navigateSurvey}>
          <ButtonText>후기 작성하기</ButtonText>
        </FixedButton>
        {Platform.OS === 'ios' ? <Space /> : null}
      </FixedWrapper>
      <SelectModal
        isVisible={selectedModal === 'age'}
        handleVisible={() => setSelectModal('')}
        title={'연령대'}
        options={ageOptions}
        selectOption={age => {
          setFilterValue({ ...filterValue, age });
        }}
      />
      <SelectModal
        isVisible={selectedModal === 'sex'}
        handleVisible={() => setSelectModal('')}
        title={'성별'}
        options={sexOptions}
        selectOption={sex => {
          setFilterValue({ ...filterValue, sex });
        }}
      />
      <SelectModal
        isVisible={selectedModal === 'type'}
        handleVisible={() => setSelectModal('')}
        title={'백신종류'}
        options={vaccineTypeOptions}
        selectOption={type => {
          setFilterValue({ ...filterValue, type });
        }}
      />
      <SelectModal
        isVisible={selectedModal === 'cross'}
        handleVisible={() => setSelectModal('')}
        title={'교차접종 여부'}
        options={crossOptions}
        selectOption={cross => {
          setFilterValue({ ...filterValue, cross });
        }}
      />
      <SelectModal
        isVisible={selectedModal === 'round'}
        handleVisible={() => setSelectModal('')}
        title={'회차'}
        options={roundOptions}
        selectOption={round => {
          setFilterValue({ ...filterValue, round });
        }}
      />
      <SelectModal
        isVisible={selectedModal === 'pregnant'}
        handleVisible={() => setSelectModal('')}
        title={'임신 여부'}
        options={pregnantOptions}
        selectOption={pregnant => {
          setFilterValue({ ...filterValue, pregnant });
        }}
      />
      <SelectModal
        isVisible={selectedModal === 'underlying'}
        handleVisible={() => setSelectModal('')}
        title={'기저질환 여부'}
        options={underlyingDiseaseOptions}
        selectOption={underlying => {
          setFilterValue({ ...filterValue, underlying });
        }}
      />
    </>
  );
};

export default MainForm;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`;

const HeaderTitle = styled.Text`
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
`;

const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const FilterContainer = styled.View`
  width: 100%;
  height: 60px;
`;

const FilterWrapper = styled.ScrollView`
  width: 100%;
  height: 60px;
`;

const CardWrapper = styled.View`
  flex: 1;
  padding: 0 24px;
`;

const FixedButton = styled.TouchableOpacity`
  width: 100%;
  height: 56px;

  background-color: #53a7ff;
  justify-content: center;
  align-items: center;
`;

const Space = styled.View`
  width: 100%;
  height: 32px;
  background-color: #53a7ff;
`;

const FixedWrapper = styled.View`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;
const styles = StyleSheet.create({
  flatList: {
    paddingBottom: 60,
  },
});
