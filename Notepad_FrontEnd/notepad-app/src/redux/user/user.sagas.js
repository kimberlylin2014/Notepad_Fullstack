import userActionTypes from './user.types';
import postActionTypes from '../posts/post.types';
import { all, put, takeLatest, call } from 'redux-saga/effects';
import { registerUserSuccess, 
         registerUserFailure, 
         signInUserSuccess, 
         signInUserFailure, 
         updateCurrentUserSuccess, 
         updateCurrentUserFailure,
        } from './user.actions';
import { fetchRegisterUser, fetchSignInUser } from './user.apis';

export function* registerUser({payload}) {    
    try {
        const userData = yield fetchRegisterUser(fetch, payload);
        if(userData) {
            yield put(registerUserSuccess(userData));      
        } else {
            yield put(registerUserFailure("Please Check Form Requirements"))
        }              
    } catch(error) {
        yield put(registerUserFailure(error.message))
    }
}

function* onUserRegisterStart() {
    yield takeLatest(userActionTypes.REGISTER_USER_START, registerUser)
}

function* signInUser({payload}) {
    try {
        const loggedInUser = yield fetchSignInUser(fetch, payload)
        if(loggedInUser) {
            yield put(signInUserSuccess(loggedInUser));
        } else {
            yield put(signInUserFailure('Wrong Credentials'));
        }
        
    } catch(error) {
        yield put(signInUserFailure(error.message));
    }
}

function* onSignInUserStart() {
    yield takeLatest(userActionTypes.SIGNIN_USER_START, signInUser)
}

function* updateUser({payload}) {
    try {
        yield put(updateCurrentUserSuccess(payload.updatedUser))
    } catch(error) {
        yield put(updateCurrentUserFailure(error.message))
    }
}

function* onCreatePostSuccess() {
    yield takeLatest(postActionTypes.CREATE_POST_SUCCESS, updateUser)
}


function* onDeletePostSuccess() {
    yield takeLatest(postActionTypes.DELETE_POST_SUCCESS, updateUser)
}

function* userSagas() {
    yield all([call(onUserRegisterStart), call(onSignInUserStart), call(onCreatePostSuccess), call(onDeletePostSuccess)])
}

export default userSagas;