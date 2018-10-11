import * as firebase from 'firebase/app';

export const config = {
  apiKey: "AIzaSyBqvjuWQgui0YYmeRp1_BopGPJR9uzhBLI",
  authDomain: "autoskola-testy.firebaseapp.com",
  databaseURL: "https://autoskola-testy.firebaseio.com",
  projectId: "autoskola-testy",
  storageBucket: "autoskola-testy.appspot.com",
  messagingSenderId: "770379121100"
};

const initializeFirebaseApp = (config) => {
  firebase.initializeApp(config);
}

export default initializeFirebaseApp;
