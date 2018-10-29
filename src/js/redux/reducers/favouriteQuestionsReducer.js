import FirebaseActions from '../../firebase';

const initState = {
  fetching: true,
  items: []
}

const ADD_FAVOURITE_QUESTION_REQUEST = 'questions/ADD_FAVOURITE_QUESTION_REQUEST';
const REMOVE_FAVOURITE_QUESTION_REQUEST = 'questions/REMOVE_FAVOURITE_QUESTION_REQUEST';
const FAVOURITE_QUESTIONS_CHANGED = 'questions/FAVOURITE_QUESTIONS_CHANGED';

export const addFavouriteQuestion = (question, userId) => (dispatch) => {
  dispatch({
    type: ADD_FAVOURITE_QUESTION_REQUEST,
    payload: null
  });

  FirebaseActions.addFavouriteQuestion(question, userId)
    .catch(err => console.log('Error when adding favourite question: ', err));
}

export const removeFavouriteQuestion = (questionId, userId) => (dispatch) => {
  dispatch({
    type: REMOVE_FAVOURITE_QUESTION_REQUEST,
    payload: null
  });

  FirebaseActions.removeFavouriteQuestion(questionId, userId)
    .catch(err => console.log('Error when removing favourite question: ', err));
}

export const onFavouriteQuestionsChange = (userId) => (dispatch) => {
  const onChangeCallBack = (favouriteQuestions) => dispatch({
    type: FAVOURITE_QUESTIONS_CHANGED,
    payload: favouriteQuestions
  });

  return FirebaseActions.watchFavouriteQuestionsChange(userId, onChangeCallBack);
}

export default (state = initState, action) => {
  switch(action.type) {
    case ADD_FAVOURITE_QUESTION_REQUEST:
      return {
        ...state,
        fetching: true
      }
      break;
    case REMOVE_FAVOURITE_QUESTION_REQUEST:
      return {
        ...state,
        fetching: true
      }
      break;
    case FAVOURITE_QUESTIONS_CHANGED:
      return {
        ...state,
        fetching: false,
        items: action.payload
      }
      break;
    default:
      return state;
  }
}
