import { getQuestion as getQuestionFromDb }  from '../../firebase/getQuestion';
import getQuestionsCollections  from '../../firebase/getQuestionsCollections';
import FirebaseActions from '../../firebase';

const initState = {
  fetching: true,
  items: [
    {
      id: 'pravidla-provozu',
      name: 'Pravidla provozu na pozemních komunikacích',
      icon: 'traffic-light',
      link: '/otazky/pravidla-provozu',
      perex: 'Otázky oheldně pravidel silničního provozu.',
      questions: []
    },
    {
      id: 'dopravni-znacky',
      name: 'Dopravní značky',
      icon: 'sign',
      link: '/otazky/dopravni-znacky',
      perex: 'Otázky ohledně dopravních značek.',
      questions: []
    },
    {
      id: 'pravidla-bezpecne-jizdy',
      name: 'Zásady bezpečné jízdy',
      icon: 'car-crash',
      link: '/otazky/pravidla-bezpecne-jizdy',
      perex: 'Otázky ohledně bezpečné jízdy.',
      questions: []
    },
    {
      id: 'dopravni-situace',
      name: 'Dopravní situace',
      icon: 'bus',
      link: '/otazky/dopravni-situace',
      perex: 'Otázky ohledně dopravních situací.',
      questions: []
    },
    {
      id: 'predpisy-provozu-vozidel',
      name: 'Předpisy o podmínkách provozu vozidel',
      icon: 'car-battery',
      link: '/otazky/predpisy-provozu-vozidel',
      perex: 'Otázky ohledně předpisů vozidel.',
      questions: []
    },
    {
      id: 'predpisy-souvisejici-s-provozem',
      name: 'Předpisy související s provozem',
      icon: 'chalkboard-teacher',
      link: '/otazky/predpisy-souvisejici-s-provozem',
      perex: 'Předpisy související s provozem.',
      questions: []
    },
    {
      id: 'zdravotnicka-priprava',
      name: 'Zdravotnická příprava',
      icon: 'briefcase-medical',
      link: '/otazky/zdravotnicka-priprava',
      perex: 'Otázky ohledně zdravotnické přípravy.',
      questions: []
    }
  ],
  currentQuestion: null
}

const GET_QUESTION_REQUEST = 'questions/GET_QUESTION_REQUEST';
const GET_QUESTION_SUCCESS = 'questions/GET_QUESTION_SUCCESS';

const GET_QUESTIONS_REQUEST = 'questions/GET_QUESTIONS_REQUEST';
const GET_QUESTIONS_SUCCESS = 'questions/GET_QUESTIONS_SUCCESS';

const REMOVE_QUESTIONS_FROM_CATEGORY = 'questions/REMOVE_QUESTIONS_FROM_CATEGORY';
const REMOVE_QUESTION_FROM_CATEGORY = 'questions/REMOVE_QUESTION_FROM_CATEGORY';

export const removeQuestionsFromCategory = (categoryId) => (dispatch) => {
  dispatch({
    type: REMOVE_QUESTIONS_FROM_CATEGORY,
    payload: { categoryId, newQuestionsList: [] }
  });
}

export const removeQuestionFromCategory = (categoryId) => (dispatch) => {
  dispatch({
    type: REMOVE_QUESTION_FROM_CATEGORY,
    payload: null
  });
}

export const getQuestions = (categoryId) => (dispatch) => {
  dispatch({ type: GET_QUESTIONS_REQUEST, payload: null });

  getQuestionsCollections(categoryId)
    .then((querySnapshot) => {
      let newQuestionsList = [];

      querySnapshot.forEach((doc) => {
        newQuestionsList = [...newQuestionsList, doc.data()];
      });

      dispatch({
        type: GET_QUESTIONS_SUCCESS,
        payload: { categoryId, newQuestionsList }
      });
    })
    .catch((err) => {
      console.log(err);
    })
}

export const getQuestion = (categoryId, questionId) => (dispatch) => {
  dispatch({ type: GET_QUESTION_REQUEST, payload: null });

  getQuestionFromDb(categoryId, questionId)
    .then((snapshot) => {
      dispatch({
        type: GET_QUESTION_SUCCESS,
        payload: snapshot.data()
      });
    })
    .catch((err) => {
      console.log(err);
    })
}

export default (state = initState, action) => {
  switch(action.type) {
    case GET_QUESTIONS_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case GET_QUESTION_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        fetching: false,
        items: state.items.map((item) => {
          if (item.id === action.payload.categoryId) {
            return {
              ...item,
              questions: action.payload.newQuestionsList
            }
          }

          return item;
        })
      }
    case GET_QUESTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        currentQuestion: action.payload
      }
    case REMOVE_QUESTIONS_FROM_CATEGORY:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.categoryId) {
            return {
              ...item,
              questions: action.payload.newQuestionsList
            };
          }

          return item;
        })
      }
    case REMOVE_QUESTION_FROM_CATEGORY:
      return {
        ...state,
        currentQuestion: null
      }
    default:
      return state;
  }
}
