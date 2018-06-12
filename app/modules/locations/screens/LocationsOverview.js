// @flow

import React from 'react';
import { connect } from 'react-redux';

import { Screen } from 'core/components';
import { getPosition } from 'core/actions/Geolocation';

import LocationsMap from '../components/Map';
import LocationsListComponent from '../components/List';

import { getLocationsList } from '../actions/LocationsList';

type Props = {
    Geolocation: Object,
    LocationsList: Object,
    dispatch: Function,
};

class LocationsOverview extends React.PureComponent<Props> {
    componentWillMount() {
        const { Geolocation, LocationsList } = this.props;
        if (!Geolocation.isDetected && !Geolocation.isDetecting) {
            this.props.dispatch(getPosition());
        }
        if (!LocationsList.items.length && !LocationsList.isLoading) {
            this.props.dispatch(getLocationsList());
        }
    }
    render() {
        return (
            <Screen
                left={{ type: 'logo' }}
                title="Photo Locations"
                tabs={[
                    {
                        icon: { type: 'MaterialCommunityIcons', name: 'map-marker-multiple' },
                        title: 'Map',
                        content: <LocationsMap />,
                    },
                    {
                        icon: { type: 'Foundation', name: 'list-thumbnails' },
                        title: 'List',
                        content: <LocationsListComponent />,
                    },
                ]}
            />
        );
    }
}

export default connect(state => ({
    Geolocation: state.Geolocation,
    LocationsList: state.LocationsList,
}))(LocationsOverview);
