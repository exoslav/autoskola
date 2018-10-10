import * as firebase from 'firebase/app';
import 'firebase/auth';

const onAuthStateChanged = (onUserLoggedIn = () => {}) => {
  firebase.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        onUserLoggedIn(user);
      } else {
        console.log(`User was sign off.`);
      }
    });
}

export default onAuthStateChanged;
