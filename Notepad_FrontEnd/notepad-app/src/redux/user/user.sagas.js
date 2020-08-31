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

function* registerUser({payload}) {    
    try {
        const { email, name, password } = payload;
        if (name.length < 2 || email.length < 17 || password.length < 5){
            throw Error('Please Check Form Requirements');
        } else {
            const response = yield fetch('http://localhost:3000/register', 
            {
                method: "POST",
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify(payload)
            });
            console.log(response)
            if(response.ok) {
                const user = yield response.json();
                yield put(registerUserSuccess(user));    
            } else {
                throw Error('User already exists');
            }    
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
        const response = yield fetch('http://localhost:3000/signin', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        if(response.ok) {
            const loggedInUser = yield response.json();
            yield put(signInUserSuccess(loggedInUser));
        } else {
            throw Error('Wrong Credentials')
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