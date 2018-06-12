// @flow

import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import {
    View, Text, List, Label, Content,
} from 'native-base';

import theme from 'app/theme';

import { SectionTitle, EditableText } from 'core/components';
import { saveLocationDetails } from '../actions/LocationDetails';

type Props = {
    location: Object,
    dispatch: Function,
};

class LocationDetails extends React.PureComponent<Props> {
    updateLocation = (location) => {
        this.props.dispatch(saveLocationDetails(location));
    };
    updateLocationProperty = property => newValue => {
        const { location } = this.props;
        this.updateLocation({
            ...location,
            [property]: newValue,
        });
    };
    addNote = (newNote) => {
        const { location } = this.props;
        const notes = [...location.notes];
        notes.push({ text: newNote, time: new Date() });
        this.updateLocation({
            ...location,
            notes,
        });
    };
    renderNote = (note) => {
        const dateTime = new Date(note.time);
        return (
            <View style={styles.noteWrap}>
                <Text note style={styles.helpText}>
                    {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
                </Text>
                <View style={{ width: '100%' }}/>
                <Text style={styles.noteText}>{note.text}</Text>
            </View>
        );
    };
    renderNotesList = () => {
        const { location } = this.props;
        if (!location.notes.length) {
            return (
                <View style={styles.noItems}>
                    <Text>No Notes Yet</Text>
                </View>
            );
        }
        let notes = [...location.notes];
        notes.sort((a, b) => ((a.time > b.time) ? -1 : 1));
        return (
            <List
                dataArray={notes}
                renderRow={this.renderNote}
            />
        );
    };
    renderDetailsForm = () => {
        const { location } = this.props;
        return (
            <View>
                <View style={styles.wrap}>
                    <Label>Name</Label>
                    <EditableText
                        placeholder="Enter Location Name"
                        editModeOnEmptyValue
                        value={location.name}
                        validate={value => !!value}
                        onChange={this.updateLocationProperty('name')}
                    />
                </View>
                <View style={styles.wrap}>
                    <Label>Description</Label>
                    <EditableText
                        placeholder="Enter Location Description"
                        value={location.description}
                        validate={value => !!value}
                        multiline
                        onChange={this.updateLocationProperty('description')}
                    />
                </View>
            </View>
        );
    };
    renderNoteForm = () => (
        <View style={[styles.wrap, styles.row]}>
            <EditableText
                lockEditMode
                cleanAfterSave
                multiline
                value={''}
                validate={value => !!value}
                saveIcon={{ type:'MaterialIcons', name:'send' }}
                placeholder="Enter New Note"
                onChange={this.addNote}
            />
        </View>
    );
    render() {
        return (
            <Content>
                <SectionTitle
                    icon={{ type:'Entypo', name: 'location-pin' }}
                    text="Location Details"
                />
                {this.renderDetailsForm()}
                <SectionTitle
                    style={styles.notesTitle}
                    icon={{ type:'MaterialCommunityIcons', name: 'message-text' }}
                    text="Location Notes"
                />
                {this.renderNoteForm()}
                <View style={styles.notesWrap}>
                    {this.renderNotesList()}
                </View>
            </Content>
        );
    }
}

export default connect(state => ({
    location: state.LocationDetails.location,
}))(LocationDetails);

const styles = StyleSheet.create({
    noItems: {
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
    },
    wrap: {
        paddingTop: 5,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 5,
    },
    noteInput: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    notesTitle: {
        marginTop: 15,
    },
    helpText: {
        fontSize: 12,
        color: theme.listNoteColor,
    },
    noteWrap: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.muted,
    },
    noteText: {
        fontSize: 14,
    },
    notesWrap: {
        borderTopWidth: 1,
        borderTopColor: theme.muted,
    },
});
