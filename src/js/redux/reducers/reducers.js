import { combineReducers } from 'redux'
import testReducer from './testReducer'
import authReducer from './authReducer'
import questionsReducer from './questionsReducer'
import savedQuestionsReducer from './savedQuestionsReducer'
import licenseCategoriesReducer from './licenseCategoriesReducer'

export default combineReducers({
  auth: authReducer,
  test: testReducer,
  licenseCategories: licenseCategoriesReducer,
  questions: questionsReducer,
  savedQuestions: savedQuestionsReducer
})
