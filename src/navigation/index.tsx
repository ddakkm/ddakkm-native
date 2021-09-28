import React from 'react';
import AppNavigation from './AppNavigation';
import {NavigationContainer} from '@react-navigation/native';

export const Router = () => (
  <NavigationContainer>
    <AppNavigation />
  </NavigationContainer>
);

export default Router;
