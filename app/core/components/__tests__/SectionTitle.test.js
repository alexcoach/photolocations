import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'native-base';
import SectionTitle from '../SectionTitle';

it('<SectionTitle> renders correctly', () => {
    const wrapper = shallow(
        <SectionTitle
            icon={{ name: 'home' }}
            text="Test Title"
            right={<Text>right</Text>}
            style={{ marginTop: 10 }}
        />
    );
    expect(wrapper.dive()).toMatchSnapshot();
});
