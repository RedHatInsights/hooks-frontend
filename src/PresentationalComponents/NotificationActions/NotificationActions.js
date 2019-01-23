import React from 'react';
import {
    Dropdown,
    KebabToggle,
    DropdownItem
} from '@patternfly/react-core';

const NotificationActions = () => {
    let isOpen = false;
    const dummyDropdownItems = [
        <DropdownItem key="edit">Edit</DropdownItem>,
        <DropdownItem key="delete">Delete</DropdownItem>
    ];
    const toggle = function () {
        console.log(isOpen);
        if (isOpen === false) {
            isOpen = true;
        } else {
            isOpen = false;
        }
    };

    return (
        <Dropdown
            toggle={ <KebabToggle onToggle={ toggle }/> }
            isPlain
            isOpen={ isOpen }
            dropdownItems={ dummyDropdownItems } />
    );
};

NotificationActions.displayName = 'NotificationActions';
export default NotificationActions;
