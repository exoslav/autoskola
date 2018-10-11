import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMotorcycle, faCarSide, faBus, faTruck } from '@fortawesome/free-solid-svg-icons'

import store from './redux/store'
import Content from './Content';
import withAuthState from './withAuthState';
import FirebaseActions from './firebase';
import { config } from './firebase/initializeFirebaseApp';

FirebaseActions.initializeFirebaseApp(config);
FirebaseActions.setPersistence();

library.add(faMotorcycle, faCarSide, faBus, faTruck)

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