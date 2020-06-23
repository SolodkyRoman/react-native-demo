import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import saga from './saga';
import reducer from './reducer';
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer,  composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(saga);

export default store;
