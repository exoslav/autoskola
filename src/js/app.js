import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import store from './redux/store';
import Content from './Content';
import withAuthState from './withAuthState';
import FirebaseActions from './firebase';
import initIcons from './initializeIcons';
import { config } from './firebase/initializeFirebaseApp';

FirebaseActions.initializeFirebaseApp(config);
FirebaseActions.setPersistence();

initIcons();

const ContentWithAuthState = withAuthState(Content);

const App = (
  <Router>
    <Provider store={store}>
      <ContentWithAuthState />
    </Provider>
  </Router>
);

const appContainer = document.getElementById('app');
ReactDOM.render(App, appContainer);
