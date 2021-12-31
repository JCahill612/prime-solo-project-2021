import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* getToys() {
  try {
    const response = yield axios.get('/api/toys/user');
    yield put({ 
                type: 'SET_USER_TOYS',
                payload : response.data
             });
  } catch (error) {
    console.log('Error with user login:', error);
  }
}


function* getAvailableToys() {
  try {
    const response = yield axios.get('/api/toys');
    yield put({ 
                type: 'SET_AVAILABLE_TOYS',
                payload : response.data
             });

  } catch (error) {
    console.log('Error with user login:', error);
  }
}


function* toySaga() {
  yield takeLatest('FETCH_TOYS', getToys);
  yield takeLatest('FETCH_AVAILABLE_TOYS', getAvailableToys);  
}

export default toySaga;
