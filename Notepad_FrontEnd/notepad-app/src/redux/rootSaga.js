import {all, call} from 'redux-saga/effects';

// import sagas here
import userSagas from './user/user.sagas';
import postSagas from './posts/post.sagas';

function* rootSaga() {
    yield all([call(userSagas), call(postSagas)])
}

export default rootSaga;