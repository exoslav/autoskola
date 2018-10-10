import firebase from 'firebase/app';

const config = {
  apiKey: "AIzaSyBqvjuWQgui0YYmeRp1_BopGPJR9uzhBLI",
  authDomain: "autoskola-testy.firebaseapp.com",
  databaseURL: "https://autoskola-testy.firebaseio.com",
  projectId: "autoskola-testy",
  storageBucket: "autoskola-testy.appspot.com",
  messagingSenderId: "770379121100"
};

firebase.initializeApp(config);