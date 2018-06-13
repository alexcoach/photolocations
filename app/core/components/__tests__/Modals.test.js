import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { Text } from 'native-base';

import Modals from '../Modals';

const mockStore = configureStore([]);

const state = {
    Modals: {
        queue: [
            {
                id: 'test',
                content: <Text>Modal Content</Text>
            }
        ],
    },
};

it('<Modals> renders correctly', () => {
    const wrapper = shallow(
        <Modals />,
        { context: { store: mockStore(state) } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
});
