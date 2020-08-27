import postActionTypes from './post.types';
import { createPostSuccess, 
        createPostFailure, 
        getUserPostsSuccess,
        getUserPostsFailure, 
        updatePostSuccess, 
        updatePostFailure,
        deletePostFailure,
        deletePostSuccess } from './post.actions';
import { all, call, takeLatest, put } from 'redux-saga/effects';

function* getUserPosts({payload}) {
    try {
        const response = yield fetch(`http://localhost:3000/users/${payload.currentUserID}/posts`)
        const posts = yield response.json();
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
        const response = yield fetch(`http://localhost:3000/posts/${postID}/update`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text, userID})
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

function* deletePost({payload: {currentUser, postData}}) {
    try {
        console.log(currentUser)
        console.log(postData);
        // Delete post from post table
        // Delete postID from User table
        // update POST STATE and USER STATE
        const response = yield fetch(`http://localhost:3000/user/${currentUser.id}/posts/${postData.id}/delete`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({currentUser, postData})
        })
        const {comments, updatedUser} = yield response.json();
        yield put(deletePostSuccess({comments, updatedUser}))
    } catch(error) {
        yield put(deletePostFailure(error.message))
    }
}

function* onDeletePostStart() {
    yield takeLatest(postActionTypes.DELETE_POST_START, deletePost)
}

function* postSagas() {
    yield all([call(onCreatePostStart), call(onGetUserPostsStart), call(onUpdatePostStart), call(onDeletePostStart)])
}

export default postSagas;