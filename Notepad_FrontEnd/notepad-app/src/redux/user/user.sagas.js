import userActionTypes from './user.types';
import { all, put, takeLatest, call } from 'redux-saga/effects';
import { registerUserSuccess, registUserFailure } from './user.actions';

function* registerUser({payload}) {
    try {
        const response = yield fetch('http://localhost:3000/register', 
                        {
                            method: "POST",
                            headers: {'Content-Type': "application/json"},
                            body: JSON.stringify(payload)
                        });
        const user = yield response.json();
        yield put(registerUserSuccess(user))              
    } catch(error) {
        yield put(registUserFailure(error.message))
    }
}

function* onUserRegisterStart() {
    yield takeLatest(userActionTypes.REGISTER_USER_START, registerUser)
}

function* userSagas() {
    yield all([call(onUserRegisterStart)])
}

export default userSagas;