// @flow
import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Icon } from 'native-base';

import theme from 'app/theme';

type Props = {
    icon?: Object,
    text?: string,
    right?: any,
    style?: Object,
};

export default class SectionTitle extends React.PureComponent<Props> {
    renderRight = () => {
        const { right } = this.props;
        if (!right) {
            return null;
        }
        return (
            <View>
                {right}
            </View>
        );
    };
    renderIcon = () => {
        const { icon } = this.props;
        if (!icon) {
            return null;
        }
        return (
            <Icon {...icon} style={styles.icon} />
        );
    };
    render() {
        const { text, style } = this.props;
        return (
            <View style={[styles.row, styles.wrap, style]}>
                {this.renderIcon()}
                <View style={styles.flex}>
                    <Text>{text}</Text>
                </View>
                {this.renderRight()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        width: '100%',
        backgroundColor: theme.muted,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flex: {
        flex: 1,
    },
    icon: {
        marginRight: 5,
    },
});
