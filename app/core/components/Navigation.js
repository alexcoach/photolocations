// @flow

import React from 'react';
import { connect } from 'react-redux';
import { NativeRouter, Route, withRouter } from 'react-router-native';
import { View } from 'native-base';

import NavigationService from 'core/services/Navigation'

type Props = {
    routes: Array<Object>,
    dispatch: Function,
};

const NavigationScope = withRouter(({ routes, renderRoute, history, dispatch }) => {
    NavigationService.init(routes, history, dispatch);
    return routes.map(renderRoute);
});

class Navigation extends React.PureComponent<Props>{
    renderRoute = (config: Object, key: number) => <Route key={key} {...config} />;
    render() {
        return (
            <NativeRouter>
                <View style={{ flex: 1 }}>
                    <NavigationScope
                        routes={this.props.routes}
                        renderRoute={this.renderRoute}
                        dispatch={this.props.dispatch}
                    />
                </View>
            </NativeRouter>
        );
    }
}
export default connect()(Navigation);
