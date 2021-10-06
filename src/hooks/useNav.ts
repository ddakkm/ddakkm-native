import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import {RootStackParamList} from '../navigation/types';

export const useAppNav = () =>
  useNavigation<NavigationProp<RootStackParamList>>();

export const useAppRoute = <T extends keyof RootStackParamList>() =>
  useRoute<RouteProp<RootStackParamList, T>>();
