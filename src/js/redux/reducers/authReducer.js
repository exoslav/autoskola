import FirebaseActions from '../../firebase';

const initState = {
  authInProgress: false,
  error: false,
  user: null
}

export const TYPE_SIGN_UP = 'SIGN_UP';
export const TYPE_SIGN_IN = 'SIGN_IN';

const AUTH_USER_REQUEST = 'auth/AUTH_USER_REQUEST';
const AUTH_USER_ERROR = 'auth/AUTH_USER_ERROR';
const AUTH_USER_SUCCESS = 'auth/AUTH_USER_SUCCESS';
const AUTH_USER_LOGGED_IN = 'auth/AUTH_USER_LOGGED_IN';
const AUTH_USER_LOGGED_OUT = 'auth/AUTH_USER_LOGGED_OUT';

export const authStateController = (currentUser) => (dispatch) => {
  const onUserLogIn = (user) => dispatch({ type: AUTH_USER_LOGGED_IN, payload: user });
  const onUserLogOut = () => dispatch({ type: AUTH_USER_LOGGED_OUT, payload: null });

  FirebaseActions.onAuthStateChanged(onUserLogIn, onUserLogOut, currentUser);
}

export const signUpUser = (email, password) => (dispatch) => {
  if (!throwWrongPasswordOrEmailError(email, password, TYPE_SIGN_UP, dispatch)) {
    return;
  }

  dispatch({ type: AUTH_USER_REQUEST, payload: null });

  FirebaseActions.createUser(email, password)
    .then((user) => {
      dispatch({ type: AUTH_USER_SUCCESS, payload: user });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      const errorObj = createErrorObj(TYPE_SIGN_UP, errorCode, errorMessage);

      throwAuthUserError(dispatch, errorObj);
    });
}

export const signInUser = (email, password) => (dispatch) => {
  if (!throwWrongPasswordOrEmailError(email, password, TYPE_SIGN_IN, dispatch)) {
    return;
  }

  dispatch({ type: AUTH_USER_REQUEST, payload: null });

  FirebaseActions.signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch({ type: AUTH_USER_SUCCESS, payload: user });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      const errorObj = createErrorObj(TYPE_SIGN_IN, errorCode, errorMessage);

      throwAuthUserError(dispatch, errorObj);
    });
}

function createErrorObj(type, code, message) {
  return { type, code, message };
}

function throwWrongPasswordOrEmailError (email, password, authType, dispatch) {
  if (!email || !password) {
    const errorObj = createErrorObj(
      authType,
      'invalid-email-or-password',
      'Vyplňte všechny potřebné údaje'
    );

    throwAuthUserError(dispatch, errorObj);

    return false;
  }

  return true;
}

function throwAuthUserError (dispatch, errorObj) {
  const { code, message } = errorObj;

  console.error(`Unable to create user. Got following error: ${code} - ${message}`);

  dispatch({ type: AUTH_USER_ERROR, payload: errorObj });
}

export default (state = initState, action) => {
  switch(action.type) {
    case AUTH_USER_REQUEST:
      return {
        ...state,
        authInProgress: true
      }
      break;
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: false,
        authInProgress: false
      }
      break;
    case AUTH_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        authInProgress: false
      }
      break;
    case AUTH_USER_LOGGED_IN:
      return {
        ...state,
        user: action.payload
      }
      break;
    case AUTH_USER_LOGGED_OUT:
      return {
        ...state,
        user: null
      }
      break;
    default:
      return state;
  }
}
