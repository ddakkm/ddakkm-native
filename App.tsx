import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { QueryClient, QueryClientProvider } from 'react-query';
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
  useEffect(() => {
    SplashScreen.hide();
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');
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
