import createSagaMiddleware from 'redux-saga';

import {
    createStore,
    applyMiddleware
} from 'redux';
import {
    composeWithDevTools
} from 'redux-devtools-extension';
import {
    imagesReducer
} from './reducers'
import sagas from './sagas'


const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
export const store = createStore(imagesReducer, composeWithDevTools(applyMiddleware(...middlewares)));
sagaMiddleware.run(sagas);