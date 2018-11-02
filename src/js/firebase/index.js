import createUser from './createUser';
import setPersistence from './setPersistence';
import onAuthStateChanged from './onAuthStateChanged';
import initializeFirebaseApp from './initializeFirebaseApp';
import signInWithEmailAndPassword from './signInWithEmailAndPassword';
import removeFavouriteQuestion from './removeFavouriteQuestion';
import addFavouriteQuestion from './addFavouriteQuestion';
import watchFavouriteQuestionChange from './watchFavouriteQuestionChange';
import watchFavouriteQuestionsChange from './watchFavouriteQuestionsChange';

export default {
  createUser,
  setPersistence,
  onAuthStateChanged,
  initializeFirebaseApp,
  signInWithEmailAndPassword,
  removeFavouriteQuestion,
  addFavouriteQuestion,
  watchFavouriteQuestionChange,
  watchFavouriteQuestionsChange
};

// https://stackoverflow.com/questions/48718421/import-only-auth-and-firestore-from-firebase
// https://itnext.io/hooking-up-firebase-to-your-redux-store-a5e799cf84c4
// https://stackoverflow.com/questions/30910704/how-do-i-link-each-user-to-their-data-in-firebase