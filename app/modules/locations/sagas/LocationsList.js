// @flow
import { takeLatest, put, call, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import type { Saga } from 'core/types';
import LocationsApi from 'app/data/api/Locations';

import {
    LOCATIONS_LIST_GET,
    LOCATIONS_LIST_GET_SUCCESS,
    LOCATIONS_LIST_GET_ERROR,
    LOCATIONS_LIST_SAVE,
    LOCATIONS_LIST_SAVE_SUCCESS,
    LOCATIONS_LIST_SAVE_ERROR,
} from '../actions/LocationsList';
import {
    LOCATION_DETAILS_SAVE,
} from '../actions/LocationDetails';


function* loadLocations({ payload }): Saga {
    try {
        let items = yield call(AsyncStorage.getItem, 'locations');
        if (!items) {
            items = yield call(LocationsApi.getLocations, payload);
            yield put({
                type: LOCATIONS_LIST_SAVE,
                items,
            });
        } else {
            items = JSON.parse(items);
        }
        yield put({
            type: LOCATIONS_LIST_GET_SUCCESS,
            items,
        });
    } catch (error) {
        yield put({
            type: LOCATIONS_LIST_GET_ERROR,
            error,
        });
    }
}

function* saveLocations({ items }): Saga {
    try {
        yield call(AsyncStorage.setItem, 'locations', JSON.stringify(items));
        yield put({
            type: LOCATIONS_LIST_SAVE_SUCCESS,
            items,
        });
    } catch (error) {
        yield put({
            type: LOCATIONS_LIST_SAVE_ERROR,
            error,
        });
    }
}

function* saveLocationDetails ({ location }: Object): Saga {
    const stateItems = yield select(state => state.LocationsList.items);
    let found = false;
    const items = stateItems.map(item => {
        if (item.id === location.id) {
            found = true;
            return location;
        }
        return item;
    });
    if (!found) {
        items.push(location);
    }
    yield put({
        type: LOCATIONS_LIST_SAVE,
        items,
    });
}

export default function* listSaga(): Saga {
    yield takeLatest(LOCATIONS_LIST_GET, loadLocations);
    yield takeLatest(LOCATIONS_LIST_SAVE, saveLocations);
    yield takeLatest(LOCATION_DETAILS_SAVE, saveLocationDetails);
};
