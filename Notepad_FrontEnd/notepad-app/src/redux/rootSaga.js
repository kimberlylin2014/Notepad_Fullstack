import {all, call} from 'redux-saga/effects';

// import sagas here
import userSagas from './user/user.sagas'

function* rootSaga() {
    yield all([call(userSagas)])
}

export default rootSaga;