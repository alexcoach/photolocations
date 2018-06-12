// @flow

import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';

import {
    Container, Header, Body,
    Content, Thumbnail, Left, Right,
    Title, Tab, Tabs, TabHeading, Icon, Text, Button,
} from 'native-base';

import { closeModal } from 'core/actions/Modals';
import { Navigation } from 'core/services';

import theme from 'app/theme';

export type TabConfig = {
    icon?: string | Object,
    title?: any | string,
    content: any,
};

type Props = {
    title?: string,
    left?: {
        type?: string,
        icon?: Object,
    },
    right?: any,
    tabs?: Array<TabConfig>,
    dispatch: Function,
    children?: any,
};

class Screen extends React.PureComponent<Props>{
    renderHeaderLeft = () => {
        const { left } = this.props;
        if (!left) {
            return null;
        }
        const { type } = left;
        if (type === 'logo') {
            return (
                <Thumbnail square small source={require('assets/app-icon.png')} />
            );
        }
        if (type === 'back') {
            return (
                <Button transparent onPress={() => Navigation.goBack()}>
                    <Icon type="Feather" name="chevron-left" />
                </Button>
            );
        }
        if (type === 'closeModal') {
            return (
                <Button
                    transparent
                    onPress={() => {
                        this.props.dispatch(closeModal());
                    }}
                >
                    <Icon type="Feather" name="chevron-left" {...left.icon} />
                </Button>
            );
        }
        return null;
    };
    renderHeader = () => {
        const { tabs, title, right } = this.props;
        return (
            <Header hasTabs={!!(tabs && tabs.length)} >
                <Left>
                    {this.renderHeaderLeft()}
                </Left>
                <Body>
                    <Title>{title}</Title>
                </Body>
                <Right>{right}</Right>
            </Header>
        );
    };
    renderTabHeadingIcon = (tabConfig: TabConfig) => {
        if (!tabConfig.icon) {
            return null;
        }
        const iconProps = (typeof tabConfig.icon === 'string') ? { name: tabConfig.icon } : tabConfig.icon;
        return <Icon {...iconProps} />;

    };
    renderTabHeading = (tabConfig: TabConfig) => (
        <TabHeading>
            {this.renderTabHeadingIcon(tabConfig)}
            <Text>{tabConfig.title}</Text>
        </TabHeading>
    );
    renderTab = (tabConfig: TabConfig, index: number) => (
        <Tab key={index} heading={this.renderTabHeading(tabConfig)}>
            {tabConfig.content}
        </Tab>
    );
    renderTabs = () => {
        const { tabs } = this.props;
        if (!tabs || !tabs.length) {
            return null;
        }
        return (
            <Tabs>
                {tabs.map(this.renderTab)}
            </Tabs>
        );
    };
    renderContent = () => {
        const { children } = this.props;
        if (!children) {
            return null;
        }
        return <Content>{children}</Content>;
    };
    render() {
        return (
            <Container style={styles.container}>
                {this.renderHeader()}
                {this.renderTabs()}
                {this.renderContent()}
            </Container>
        );
    }
}

export default connect()(Screen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.brandLight,
    },
});
