// @flow

import {
    LOCATIONS_LIST_GET,
    LOCATIONS_LIST_GET_SUCCESS,
    LOCATIONS_LIST_GET_ERROR,
    LOCATIONS_LIST_SAVE,
    LOCATIONS_LIST_SAVE_SUCCESS,
    LOCATIONS_LIST_SAVE_ERROR,
} from '../actions/LocationsList';

const DEFAULT_STATE = {
    items: [],
    isLoading: false,
    isSaving: false,
    error: '',
};

const getLocationsList = (state: Object) => ({
    ...state,
    isLoading: true,
    error: '',
});

const getLocationsListSuccess = (state: Object, { items }: Object) => ({
    ...state,
    isLoading: false,
    items,
});

const getLocationsListError = (state: Object, { error }: Object) => ({
    ...state,
    isLoading: false,
    error,
});

const saveLocationsList = (state: Object) => ({
    ...state,
    isSaving: true,
    error: '',
});

const saveLocationsListSuccess = (state: Object, { items }: Object) => ({
    ...state,
    isSaving: false,
    items,
});

const saveLocationsListError = (state: Object, { error }: Object) => ({
    ...state,
    isSaving: false,
    error,
});

export default (state: Object = DEFAULT_STATE, action: Object) => {
    switch (action.type) {
        case LOCATIONS_LIST_GET:
            return getLocationsList(state);
        case LOCATIONS_LIST_GET_SUCCESS:
            return getLocationsListSuccess(state, action);
        case LOCATIONS_LIST_GET_ERROR:
            return getLocationsListError(state, action);
        case LOCATIONS_LIST_SAVE:
            return saveLocationsList(state);
        case LOCATIONS_LIST_SAVE_SUCCESS:
            return saveLocationsListSuccess(state, action);
        case LOCATIONS_LIST_SAVE_ERROR:
            return saveLocationsListError(state, action);
        default:
            return state;
    }
};