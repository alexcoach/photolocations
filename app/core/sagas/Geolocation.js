// @flow
import { takeLatest, put, call } from 'redux-saga/effects';

import type { Saga } from 'core/types';

import { Geolocation } from 'core/services';

import {
    GEOLOCATION_GET_POSITION,
    GEOLOCATION_GET_POSITION_SUCCESS,
    GEOLOCATION_GET_POSITION_ERROR,
} from '../actions/Geolocation';

function* getPosition(): Saga {
    try {
        const position = yield call(Geolocation.getPosition);
        yield put({
            type: GEOLOCATION_GET_POSITION_SUCCESS,
            position,
        });
    } catch (error) {
        yield put({
            type: GEOLOCATION_GET_POSITION_ERROR,
            error,
        });
    }
}


export default function* listSaga(): Saga {
    yield takeLatest(GEOLOCATION_GET_POSITION, getPosition);
};
