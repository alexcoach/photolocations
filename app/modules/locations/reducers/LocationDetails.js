// @flow

import {
    LOCATION_DETAILS_SET,
    LOCATION_DETAILS_SAVE,
    LOCATION_DETAILS_CLEAR,
} from '../actions/LocationDetails';

const DEFAULT_STATE = {
    location: {},
};

const setLocationDetails = (state: Object, { location }) => ({
    ...state,
    location,
});

const saveLocationDetails = (state: Object, { location }) => ({
    ...state,
    location,
});

const clearLocationDetails = () => ({
    ...DEFAULT_STATE,
});

export default (state: Object = DEFAULT_STATE, action: Object) => {
    switch (action.type) {
        case LOCATION_DETAILS_SET:
            return setLocationDetails(state, action);
        case LOCATION_DETAILS_SAVE:
            return saveLocationDetails(state, action);
        case LOCATION_DETAILS_CLEAR:
            return clearLocationDetails();
        default:
            return state;
    }
};