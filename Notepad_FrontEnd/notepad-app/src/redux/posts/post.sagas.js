import postActionTypes from './post.types';
import { createPostSuccess, createPostFailure, getUserPostsSuccess, getUserPostsFailure, updatePostSuccess, updatePostFailure } from './post.actions';
import { all, call, takeLatest, put } from 'redux-saga/effects';

function* getUserPosts({payload}) {
    try {
        yield console.log(payload);
        const response = yield fetch(`http://localhost:3000/users/${payload.currentUserID}/posts`)
        const posts = yield response.json();
        console.log(posts)
        yield put(getUserPostsSuccess(posts));
    } catch (error) {
        yield put(getUserPostsFailure(error.message))
    }
}

function* onGetUserPostsStart() {
    yield takeLatest(postActionTypes.GET_USERPOSTS_START, getUserPosts)
}

function* createPost({payload}){
    try {
        console.log(payload)
        console.log(payload.currentUserID)
        const response = yield fetch(`http://localhost:3000/users/${payload.currentUserID}/createPost`, {
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

function* updatePost({payload: {postID, text, userID}}) {
    try {
        console.log(text);
        console.log(postID)
        console.log(userID)
        const response = yield fetch(`http://localhost:3000/posts/${postID}/update`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text, postID, userID})
        })
        const userComments = yield response.json();
        yield put(updatePostSuccess(userComments))
    } catch(error) {
        yield put(updatePostFailure(error.message))
    }
}

function* onUpdatePostStart() {
    yield takeLatest(postActionTypes.UPDATE_POST_START, updatePost)
}

function* postSagas() {
    yield all([call(onCreatePostStart), call(onGetUserPostsStart), call(onUpdatePostStart)])
}

export default postSagas;