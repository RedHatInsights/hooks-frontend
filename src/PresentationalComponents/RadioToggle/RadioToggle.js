import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    CardHeader,
    Checkbox,
    List,
    ListItem,
    Card,
    CardBody,
    Radio,
    Stack,
    StackItem,
    Switch
} from '@patternfly/react-core';
import _ from 'lodash';

export const ALL = 'all';
export const SELECTED = 'selected-only';

export class RadioToggle extends React.Component {
    handleChange = (_, event) => {
        const { value } = event.currentTarget;
        this.setState({ value });
    }

    constructor(props) {
        super(props);
        this.state = { value: props.initial }
    }

    render() {
        const { children, scope } = this.props;
        const group = `${ scope }-event-type-radio;`
        return (
            <React.Fragment>
                <Radio value={ ALL }
                       defaultChecked={ this.state.value === ALL }
                       onChange={this.handleChange}
                       label="All event types"
                       id={ `${ scope }-radio-all` }
                       name={ group } />
                <Radio value={ SELECTED }
                       defaultChecked={ this.state.value === SELECTED }
                       onChange={this.handleChange}
                       label="Only selected event types"
                       id={ `${ scope }-radio-selected` }
                       name={ group } />
                { this.state.value === SELECTED && children }
            </React.Fragment>
        );
}
}

export default RadioToggle;
