import React from 'react';
import {
    Toolbar,
    ToolbarGroup,
    ToolbarItem,
    Button
} from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const IndexToolbar = ({ onClick }) => {
    return <Toolbar className="pf-l-toolbar" style={ { textAlign: 'right' } }>
        <ToolbarGroup>
            <ToolbarItem>
                <Button component={ Link } to={ '/new' } onClick={ onClick }>New hook</Button>
            </ToolbarItem>
        </ToolbarGroup>
    </Toolbar>;
};

IndexToolbar.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default IndexToolbar;
