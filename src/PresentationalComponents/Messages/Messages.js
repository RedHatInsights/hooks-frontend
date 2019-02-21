import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Alert } from '@patternfly/react-core';

export class Messages extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                variant: PropTypes.oneOf([ 'success', 'danger', 'warning', 'info' ]),
                title: PropTypes.string.isRequired,
                message: PropTypes.string.isRequired
            }))
    }

    render() {
        return (
            <Fragment>
                { this.props.messages.map((message) => {
                    return <Alert key={ message.id } variant={ message.variant } title={ message.title }>{ message.message }</Alert>;
                }) }
            </Fragment>
        );
    }
};

export default Messages;
