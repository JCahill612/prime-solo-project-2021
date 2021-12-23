import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

//watcher saga
function* homeSaga() {
    yield takeLatest('fetch_toys', home)
};//end watcher saga

//generator function
function* home() {
    console.log('-----> in home');
    try {
        const response = yield axios.get('/toys');
        yield put({
            type: 'get_home',
            payload: response.data
        })
    } catch (err) {
        console.log('Error in home toys saga:', err);
    }
};//end homeSaga page

export default homeSaga;