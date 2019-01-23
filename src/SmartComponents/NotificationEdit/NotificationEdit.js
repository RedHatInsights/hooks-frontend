import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import FormRender from '@data-driven-forms/react-form-renderer';
import { componentTypes } from '@data-driven-forms/react-form-renderer';

import {
    Main,
    PageHeader,
    PageHeaderTitle
} from '@red-hat-insights/insights-frontend-components';

const schema = {
    title: 'My form title',
    description: 'My form description',
    fields: [{
        component: componentTypes.TEXT_FIELD,
        name: 'first-name',
        label: 'First name'
    }, {
        component: componentTypes.TEXT_FIELD,
        type: 'password',
        name: 'password',
        label: 'password'
    }]
};

class NotificationEdit extends Component {
    render() {
        return (
            <Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Edit Notification'/>
                </PageHeader>
                <Main>
                    <FormRender
                        schema={ schema }
                    />
                </Main>
            </Fragment>
        );
    }
}

export default withRouter(NotificationEdit);
