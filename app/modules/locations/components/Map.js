// @flow

import React from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash.isequal';
import { StyleSheet } from 'react-native';
import { View, Button, Icon, Text, Spinner } from 'native-base';
import { withRouter } from 'react-router-native';

import theme from 'app/theme';
import Location from 'app/data/models/Location';

import { Map, MapMarker } from 'core/components';
import { Navigation, Geolocation } from 'core/services';


type Props = {
    Geolocation: Object,
    LocationsList: Object,
};

type State = {
    position: Object,
    newLocation: null | Object,
};

class LocationsMap extends React.PureComponent<Props, State> {
    state = {
        position: {
            latitude: 0,
            longitude: 0,
        },
        newLocation: null,
    };
    componentWillMount() {
        const {
            LocationsList: { items },
            Geolocation: { isDetected, position },
        } = this.props;
        if (isDetected) {
            this.setState({
                position,
            });
        }
        if (items.length) {
            this.fitMapToLocations(items);
        }
    }
    componentDidMount() {
        const { LocationsList: { items } } = this.props;
        if (items.length) {
            this.fitMapToLocations(items);
        }
    }
    componentWillReceiveProps(nextProps) {
        const {
            Geolocation: { isDetected },
            LocationsList: { items },
        } = this.props;
        const {
            Geolocation: {
                isDetected: nextIsDetected,
                position: nextPosition,
            },
            LocationsList: { items: nextItems },
        } = nextProps;
        if (!isDetected && nextIsDetected) {
            this.setState({
                position: nextPosition,
            });
        }
        if (this.mapRef && !isEqual(items, nextItems) && nextItems.length) {
            this.fitMapToLocations(nextItems);
        }
    }
    onMapTap = (e) => {
        if (this.state.newLocation) {
            this.setState({
                newLocation: e.nativeEvent.coordinate,
            });
        }
    };
    onCalloutTap = (location: Location) => (markerRef) => {
        markerRef.hideCallout();
        Navigation.modal('/locationDetails', { location });
    };
    getDistance = (location, unit) => {
        const {
            Geolocation: { position },
        } = this.props;
        return Geolocation.getDistance(location, position, unit).toFixed(2);
    };
    setMapRef = (ref: any) => {
        if (!this.mapRef) {
            this.mapRef = ref;
        }
    };
    mapRef: any;
    addNewLocation = () => {
        this.setState({
            newLocation: {},
        });
    };
    saveNewLocation = () => {
        Navigation.modal('/locationDetails', {
            location: new Location({
                ...this.state.newLocation,
                notes: [],
            }),
            newLocation: true,
        });
        this.setState({
            newLocation: null,
        });
    };
    cancelNewLocation = () => {
        this.setState({
            newLocation: null,
        });
    };
    fitMapToLocations = (locations) => {
        setTimeout(() => {
            this.mapRef.fitToCoordinates(locations, {
                edgePadding: mapEdgePadding,
                animated: true,
            });
        }, 100);
    };
    changeNewLocation = (e) => {
        this.setState({
            newLocation: e.nativeEvent.coordinate,
        });
    };
    renderCancelNewLocationButton = () => {
        if (!this.state.newLocation) {
            return null;
        }
        return (
            <Button
                iconRight rounded light onPress={this.cancelNewLocation}
                style={styles.controlButton}
            >
                <Text>Cancel</Text>
                <Icon type="Ionicons" name="md-close" style={[styles.buttonRightIcon, { marginRight: 15 }]} />
            </Button>
        );
    };
    renderSaveNewLocationButton = () => {
        if (!this.state.newLocation) {
            return null;
        }
        return (
            <Button
                iconRight rounded onPress={this.saveNewLocation}
                disabled={this.state.newLocation.latitude === undefined}
                style={styles.controlButton}
            >
                <Text>Save</Text>
                <Icon type="MaterialIcons" name="check" style={styles.buttonRightIcon} />
            </Button>
        );
    };
    renderAddLocationButton = () => {
        if (this.state.newLocation) {
            return null;
        }
        return (
            <Button
                iconRight rounded onPress={this.addNewLocation}
                style={styles.controlButton}
            >
                <Text>Add</Text>
                <Icon type="Entypo" name="location-pin" style={styles.buttonRightIcon} />
            </Button>
        );
    };
    renderMarkerCallout = (location: Location) => (
        <View style={styles.row}>
            <View style={styles.flex}>
                <Text>{location.name}</Text>
                <Text style={styles.helpText}>
                    {this.getDistance(location, 'K')} km, <Text style={styles.helpText}>
                    <Icon type="MaterialCommunityIcons" name="message-text" style={styles.helpText}/>
                    {location.notes.length}
                </Text>
                </Text>
            </View>
            <View>
                <Icon type="Feather" name="chevron-right" style={styles.chevron}/>
            </View>
        </View>
    );
    renderMarker = (location: Location, index: number) => (
        <MapMarker
            key={index}
            coordinate={location}
            title={this.renderMarkerCallout(location)}
            opacity={this.state.newLocation ? 0.3 : 1}
            onCalloutPress={this.onCalloutTap(location)}
        />
    );
    renderMarkers = () => {
        const { LocationsList: { items } } = this.props;
        if (!items.length) {
            return null;
        }
        return (
            <View>
                {items.map(this.renderMarker)}
            </View>
        );
    };
    renderNewLocationMarker = () => {
        const { newLocation } = this.state;
        if (!newLocation || (newLocation.latitude === undefined)) {
            return null;
        }
        return (
            <MapMarker
                coordinate={newLocation}
                draggable={true}
                onDragEnd={this.changeNewLocation}
                pinColor={theme.brandPrimary}
            />
        );
    };
    renderActivityIndicator = () => {
        const { LocationsList } = this.props;
        if (!LocationsList.isLoading) {
            return null;
        }
        return <Spinner color={theme.brandPrimary} style={styles.loader} />;
    };
    renderNewLocationControl = () => {
        const { LocationsList } = this.props;
        if (LocationsList.isLoading) {
            return null;
        }
        return (
            <View style={[styles.row, styles.newLocationControl]}>
                {this.renderActivityIndicator()}
                {this.renderAddLocationButton()}
                {this.renderSaveNewLocationButton()}
                {this.renderCancelNewLocationButton()}
            </View>
        );
    };
    render() {
        return (
            <View style={styles.wrap}>
                <Map
                    ref={this.setMapRef}
                    style={styles.flex}
                    initialRegion={{
                        ...this.state.position,
                        latitudeDelta: 0.2922,
                        longitudeDelta: 0.2421,
                    }}
                    onPress={this.onMapTap}
                    showsUserLocation
                >
                    {this.renderMarkers()}
                    {this.renderNewLocationMarker()}
                </Map>
                {this.renderNewLocationControl()}
            </View>
        );
    }
}

export default connect(state => ({
    Geolocation: state.Geolocation,
    LocationsList: state.LocationsList,
}))(withRouter(LocationsMap));

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    newLocationControl: {
        flex: 1,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    controlButton: {
        marginLeft: 5,
    },
    buttonRightIcon: {
        marginLeft: -10,
        marginRight: 10,
    },
    loader: {
        marginBottom: -20,
        marginRight: 0,
    },
    helpText: {
        fontSize: 12,
        color: theme.listNoteColor,
    },
    chevron: {
        fontSize: 18,
        color: theme.listNoteColor,
    },
});

const mapEdgePadding = {
    top: 40,
    right: 30,
    bottom: 50,
    left: 30,
};
