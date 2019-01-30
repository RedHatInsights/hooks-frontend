import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Form from 'react-jsonschema-form';

import {
    Main,
    PageHeader,
    PageHeaderTitle
} from '@red-hat-insights/insights-frontend-components';

const schema = {
    title: 'Edit Notifications',
    type: 'object',
    required: [ 'title' ],
    properties: {
        title: { type: 'string', title: 'Title', default: 'A new task' },
        done: { type: 'boolean', title: 'Done?', default: false }
    }
};

class NotificationEdit extends Component {
    render() {
        return (
            <Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Edit Notification'/>
                </PageHeader>
                <Main>
                    <Form schema={ schema } />
                </Main>
            </Fragment>
        );
    }
}

export default withRouter(NotificationEdit);
