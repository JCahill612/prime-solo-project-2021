import { combineReducers } from 'redux';


const userToys = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_TOYS':
        return action.payload;
      default:
        return state;
    }
  };

  const editToyValues = (state = [], action) => {
    switch (action.type) {
      case 'EDIT_VALUES':
        return action.payload;
      case 'CLEAR_EDIT_VALUES':
        return []
      default:
        return state;
    }
  };

  const availableToys = (state = [], action) => {
    switch (action.type) {
      case 'SET_AVAILABLE_TOYS':
        return action.payload;
      default:
        return state;
    }
  };

  



export default combineReducers({
  userToys,
  editToyValues,
  availableToys
});
  