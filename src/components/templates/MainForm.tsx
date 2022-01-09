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
  convertRoundToText,
  convertTypeToText,
  convertAnswerToText,
  convertQuestionToIcon,
  convertQuestionToText,
} from '../../utils/filterUtil';
import { FlatList, Platform, StatusBar, StyleSheet } from 'react-native';
import { useIsLoggedIn } from '../../contexts/auth';
import { useAppNav } from '../../hooks/useNav';
import NoReview from '../atoms/NoReview';
import Loading from '../atoms/Loading';
import { useMyLikeList } from '../../contexts/like';
import { useInfiniteQuery } from 'react-query';
import { reviewApi } from '../../api/review';
import { SURVEY_A_LIST } from '../../utils/servayUtil';
import { firebase } from '@react-native-firebase/analytics';

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

const CardRowWrapper = styled.View`
  height: 40px;
  width: 100%;
  padding: 9px;
  border-width: 1px;
  border-color: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 4px;
  flex-direction: row;
  align-items: center;
`;

const CardText = styled.Text`
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #000;
  padding-right: 20px;
  margin-left: 6px;
`;

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

  const { isLoading, isFetching, data, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery(
      ['review_list', filterValue],
      async ({ pageParam = 1 }) => {
        const { contents, page_meta } = await reviewApi.getReview(
          pageParam,
          filterValue,
        );
        const next_page_index = page_meta.has_next
          ? pageParam + 1
          : page_meta.has_next;
        return {
          review_list: contents,
          next_page_index,
        };
      },
      {
        getNextPageParam: last_page => last_page.next_page_index,
        onError: e => {
          /** */
        },
        retry: false,
        staleTime: Infinity,
      },
    );

  useEffect(() => {
    if (is_loggedIn) {
      fetchList();
    }
  }, [is_loggedIn]);

  const loadMore = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  const navigateSurvey = async () => {
    await firebase.analytics().logEvent('main_page', {
      category: '후기 작성',
      action: '후기 작성하기 버튼 클릭',
    });
    if (!is_loggedIn) {
      navigate('/login');
    } else {
      is_survey
        ? navigate('/survey', {})
        : navigate('/survey', { surveyType: 'JOIN' });
    }
  };

  const review_list = useMemo(() => {
    return data ? data.pages.map(page => page.review_list).flat() : [];
  }, [data]);

  const is_filter_value = useMemo(
    () => Object.values(filterValue).filter(value => !!value).length > 0,
    [filterValue],
  );
  const navigateToLogin = () => {
    navigate('/login');
  };

  const handleUpdateLikeReview = (review_id: number, is_like: boolean) => {
    if (!is_loggedIn) {
      navigate('/login');
      return;
    }
    try {
      updateLikeReview(review_id + '', !is_like);
      reviewApi.postReviewLikeStatus(review_id);
    } catch (e) {
      updateLikeReview(review_id + '', !is_like);
    }
  };

  const renderItem = ({ item }: any) => {
    const is_liked_review = checkLikeReview(item.id);
    return (
      <Reviewcard
        nickname={item.nickname}
        vaccine_text={`${convertRoundToText(
          item.vaccine_round,
        )} · ${convertTypeToText(item.vaccine_type)}`}
        is_content={!!item.content}
        like_count={
          !item.user_is_like && is_liked_review
            ? item.like_count + 1
            : item.user_is_like && !is_liked_review
            ? item.like_count - 1
            : item.like_count
        }
        card_list={
          <>
            {item.symptom
              ? Object.entries(item.symptom).map(([key, value], idx) => (
                  <CardRowWrapper key={`${item.id}-cardItem-${idx}`}>
                    <Icon type={convertQuestionToIcon(key)} />
                    <CardText>
                      {convertQuestionToText(key)} -{' '}
                      {SURVEY_A_LIST[key][convertAnswerToText(value)]?.label}
                    </CardText>
                  </CardRowWrapper>
                ))
              : null}
            {item.content ? (
              <CardRowWrapper key={`${item.id}-cardItem-3`}>
                <Icon type={convertQuestionToIcon('')} />
                <CardText numberOfLines={1} ellipsizeMode="tail">
                  {item.content}
                </CardText>
              </CardRowWrapper>
            ) : null}
          </>
        }
        comment_count={item.comment_count}
        user_is_like={is_liked_review}
        navigateToDetail={() => {
          navigate('/detail', { review_id: item.id });
        }}
        navigateToLogin={navigateToLogin}
        updateLikeReview={() => {
          handleUpdateLikeReview(item.id, is_liked_review);
        }}
        navigateToComment={() => {
          is_loggedIn
            ? navigate('/comments', { review_id: item.id })
            : navigate('/login');
        }}
      />
    );
  };

  return (
    <>
      <Header>
        <HeaderTitle>백신후기</HeaderTitle>
        <IconWrapper>
          {/* <Icon
            type={'notification'}
            btnStyle={{ marginRight: 12 }}
            onPress={() => {
              navigate('/notification');
            }}
          /> */}
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
          {is_filter_value ? (
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
          ) : null}
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
        <FlatList
          refreshing={isLoading}
          onRefresh={() => {
            refetch();
          }}
          ItemSeparatorComponent={ListItemSeparator}
          contentContainerStyle={styles.flatList}
          data={review_list}
          style={{ marginBottom: 56 }}
          keyExtractor={(item, idx) => `review-list-${item.id}:${idx}`}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          renderItem={renderItem}
        />
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
      {isLoading ? <Loading /> : null}
    </>
  );
};

export default MainForm;

const Header = styled.View`
  margin-top: ${(StatusBar.currentHeight || 0) + 'px'};
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
  /* padding: 0 24px; */
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

const ListItemSeparator = styled.View`
  width: 100%;
  height: 8px;
  background-color: #f2f2f2;
`;
