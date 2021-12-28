import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { QueryClient, QueryClientProvider } from 'react-query';
import messaging from '@react-native-firebase/messaging';
// import DeviceInfo from 'react-native-device-info';
import AuthProvider from './src/contexts/auth';
import LikeProvider from './src/contexts/like';
import Router from './src/navigation';
import { setGlobalProps } from './src/utils/globalProps';
setGlobalProps(); // set global props

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    await messaging().registerDeviceForRemoteMessages();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      const fcmToken = await messaging().getToken();
      console.log(fcmToken);
    }
  }

  useEffect(() => {
    SplashScreen.hide();
    StatusBar.setBarStyle('dark-content');
    requestUserPermission();
  }, []);

  // console.log(DeviceInfo.getUniqueId());
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
