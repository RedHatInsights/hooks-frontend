import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Alert } from '@patternfly/react-core';

class Messages extends React.Component {
    static propTypes = {
        messages: PropTypes.array
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
