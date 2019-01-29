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
    static propTypes = {
        isOpen: PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen
        };
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

    onSelect = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

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
