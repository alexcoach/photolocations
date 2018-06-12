// @flow

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import appSagas from 'app/sagas';
import appReducers from 'app/reducers';

import ENV from './ENV';
import coreReducers from '../reducers';
import coreSagas from '../sagas';

const clearable = reducer => (currentState, action) => {
    let state = currentState;
    if (action.type === 'CLEAR_STORE') {
        state = {};
    }
    return reducer(state, action);
};


const configureSaga = (sagas: Function):Function => function* configureSagaGenerator() {
    yield all(sagas.map(saga => fork(saga)));
};

export default () => {
    const middleware = [];
    const sagaMiddleware = createSagaMiddleware();
    middleware.push(sagaMiddleware);

    let devTools = f => f;
    if ((ENV.NODE_ENV !== 'production') && (typeof window !== 'undefined') && window.devToolsExtension) {
        devTools = window.devToolsExtension();
    }

    const store = createStore(
        clearable(combineReducers({
            ...coreReducers,
            ...appReducers,
        })),
        {},
        compose(applyMiddleware(...middleware), devTools),
    );

    sagaMiddleware.run(configureSaga([...coreSagas, ...appSagas]));

    return store;
};
