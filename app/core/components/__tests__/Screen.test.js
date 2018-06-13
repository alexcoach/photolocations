import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { Text } from 'native-base';
import Screen from '../Screen';

const mockStore = configureStore([]);

const state = {};

it('<Screen> with children renders correctly', () => {
    const wrapper = shallow(
        <Screen
            title="Test Screen"
            left={{ type: 'back', icon: { name: 'home' }}}
        >
            <Text>Children</Text>
        </Screen>,
        { context: { store: mockStore(state) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
});

it('<Screen> with tabs renders correctly', () => {
    const wrapper = shallow(
        <Screen
            title="Test Screen"
            left={{ type: 'back', icon: { name: 'home' }}}
            tabs={[
                { icon: 'home', title: 'Tab1', content: <Text>Tab1 Content</Text> },
                { icon: 'home', title: 'Tab2', content: <Text>Tab2 Content</Text> },
            ]}
        />,
        { context: { store: mockStore(state) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
});
