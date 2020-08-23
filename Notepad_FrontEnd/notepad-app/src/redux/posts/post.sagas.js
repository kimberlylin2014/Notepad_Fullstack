import postActionTypes from './post.types';
import { createPostSuccess, createPostFailure } from './post.actions';
import { all, call, takeLatest, put } from 'redux-saga/effects';

function* createPost({payload}){
    try {
        console.log(payload)
        const response = yield fetch('http://localhost:3000/createPost', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        const data = yield response.json();
        yield put(createPostSuccess(data))
    } catch(error) {
        yield put(createPostFailure(error.message))
    }
}

function* onCreatePostStart() {
    yield takeLatest(postActionTypes.CREATE_POST_START, createPost)
}

function* postSagas() {
    yield all([call(onCreatePostStart)])
}

export default postSagas;