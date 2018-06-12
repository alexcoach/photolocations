// @flow
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { View, Text, Button, Icon } from 'native-base';

type Props = {
    lockEditMode?: boolean,
    editModeOnEmptyValue?: boolean,
    cleanAfterSave?: boolean,
    placeholder?: string,
    validate?: Function,
    onChange: Function,
    multiline?: boolean,
    saveIcon?: Object,
    value?: string,
};

type State = {
    editMode: boolean,
    value?: any,
};

export default class EditableText extends React.PureComponent<Props, State> {
    static defaultProps = {
        saveIcon: {
            type:'MaterialIcons',
            name:'check',
        },
    };
    constructor(props: Props) {
        super(props);
        this.state.value = props.value;
        if (props.lockEditMode || (!props.value && props.editModeOnEmptyValue)) {
            this.state.editMode = true;
        }
        if (!props.value && props.editModeOnEmptyValue) {
            setTimeout(() => {
                if (this.input) {
                    this.input.focus();
                }
            });
        }
    }
    state: State = {
        editMode: false,
    };
    setRef = (ref: any) => {
        this.input = ref;
    };
    input: Object;
    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
        setTimeout(() => {
            if (this.input) {
                this.input.focus();
            }
        });
    };
    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        setTimeout(() => {
            if (this.input) {
                this.input.blur();
            }
        });
    };
    resetEditMode = () => {
        const { value } = this.props;
        this.deactivateEditMode();
        this.setState({
            value,
        });
    };
    saveValue = () => {
        const { lockEditMode, onChange, cleanAfterSave } = this.props;
        if (!lockEditMode) {
            this.deactivateEditMode();
        }
        onChange(this.state.value);
        if (cleanAfterSave) {
            this.setState({
                value: '',
            });
        }
        setTimeout(() => {
            if (this.input) {
                this.input.blur();
            }
        });
    };
    validate = () => {
        const { validate } = this.props;
        if (validate) {
            return validate(this.state.value);
        }
        return true;
    };
    renderCancel = () => {
        const { lockEditMode } = this.props;
        if (lockEditMode) {
            return null;
        }
        return (
            <Button dark transparent onPress={this.resetEditMode}>
                <Icon type="MaterialIcons" name="close" />
            </Button>
        );
    };
    renderControl = () => {
        const { saveIcon, lockEditMode } = this.props;
        const { editMode } = this.state;
        if (!lockEditMode && !editMode) {
            return (
                <Button primary transparent onPress={this.activateEditMode}>
                    <Icon type="MaterialIcons" name="edit" />
                </Button>
            );
        }
        return (
            <View style={styles.row}>
                <Button
                    primary transparent
                    onPress={this.saveValue}
                    disabled={!this.validate()}
                >
                    <Icon {...saveIcon} />
                </Button>
                {this.renderCancel()}
            </View>
        );
    };
    renderValue = () => {
        const { editMode, value } = this.state;
        const { placeholder, multiline, lockEditMode } = this.props;
        if (!lockEditMode && !editMode) {
            return (
                <Text style={styles.text}>{value}</Text>
            );
        }
        return (
            <TextInput
                ref={this.setRef}
                placeholder={placeholder}
                onChangeText={(text) => this.setState({ value: text })}
                style={styles.flex}
                editable={editMode}
                multiline={multiline}
                value={value}
            />
        );
    };
    render() {
        return (
            <View style={[styles.row, styles.wrap]}>
                <View style={styles.flex}>
                    {this.renderValue()}
                </View>
                {this.renderControl()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        width: '100%',
        flexDirection: 'row',
    },
    row: {
        flexDirection: 'row',
    },
    flex: {
        flex: 1,
    },
    text: {
        paddingVertical: 8,
    },
});
