// @flow

import type { Saga as ReduxSaga } from 'redux-saga';

export type Saga = ReduxSaga;

export type ModalConfig = {
    id?: string,
    title?: string | any,
    content?: any,
    // bgColor?: string,
    // viewProps?: Object,
    style?: Object,

    animation?: string | {
        in: string,
        out: string,
    },
    mode?: 'screen',
    screen?: Object,
};
