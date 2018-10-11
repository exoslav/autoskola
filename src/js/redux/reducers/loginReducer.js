import FirebaseActions from '../../firebase';

const initState = {
  loginInProgress: false,
  error: false
}

const CREATE_USER_REQUEST = 'login/CREATE_USER_REQUEST';
const CREATE_USER_ERROR = 'login/CREATE_USER_ERROR';
const CREATE_USER_SUCCESS = 'login/CREATE_USER_SUCCESS';

export const createUser = (email, password) => (dispatch) => {
  if (!email || !password) {
    throwCreateUserError(dispatch, 'Invalid email or password', 'Vyplňte všechny potřebné údaje');
    return;
  }

  dispatch({ type: CREATE_USER_REQUEST, payload: null });

  FirebaseActions.createUser(email, password)
    .then((user) => {
      dispatch({ type: CREATE_USER_SUCCESS, payload: null });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      throwCreateUserError(dispatch, `${errorCode} - ${errorMessage}`, errorMessage);
    })
}

function throwCreateUserError (dispatch, error, payload) {
  console.error(`Unable to create user. Got following error: ${error}`);
  dispatch({ type: CREATE_USER_ERROR, payload });
}

export default (state = initState, action) => {
  switch(action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        loginInProgress: true
      }
      break;
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        error: false,
        loginInProgress: false
      }
      break;
    case CREATE_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loginInProgress: false
      }
      break;
    default:
      return state;
  }
}
