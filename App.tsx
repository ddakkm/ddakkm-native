import React from 'react';
import Router from './src/navigation';
import {setGlobalProps} from './src/utils/globalProps';
setGlobalProps(); // set global props

const App = () => <Router />;

export default App;
