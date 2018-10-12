import * as firebase from 'firebase/app';
import 'firebase/auth';

const onAuthStateChanged = (
  onUserLoggedIn = () => {},
  onUserLoggedOut = () => {},
  currentUser = null
) => {
  firebase.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        onUserLoggedIn(user);
      } else {
        if (!currentUser) {
          return;
        }

        onUserLoggedOut();
      }
    });
}

export default onAuthStateChanged;
