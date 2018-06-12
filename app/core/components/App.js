// @flow

import React from 'react';
import { Provider } from 'react-redux'
import { View, StyleProvider } from 'native-base';

import theme, { getTheme } from 'app/theme';

import createStore from '../services/store';
import Navigation from '../components/Navigation';
import Modals from '../components/Modals';

import routes from 'app/routes';

export default class App extends React.PureComponent<{}> {
    render() {
        const store = createStore();
        return (
            <StyleProvider style={getTheme(theme)}>
                <Provider store={store}>
                    <View style={{ flex: 1 }}>
                        <Navigation routes={routes} />
                        <Modals />
                    </View>
                </Provider>
            </StyleProvider>
        );
    }
}
