import { combineReducers } from 'redux';


const tradeOffers = (state = [], action) => {
    switch (action.type) {
      case 'SET_TRADE_OFFER':
        return action.payload;
      default:
        return state;
    }
  };

  const tradeRequests = (state = [], action) => {
    switch (action.type) {
      case 'SET_TRADE_REQUEST':
        return action.payload;
      default:
        return state;
    }
  };

 
  const contactDetail = (state = [{username: "", user_email: "",phone_no: "", user_address: ""}], action) => {
    switch (action.type) {
      case 'SET_CONTACT_DETAIL':
        return action.payload;
      default:
        return state;
    }
  };


  

  



export default combineReducers({
  tradeOffers,
  tradeRequests,
  contactDetail
});
  