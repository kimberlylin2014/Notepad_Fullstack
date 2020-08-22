import { createStore, applyMiddleware} from 'redux';
// Middlewares
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { persistStore } from 'redux-persist';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);