// @flow

import React from 'react';
import { connect } from 'react-redux';

import { Screen } from 'core/components';

import { setLocationDetails } from '../actions/LocationDetails';

import LocationDetails from '../components/LocationDetails';

type Props = {
    location: Object,
    modalState: Object,
    dispatch: Function,
};

class LocationDetailsScreen extends React.PureComponent<Props> {
    componentWillMount() {
        this.props.dispatch(setLocationDetails(this.props.modalState.location));
    }
    getLocationName = () => {
        const { location } = this.props;
        if (!location.name) {
            return 'New Location';
        }
        return location.name;
    };
    render() {
        return (
            <Screen
                left={{ type: 'closeModal' }}
                title={this.getLocationName()}
            >
                <LocationDetails newLocation={this.props.modalState.newLocation} />
            </Screen>
        );
    }
}

export default connect(state => ({
    location: state.LocationDetails.location,
}))(LocationDetailsScreen);
