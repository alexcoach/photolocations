import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { Text } from 'native-base';

import routes from 'app/routes';
import Navigation from '../Navigation';

const mockStore = configureStore([]);

const state = {};

it('<Navigation> renders correctly', () => {
    const wrapper = shallow(
        <Navigation
            routes={routes}
        >
            <Text>Children</Text>
        </Navigation>,
        { context: { store: mockStore(state) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
});
