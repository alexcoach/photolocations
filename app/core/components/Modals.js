// @flow
import React from 'react';
import { connect } from 'react-redux';

import Modal from 'react-native-modal';
import { View } from 'native-base';

import type { ModalConfig } from 'core/types';

import Screen from './Screen';

import { closeModal } from '../actions/Modals';


const animations = {
    fade: {
        in: 'fadeIn',
        out: 'fadeOut',
    },
    zoom: {
        in: 'zoomIn',
        out: 'zoomOut',
    },
    slideUp: {
        in: 'slideInUp',
        out: 'slideOutDown',
    },
    slideDown: {
        in: 'slideInDown',
        out: 'slideOutUp',
    },
    slideRight: {
        in: 'slideInRight',
        out: 'slideOutLeft',
    },
    slideLeft: {
        in: 'slideInLeft',
        out: 'slideOutRight',
    },
};

const DEFAULT_ANIMATION = animations.fade;

type Props = {
    modalsQueueLength: number,
    modalsQueue: Array<ModalConfig>,
    dispatch: Function,
};

type State = {
    visibleModals: {
        [string]: number,
    },
};

class Modals extends React.PureComponent<Props, State> {
    state = {
        visibleModals: {},
    };
    componentWillReceiveProps(nextProps: Props) {
        if (this.props.modalsQueueLength !== nextProps.modalsQueueLength) {
            const visibleModals = {};
            nextProps.modalsQueue.forEach((modal) => {
                if (modal.id) {
                    visibleModals[modal.id] = 1;
                }
            });
            this.setState({
                visibleModals,
            });
        }
    }
    getModalStyle = (config: ModalConfig) => {
        const style = config.mode ? styles.modalMode[config.mode] : {};
        return {
            ...styles.modal,
            ...config.style,
            ...style,
        };
    };
    getModalAnimation = (config: ModalConfig): Object => {
        if ((typeof config.animation === 'string') && animations[config.animation]) {
            return animations[config.animation];
        }
        if (typeof config.animation === 'object') {
            return config.animation;
        }
        return DEFAULT_ANIMATION
    };
    closeCurrentModal = id => () => {
        const visibleModals = this.state.visibleModals;
        if (id && visibleModals[id] === 2) {
            visibleModals[id] = 0;
            this.setState({
                visibleModals,
            });
        }
    };
    unlockModal = id => () => {
        const visibleModals = this.state.visibleModals;
        if (id) {
            visibleModals[id] = 2;
            this.setState({
                visibleModals,
            });
        }
    };
    unregisterCurrentModal = () => this.props.dispatch(closeModal());
    renderModalContentWrap = (config: ModalConfig) => {
        if (config.screen) {
            const screenProps = {
                ...config.screen,
                left: { type: 'closeModal' },
            };
            return (
                <Screen {...screenProps}>
                    {config.content}
                </Screen>
            );
        }
        return (
            <View
                style={this.getModalStyle(config)}
            >
                {config.content}
            </View>
        );
    };
    renderModal = (config: ModalConfig, index: number) => {
        const modalConfig = config;
        if (modalConfig.screen) {
            modalConfig.mode = 'screen';
        }
        return (
            <View
                key={index}
                style={styles.modalWrap}
            >
                <Modal
                    style={styles.modalOverlay}
                    backdropOpacity={0.3}
                    animationIn={this.getModalAnimation(modalConfig).in}
                    animationOut={this.getModalAnimation(modalConfig).out}
                    isVisible={!modalConfig.id || !!this.state.visibleModals[modalConfig.id]}
                    onBackButtonPress={this.closeCurrentModal(modalConfig.id)}
                    onBackdropPress={this.closeCurrentModal(modalConfig.id)}
                    onModalHide={this.unregisterCurrentModal}
                    onModalShow={this.unlockModal(modalConfig.id)}
                    supportedOrientations={['portrait', 'landscape']}
                >
                    {this.renderModalContentWrap(modalConfig)}
                </Modal>
            </View>
        );
    };
    render() {
        const { modalsQueue } = this.props;
        return modalsQueue.map(this.renderModal);
    }
}

export default connect(state => ({
    modalsQueueLength: state.Modals.queue.length,
    modalsQueue: state.Modals.queue,
}))(Modals);

const styles = {
    modalOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
    },
    modal: {
        minHeight: 100,
        minWidth: 300,
    },
    modalWrap: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    modalMode: {
        screen: {
            minWidth: '100%',
            minHeight: '100%',
        },
    },
};
