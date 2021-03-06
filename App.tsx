import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { QueryClient, QueryClientProvider } from 'react-query';
import messaging from '@react-native-firebase/messaging';
// import DeviceInfo from 'react-native-device-info';
import AuthProvider from './src/contexts/auth';
import LikeProvider from './src/contexts/like';
import Router from './src/navigation';
import { setGlobalProps } from './src/utils/globalProps';
import { firebase } from '@react-native-firebase/analytics';
setGlobalProps(); // set global props

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

const App = () => {
  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   await messaging().registerDeviceForRemoteMessages();

  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     const fcmToken = await messaging().getToken();
  //   }
  // }
  useEffect(() => {
    firebase.analytics().logScreenView({
      screen_name: '메인 페이지',
    });
  }, []);

  useEffect(() => {
    SplashScreen.hide();
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');
    // requestUserPermission();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LikeProvider>
          <Router />
        </LikeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
