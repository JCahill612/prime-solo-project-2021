import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import toyBoxReducer from './toyBoxReducer';
import allToysReducer from './allToysReducer';
import homeReducer from './homeReducer';
import details from './details';
import accountsReducer from './accountsReducer';
import editToyReducer from './editToyReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  toyBoxReducer, //gets data for Toy box page
  allToysReducer, //all Toys reducer that had all Toys data
  homeReducer,// limit 6 for home page from all Toys
  details, //get all details, specifically held for certain Toys
  accountsReducer, //get account data
  editToyReducer, //gets specific data for editing
});

export default rootReducer;
