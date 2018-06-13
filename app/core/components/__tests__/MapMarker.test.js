import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'native-base';
import MapMarker from '../MapMarker';

it('<MapMarker> renders correctly', () => {
    const wrapper = shallow(
        <MapMarker coordinate={{ latitude: 0, longitude: 0 }} />
    );
    expect(wrapper.dive()).toMatchSnapshot();
});
