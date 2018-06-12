// @flow
import React from 'react';

import { openModal } from 'core/actions/Modals';

import './backHandler';

const Navigation: Object = {
    init: (routes: Array<Object>, history: Object, dispatch: Function) => {
        Navigation.routes = routes;
        Navigation.history = history;
        Navigation.dispatch = dispatch;
        Navigation.redirect = history.push;
        Navigation.replace = history.replace;
        Navigation.goBack = history.goBack;
        Navigation.getState = () => history.location.state;
    },
};

Navigation.modal = (modalRoute: string, state: ?Object = {}) => {
    const screenRoute = Navigation.routes.find(route => route.path === modalRoute);
    if (!screenRoute) {
        throw new Error(`Route "${modalRoute}" not found`);
    }
    const ModalScreen = screenRoute.component;
    if (Navigation.dispatch) {
        Navigation.dispatch(openModal({
            animation: 'slideRight',
            mode: 'screen',
            content: <ModalScreen modalState={state}/>,
        }));
    }
};

export default Navigation
