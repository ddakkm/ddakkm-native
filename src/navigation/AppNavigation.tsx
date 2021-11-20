import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Survey from '../screens/Survey';
import Login from '../screens/Login';
import Keyword from '../screens/Keyword';
import Detail from '../screens/Detail';
import SignUp from '../screens/SignUp';
import ImageTest from '../screens/ImageTest';
import Comments from '../screens/Comments';
import Setting from '../screens/Setting';
import Notification from '../screens/Notification';
import PushSetting from '../screens/PushSetting';
import ReplyComment from '../screens/ReplyComment';
import ModifyComment from '../screens/ModifyComment';

const RootStack = createNativeStackNavigator();
const RootRouter = () => {
  return (
    <RootStack.Navigator initialRouteName={'/'}>
      <RootStack.Group screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={'/'} component={Home} />
        <RootStack.Screen name={'/survey'} component={Survey} />
        <RootStack.Screen name={'/keyword'} component={Keyword} />
        <RootStack.Screen name={'/detail'} component={Detail} />
        <RootStack.Screen name={'/test'} component={ImageTest} />
        <RootStack.Screen name={'/settings'} component={Setting} />
        <RootStack.Screen name={'/notification'} component={Notification} />
        <RootStack.Screen name={'/pushSetting'} component={PushSetting} />
      </RootStack.Group>
      <RootStack.Group
        screenOptions={{
          presentation: 'containedModal',
          headerShown: false,
        }}>
        <RootStack.Screen name={'/login'} component={Login} />
        <RootStack.Screen name={'/signUp'} component={SignUp} />
        <RootStack.Screen name={'/comments'} component={Comments} />
        <RootStack.Screen name={'/replyComment'} component={ReplyComment} />
        <RootStack.Screen name={'/modifyComment'} component={ModifyComment} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootRouter;
