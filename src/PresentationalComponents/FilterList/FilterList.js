import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Checkbox,
    List,
    ListItem
} from '@patternfly/react-core';
import _ from 'lodash';

export class FilterList extends Component {
    static propTypes = {
        apps: PropTypes.object.isRequired,
        selectedAppEventTypes: PropTypes.shape({
            appIds: PropTypes.array,
            eventTypeIds: PropTypes.array,
            levelIds: PropTypes.array
        })
    };

    removeOrAddId = (array: [], id) =>
        array.indexOf(id) !== -1 ? array.filter((currentId) => currentId !== id) : [ ...array, id ]

    eventTypeCheckboxChange = (eventTypeId) =>
        this.props.selectedAppEventTypes.eventTypeIds = this.removeOrAddId(this.props.selectedAppEventTypes.eventTypeIds, eventTypeId)

    appCheckboxChange = (appId) =>
        this.props.selectedAppEventTypes.appIds = this.removeOrAddId(this.props.selectedAppEventTypes.appIds, appId)

    levelCheckboxChange = (levelId) =>
        this.props.selectedAppEventTypes.levelIds = this.removeOrAddId(this.props.selectedAppEventTypes.levelIds, levelId)

    isEventTypeEnabled = (eventTypeId) =>
        _.includes(this.props.selectedAppEventTypes.eventTypeIds, parseInt(eventTypeId))

    isAppEnabled = (appId) =>
        _.includes(this.props.selectedAppEventTypes.appIds, parseInt(appId))

    isLevelEnabled = (levelId) =>
        _.includes(this.props.selectedAppEventTypes.levelIds, parseInt(levelId))

    renderLevel = (level) =>
        level.attributes ?
            <ListItem key={ `level-${ level.id}` }>
                <Checkbox id={ `level-check-${ level.id}` }
                    data-event-type-id={ level.id }
                    label={ level.attributes.title }
                    aria-label={ level.attributes.title }
                    onChange={ () => this.levelCheckboxChange(level.id) }
                    defaultChecked={ this.isLevelEnabled(level.id) } />
            </ListItem> : '';

    renderLevels = (levels) => {
        let levelsArray = _.values(levels);
        return levelsArray.length > 0 ?
            <List>
                { levelsArray.map((level) =>
                    this.renderLevel(level)
                ) }
            </List> : '';
    }

    eventTypesListItem = (eventType) =>
        eventType.attributes ?
            <ListItem key={ `event-type-${ eventType.id}` }>
                <Checkbox id={ `event-type-check-${ eventType.id}` }
                    data-event-type-id={ eventType.id }
                    label={ eventType.attributes.name }
                    aria-label={ eventType.attributes.name }
                    onChange={ () => this.eventTypeCheckboxChange(eventType.id) }
                    defaultChecked={ this.isEventTypeEnabled(eventType.id) } />
                { this.renderLevels(eventType.levels) }
            </ListItem> : '';

    eventTypesList = (eventTypes) => {
        let eventTypesArray = _.values(eventTypes);
        return eventTypesArray.length > 0 ?
            <List>
                { eventTypesArray.map((eventType) =>
                    this.eventTypesListItem(eventType)
                ) }
            </List> : '';
    }

    render() {
        const apps = _.values(this.props.apps);

        return <List>
            { apps.map((app) =>
                <ListItem key={ `app-${ app.id }` }>
                    <Checkbox id={ `app-check-${ app.id}` }
                        data-event-type-id={ app.id }
                        label={ app.attributes.name }
                        aria-label={ app.attributes.name }
                        onChange={ () => this.appCheckboxChange(app.id) }
                        defaultChecked={ this.isAppEnabled(app.id) } />
                    { this.eventTypesList(app.eventTypes, app.id) }
                </ListItem>
            ) }
        </List>;
    }
}

export default FilterList;
