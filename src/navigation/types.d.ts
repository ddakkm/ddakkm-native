import {NavigationContainerRef} from '@react-navigation/core';

type RootStackParamList = {
  '/review': undefined;
  '/survey': undefined;
  '/sign': undefined;
};

type NavRef = NavigationContainerRef<RootStackParamList>;

type NavigateFunctionType = <RouteName extends keyof RootStackParamList>(
  ...agrs: undefined extends RootStackParamList[RouteName]
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
