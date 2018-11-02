import FirebaseActions from '../../firebase';

const initState = {
  fetching: true,
  items: [],
  currentFavouriteQuestion: null
}

const ADD_FAVOURITE_QUESTION_REQUEST = 'questions/ADD_FAVOURITE_QUESTION_REQUEST';
const REMOVE_FAVOURITE_QUESTION_REQUEST = 'questions/REMOVE_FAVOURITE_QUESTION_REQUEST';
const REMOVE_FAVOURITE_QUESTION_FROM_STATE = 'questions/REMOVE_FAVOURITE_QUESTION_FROM_STATE';
const REMOVE_FAVOURITE_QUESTIONS_FROM_STATE = 'questions/REMOVE_FAVOURITE_QUESTIONS_FROM_STATE';
const FAVOURITE_QUESTIONS_CHANGED = 'questions/FAVOURITE_QUESTIONS_CHANGED';
const FAVOURITE_QUESTION_CHANGED = 'questions/FAVOURITE_QUESTION_CHANGED';

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

export const removeFavouriteQuestionFromState = () => (dispatch) => {
  dispatch({
    type: REMOVE_FAVOURITE_QUESTION_FROM_STATE,
    payload: null
  });
}

export const removeFavouriteQuestionsFromState = () => (dispatch) => {
  dispatch({
    type: REMOVE_FAVOURITE_QUESTIONS_FROM_STATE,
    payload: []
  });
}

export const onFavouriteQuestionsChange = (userId) => (dispatch) => {
  const onChangeCallBack = (favouriteQuestions) => dispatch({
    type: FAVOURITE_QUESTIONS_CHANGED,
    payload: favouriteQuestions
  });

  return FirebaseActions.watchFavouriteQuestionsChange(userId, onChangeCallBack);
}

export const onFavouriteQuestionChange = (userId, questionId) => (dispatch) => {
  const onChangeCallBack = (favouriteQuestion) => dispatch({
    type: FAVOURITE_QUESTION_CHANGED,
    payload: favouriteQuestion
  });

  return FirebaseActions.watchFavouriteQuestionChange(userId, questionId, onChangeCallBack);
}


export default (state = initState, action) => {
  switch(action.type) {
    case ADD_FAVOURITE_QUESTION_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case REMOVE_FAVOURITE_QUESTION_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case REMOVE_FAVOURITE_QUESTION_FROM_STATE:
      return {
        ...state,
        currentFavouriteQuestion: action.payload
      }
    case REMOVE_FAVOURITE_QUESTIONS_FROM_STATE:
      return {
        ...state,
        items: action.payload
      }
    case FAVOURITE_QUESTIONS_CHANGED:
      return {
        ...state,
        fetching: false,
        items: action.payload
      }
    case FAVOURITE_QUESTION_CHANGED:
      return {
        ...state,
        fetching: false,
        currentFavouriteQuestion: action.payload
      }
    default:
      return state;
  }
}
