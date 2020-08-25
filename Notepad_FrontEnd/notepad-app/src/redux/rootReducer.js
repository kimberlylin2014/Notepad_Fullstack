import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import reducers here
import userReducer from './user/user.reducer';
import postReducer from './posts/post.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'post']
}

const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer
});

export default persistReducer(persistConfig, rootReducer);