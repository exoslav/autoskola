import React from 'react';
import ReactDOM from 'react-dom';

import Content from './Content';
import WithAuthState from './WithAuthState';
import FirebaseActions from './firebase';
import { config } from './firebase/initializeFirebaseApp';

FirebaseActions.initializeFirebaseApp(config);

const App = (
  <WithAuthState>
    <Content />
  </WithAuthState>
);

const appContainer = document.getElementById('app');
ReactDOM.render(App, appContainer);