import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Survey from '../screens/Survey';
import Login from '../screens/Login';

const RootStack = createNativeStackNavigator();
const RootRouter = () => {
  return (
    <RootStack.Navigator initialRouteName={'/survey'}>
      <RootStack.Group screenOptions={{headerShown: false}}>
        <RootStack.Screen name={'/'} component={Home} />
        <RootStack.Screen name={'/survey'} component={Survey} />
        <RootStack.Screen name={'/Login'} component={Login} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootRouter;
