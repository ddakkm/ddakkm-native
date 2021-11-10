import { NavigationContainerRef } from '@react-navigation/core';
import { CommentProps } from '../api/review';

type RootStackParamList = {
  '/review': undefined;
  '/survey': { surveyType?: 'JOIN' };
  '/signUp': { access_token: string; sns_provider: 'KAKAO' | 'NAVER' };
  '/': undefined;
  '/keyword': { handleKeywords: (value: string[]) => void; type?: 'SETTING' };
  '/detail': { review_id: number };
  '/login': undefined;
  '/comments': { comments: CommentProps[] };
};

type NavRef = NavigationContainerRef<RootStackParamList>;

type NavigateFunctionType = <RouteName extends keyof RootStackParamList>(
  ...args: undefined extends RootStackParamList[RouteName]
    ?
        | [screen: RouteName]
        | [screen: RouteName, params: RootStackParamList[RouteName]]
    : [screen: RouteName, params: RootStackParamList[RouteName]]
) => void;

interface INavContext {
  navigate: NavigateFunctionType;
  reset: (to: keyof RootStackParamList) => void;
  goBack: () => void;
}
