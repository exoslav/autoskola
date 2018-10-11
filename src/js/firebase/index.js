import createUser from './createUser';
import setPersistence from './setPersistence';
import onAuthStateChanged from './onAuthStateChanged';
import initializeFirebaseApp from './initializeFirebaseApp';
import signInWithEmailAndPassword from './signInWithEmailAndPassword';

export default {
  createUser,
  setPersistence,
  onAuthStateChanged,
  initializeFirebaseApp,
  signInWithEmailAndPassword
};

// https://stackoverflow.com/questions/48718421/import-only-auth-and-firestore-from-firebase
// https://itnext.io/hooking-up-firebase-to-your-redux-store-a5e799cf84c4