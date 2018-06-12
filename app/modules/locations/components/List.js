// @flow

import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { List, ListItem, Text, Left, Right, Body, Icon, Spinner } from 'native-base';

import theme from 'app/theme';

import { Navigation, Geolocation } from 'core/services';

type Props = {
    Geolocation: Object,
    LocationsList: Object,
};

class LocationsList extends React.PureComponent<Props>{
    onLocationSelect = (location) => () => {
        Navigation.modal('/locationDetails', { location });
    };
    getDistance = (location, unit) => {
        const {
            Geolocation: { position },
        } = this.props;
        return Geolocation.getDistance(location, position, unit).toFixed(2);
    };
    getSortedItems = () => {
        const {
            LocationsList: { items },
            Geolocation: { position },
        } = this.props;
        let sortedItems = [...items];
        sortedItems.sort((a, b) =>
            (Geolocation.getDistance(a, position) < Geolocation.getDistance(b, position)) ? -1 : 1);
        return sortedItems;
    };
    renderItem = (location) => (
        <ListItem icon button onPress={this.onLocationSelect(location)}>
            <Left>
                <Icon type="Entypo" name="location-pin" />
            </Left>
            <Body>
                <Text>
                    {location.name}
                </Text>
                <Text style={styles.helpText}>
                    {this.getDistance(location, 'K')} km, <Text style={styles.helpText}>
                        <Icon type="MaterialCommunityIcons" name="message-text" style={styles.helpText}/>
                        {location.notes.length}
                    </Text>
                </Text>
            </Body>
            <Right>
                <Icon type="Feather" name="chevron-right" />
            </Right>
        </ListItem>
    );
    render() {
        const { LocationsList: { isLoading } } = this.props;
        if (isLoading) {
            return <Spinner color={theme.brandPrimary} />;
        }
        return (
            <List
                dataArray={this.getSortedItems()}
                renderRow={this.renderItem}
            />
        );
    }
}

export default connect(state => ({
    LocationsList: state.LocationsList,
    Geolocation: state.Geolocation,
}))(LocationsList);

const styles = StyleSheet.create({
    helpText: {
        fontSize: 12,
        color: theme.listNoteColor,
    },
});
