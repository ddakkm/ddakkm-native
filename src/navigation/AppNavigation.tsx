import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Survey from '../screens/Survey';
import Login from '../screens/Login';
import Keyword from '../screens/Keyword';
import Detail from '../screens/Detail';
import SignUp from '../screens/SignUp';

const RootStack = createNativeStackNavigator();
const RootRouter = () => {
  return (
    <RootStack.Navigator initialRouteName={'/'}>
      <RootStack.Group screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={'/'} component={Home} />
        <RootStack.Screen name={'/survey'} component={Survey} />
        <RootStack.Screen name={'/keyword'} component={Keyword} />
        <RootStack.Screen name={'/detail'} component={Detail} />
      </RootStack.Group>
      <RootStack.Group
        screenOptions={{
          presentation: 'containedModal',
          headerShown: false,
        }}>
        <RootStack.Screen name={'/login'} component={Login} />
        <RootStack.Screen name={'/signUp'} component={SignUp} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootRouter;
