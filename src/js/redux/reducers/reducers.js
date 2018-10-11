import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import licenseCategoriesReducer from './licenseCategoriesReducer'

export default combineReducers({
  login: loginReducer,
  licenseCategories: licenseCategoriesReducer
})
