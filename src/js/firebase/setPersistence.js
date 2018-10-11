import * as firebase from 'firebase/app';
import 'firebase/auth';

const setPersistence = () => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
    .then(function() {
      var provider = new firebase.auth.GoogleAuthProvider();
      // In memory persistence will be applied to the signed in Google user
      // even though the persistence was set to 'none' and a page redirect
      // occurred.
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

export default setPersistence;
