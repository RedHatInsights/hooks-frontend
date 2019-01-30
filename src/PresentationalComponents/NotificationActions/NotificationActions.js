import React from 'react';
import PropTypes from 'prop-types';

import {
    Dropdown,
    KebabToggle,
    DropdownItem
} from '@patternfly/react-core';

const dummyDropdownItems = [
    <DropdownItem key="edit">Edit</DropdownItem>,
    <DropdownItem key="delete">Delete</DropdownItem>
];

class NotificationActions extends React.Component {
    state = {
        isOpen: this.props.isOpen
    }
    static propTypes = {
        isOpen: PropTypes.bool
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

export default NotificationActions;
