import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { compose } from 'recompose';

import store from './redux/store';
import Content from './Content';
import withAuthState from './withAuthState';
import withBreadcrumbsUpdater from './components/hoc/withBreadcrumbsUpdater';
import FirebaseActions from './firebase';
import initIcons from './initializeIcons';
import { config } from './firebase/initializeFirebaseApp';

import '../scss/main.scss';

FirebaseActions.initializeFirebaseApp(config);
FirebaseActions.setPersistence();

initIcons();

const ContentWithAuthState = compose(
  withAuthState,
  withBreadcrumbsUpdater
)(Content);

const App = (
  <Router>
    <Provider store={store}>
      <ContentWithAuthState />
    </Provider>
  </Router>
);

const appContainer = document.getElementById('app');
ReactDOM.render(App, appContainer);
