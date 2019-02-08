import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import {
    Dropdown,
    KebabToggle,
    DropdownItem
} from '@patternfly/react-core';

const dummyDropdownItems = [
    <DropdownItem key="edit" to="/edit/1">
        Edit
    </DropdownItem>,
    <DropdownItem key="delete" to="/destroy/1">
        Delete
    </DropdownItem>
];

class NotificationActions extends React.Component {
    state = {
        isOpen: this.props.isOpen
    }
    static propTypes = {
        isOpen: PropTypes.bool,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.setState({
            isOpen: false
        });
    }

    onToggle = isOpen => {
        this.setState({
            isOpen
        });
    }

    render() {
        const { isOpen } = this.state;
        return (
            <Dropdown
                toggle={ <KebabToggle onToggle={ this.onToggle }/> }
                isPlain
                onSelect={ this.onSelect }
                isOpen={ isOpen }
                dropdownItems={ dummyDropdownItems } />
        );
    }
};

export default withRouter(NotificationActions);
