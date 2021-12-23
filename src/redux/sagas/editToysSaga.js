import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* editToysSaga() {
    yield takeLatest('fetch_edit_toy', getEditToys);
    yield takeLatest('edit_toy', editToy);
    yield takeLatest('delete', deleteToy);
}

function* getEditToys(action) {
    try {
        const response = yield axios.get(`/account/edit/${action.payload}`);
        yield put({
            type: 'get_edit_toy',
            payload: response.data
        })
    } catch (err) {
        console.log('Error in accountDetail:', err)
    }
}//end getEditToys

function* editToy(action) {
    console.log('------> in editToy', action.payload);
    let id = action.payload.toy.post_id;
    let postName = action.payload.toy.post_name;
    let postCat = action.payload.toy.post_cat;
    let description = action.payload.toy.post_body;
    // let image = action.payload.post_image;
    let date = action.payload.updatedDate;
    try {
       yield axios.put(`/account/edit/update/${id}`, {postName, postCat, description, date})
    } catch (err) {
        console.log('Error in editToy:', err);
    }
};//end editToy

function* deleteToy(action){
    //action.payload will be the specific post_id
    let id = action.payload
    try{
        yield axios.delete(`/account/edit/delete/${id}`);
    }catch(err){
        console.log('Error deleting in deleteToy Saga:', err)
    }
};//end deleteToy


export default editToysSaga;