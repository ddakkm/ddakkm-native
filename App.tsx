import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Router from './src/navigation';
import {setGlobalProps} from './src/utils/globalProps';
setGlobalProps(); // set global props

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <Router />;
};

export default App;
