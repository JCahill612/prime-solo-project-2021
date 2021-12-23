import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';

//watcher
function* allToysSaga(){
    yield takeLatest('fetch_all', allToys)
};//end watcher

//generator
function* allToys(){
    try{
        //send GET request to /Toys/all and send data to our reducer
        const response = yield axios.get('/toys/all')
        yield put({
            type: 'get_all',
            payload: response.data
        })
    }catch(err){
        console.log('Error in all toys saga:', err)
    }
};//end sellToys

export default allToysSaga;