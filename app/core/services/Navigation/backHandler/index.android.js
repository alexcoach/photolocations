// @flow

import { BackHandler } from 'react-native';

import Navigation from '../index';

BackHandler.addEventListener('hardwareBackPress', () => {
    if (Navigation.history.canGo(-1)) {
        Navigation.goBack();
    }
    return true;
});

