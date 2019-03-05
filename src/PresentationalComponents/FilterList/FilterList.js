import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Checkbox,
    List,
    ListItem
} from '@patternfly/react-core';

export class FilterList extends Component {
    state = {
        selectedAppEventTypes: {
            appIds: [],
            eventTypeIds: []
        }
    }

    static propTypes = {
        apps: PropTypes.array.isRequired,
        selectedAppEventTypes: PropTypes.object,
        onChange: PropTypes.func
    };

    componentDidMount = () => {
        this.setState({
            selectedAppEventTypes: this.props.selectedAppEventTypes
        });
    }

    eventTypeCheckboxChange = (id, appId) => {
        this.setState({
            selectedAppEventTypes: {
                appIds: this.removeOrAddId(this.state.selectedAppEventTypes.appIds, appId),
                eventTypeIds: this.removeOrAddId(this.state.selectedAppEventTypes.eventTypeIds, id)
            }
        });
    }

    removeOrAddId = (array, id) => {
        if (!array) { array = []; }

        if (array.indexOf(id) !== -1) {
            return array.filter((currentId) => currentId !== id);
        } else {
            return [ ...array, id ];
        }
    }

    isEventTypeEnabled = (eventTypeId) =>
        this.state.selectedAppEventTypes.eventTypeIds.indexOf(eventTypeId) !== -1;

    eventTypesListItem = (eventType, appId) =>
        <ListItem key={ `event-type-${ eventType.id}` }>
            <Checkbox id={ `event-type-check-${ eventType.id}` }
                data-event-type-id={ eventType.id }
                label={ eventType.name }
                aria-label={ eventType.name }
                onChange={ () => this.eventTypeCheckboxChange(eventType.id, appId) }
                isChecked={ this.isEventTypeEnabled(eventType.id) } />
        </ListItem>;

    eventTypesList = (eventTypes, appId) =>
        <List>
            { eventTypes.map((eventType) =>
                this.eventTypesListItem(eventType, appId)
            ) }
        </List>;

    render = () =>
        <List>
            { this.props.apps.map((app) =>
                <ListItem key={ `app-${ app.id }` }>
                    <strong>{ app.name }</strong>
                    { this.eventTypesList(app.event_types, app.id) }
                </ListItem>
            ) }
        </List>;
}

export default FilterList;
