// @flow

import {
    GEOLOCATION_GET_POSITION,
    GEOLOCATION_GET_POSITION_SUCCESS,
    GEOLOCATION_GET_POSITION_ERROR,
} from '../actions/Geolocation';

const DEFAULT_STATE = {
    position: {},
    isDetected: false,
    isDetecting: false,
};

const getPosition = (state) => {
    return {
        ...state,
        isDetecting: false,
        error: '',
    };
};

const getPositionSuccess = (state, { position }) => {
    return {
        ...state,
        position,
        isDetected: true,
        isDetecting: false,
    };
};

const getPositionError = (state, { error }) => {
    return {
        ...state,
        isDetecting: false,
        error,
    };
};

export default (state:Object = DEFAULT_STATE, action:Object):Object => {
    switch (action.type) {
        case GEOLOCATION_GET_POSITION:
            return getPosition(state);
        case GEOLOCATION_GET_POSITION_SUCCESS:
            return getPositionSuccess(state, action);
        case GEOLOCATION_GET_POSITION_ERROR:
            return getPositionError(state, action);
        default:
            return state;
    }
};
