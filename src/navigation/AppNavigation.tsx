import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';

const RootStack = createNativeStackNavigator();
const RootRouter = () => {
  return (
    <RootStack.Navigator initialRouteName={'/'}>
      <RootStack.Group screenOptions={{headerShown: false}}>
        <RootStack.Screen name={'/'} component={Home} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootRouter;
