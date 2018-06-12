// @flow

import {
    MODALS_OPEN_NEXT,
    MODALS_CLOSE_CURRENT,
} from '../actions/Modals';

const DEFAULT_STATE = {
    queue: [],
};

const openNext = (state, { config }) => {
    const queue = state.queue;
    queue.push({
        id: Math.random().toString(),
        ...config,
    });
    return {
        ...state,
        queue,
    };
};

const closeCurrent = (state) => {
    const queue = state.queue;
    queue.pop();
    return {
        ...state,
        queue,
    };
};

export default (state:Object = DEFAULT_STATE, action:Object):Object => {
    switch (action.type) {
        case MODALS_OPEN_NEXT:
            return openNext(state, action);
        case MODALS_CLOSE_CURRENT:
            return closeCurrent(state);
        default:
            return state;
    }
};
