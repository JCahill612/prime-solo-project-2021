import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//watcher saga
function* toyBoxSaga(){
    yield takeLatest('FETCH_toyBox', toyBox)
};//end watcher saga

//generator function
function* toyBox(){
    console.log('------>in toy Box');
    try{
        const response = yield axios.get('/toys/toybox')
        yield put({
            type: 'GET_toyBox',
            payload: response.data
        })
    }catch(err){
        console.log('Error in toy Box generator.', err);
    };//end try
    
};//end toyBox generator

export default toyBoxSaga;