import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* getTradeOffers() {
  try {

    const response = yield axios.get('/api/trade/offer');

    yield put({ 
                type: 'SET_TRADE_OFFER',
                payload : response.data
             });

  } catch (error) {

    console.log('Error with trade offer saga:', error);

  }
}


function* deleteTradeOffer(action) {
    try {
  
     yield axios.delete(`/api/trade/offer/${action.payload}`);
  
      yield put({ 
                  type: 'FETCH_TRADE_OFFERS'
               })
  
    } catch (error) {
  
      console.log('Error with trade offer saga:', error);
  
    }
  }

  function* getTradeRequests() {
    try {
  
      const response = yield axios.get('/api/trade/request');
  
      yield put({ 
                  type: 'SET_TRADE_REQUEST',
                  payload : response.data
               });
  
    } catch (error) {
  
      console.log('Error with trade request saga:', error);
  
    }
  }


  function* getRequestContactDetails(action) {
    try {
  
      const response = yield  axios.get(`/api/trade/requestcontact/${action.payload}`)
  
      yield put({ 
                  type: 'SET_CONTACT_DETAIL',
                  payload : response.data
               });
  
    } catch (error) {
  
      console.log('Error with trade contact detail saga:', error);
  
    }
  }


  
  function* getOfferContactDetails(action) {
    try {
  
      const response = yield  axios.get(`/api/trade/offercontact/${action.payload}`)
  
      yield put({ 
                  type: 'SET_CONTACT_DETAIL',
                  payload : response.data
               });
  
    } catch (error) {
  
      console.log('Error with trade contact detail saga:', error);
  
    }
  }



  

function* tradeSaga() {
  yield takeLatest('FETCH_TRADE_OFFERS', getTradeOffers);
  yield takeLatest('DELETE_TRADE_REQUEST', deleteTradeOffer);
  yield takeLatest('FETCH_TRADE_REQUESTS', getTradeRequests); 
  yield takeLatest('FETCH_REQUEST_CONTACT_DETAILS', getRequestContactDetails); 
  yield takeLatest('FETCH_OFFER_CONTACT_DETAILS', getOfferContactDetails); 
}

export default tradeSaga;
