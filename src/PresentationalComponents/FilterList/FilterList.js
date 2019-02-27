import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Checkbox,
    List,
    ListItem
} from '@patternfly/react-core';

export class FilterList extends Component {
    static propTypes = {
        filters: PropTypes.array.isRequired,
        apps: PropTypes.array.isRequired
    };

    eventTypesListItem = (eventType) =>
        <ListItem key={ `event-type-${ eventType.id}` }>
            <Checkbox id={ `event-type-check-${ eventType.id}` }
                label={ eventType.name }
                aria-label={ eventType.name } />
        </ListItem>;

    eventTypesList = (eventTypes) =>
        <List>
            { eventTypes.map((eventType) =>
                this.eventTypesListItem(eventType)
            ) }
        </List>;

    render = () =>
        <List>
            { this.props.apps.map((app) =>
                <ListItem key={ `app-${ app.id }` }>
                    <strong>{ app.name }</strong>
                    { this.eventTypesList(app.event_types) }
                </ListItem>
            ) }
        </List>;
}

export default FilterList;
