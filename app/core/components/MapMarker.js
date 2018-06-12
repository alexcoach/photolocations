// @flow

import React from 'react';
import { Marker, Callout } from 'react-native-maps';

export default class MapMarker extends React.PureComponent<*>{
    onCalloutPress = () => {
        const { onCalloutPress } = this.props;
        if (onCalloutPress) {
            onCalloutPress(this.marker);
        }
    };
    getTitle = () => {
        const { title } = this.props;
        if (title && !React.isValidElement(title)) {
            return title;
        }
        return undefined;
    };
    getRef = (ref: any) => {
        if (!this.marker) {
            this.marker = ref;
        }
    };
    marker: any;
    renderCallout = () => {
        const { title } = this.props;
        if (!title || !React.isValidElement(title)) {
            return null;
        }
        return (
            <Callout>{title}</Callout>
        );
    };
    render() {
        return (
            <Marker
                ref={this.getRef}
                {...this.props}
                title={this.getTitle()}
                onCalloutPress={this.onCalloutPress}
            >
                {this.renderCallout()}
            </Marker>
        );
    }
}
