import { combineReducers } from 'redux'
import testReducer from './testReducer'
import authReducer from './authReducer'
import questionsReducer from './questionsReducer'
import favouriteQuestionsReducer from './favouriteQuestionsReducer'
import licenseCategoriesReducer from './licenseCategoriesReducer'

export default combineReducers({
  auth: authReducer,
  test: testReducer,
  licenseCategories: licenseCategoriesReducer,
  questions: questionsReducer,
  favouriteQuestions: favouriteQuestionsReducer
})
