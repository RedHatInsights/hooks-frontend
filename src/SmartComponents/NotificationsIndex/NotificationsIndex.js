import React, { Component, Fragment } from 'react';
import NotificationActions from '../../PresentationalComponents/NotificationActions/NotificationActions';
import './notifications-index.scss';

import {
    Main,
    PageHeader,
    PageHeaderTitle,
    Table,
    TableHeader,
    TableBody,
    TableVariant
} from '@red-hat-insights/insights-frontend-components';

class NotificationsIndex extends Component {
    render() {
        const tableColumns = [ 'Name', 'Status', 'Events', 'Active', 'Actions' ];
        const tableRows = [
            { cells: [ 'Slack - #insight-slackbot', 'Green', '10', 'Active', <NotificationActions key="sds"/> ]},
            { cells: [ 'Slack - #insight-slackbot', 'Green', '10', 'Active', <NotificationActions key="sds1"/> ]},
            { cells: [ 'Slack - #insight-slackbot', 'Green', '10', 'Active', <NotificationActions key="sd2"/> ]}
        ];
        const tableActions = [
            {
                title: 'Some action',
                onClick: (event, rowId) => console.log('clicked on Some action, on row: ', rowId)
            }
        ];

        return (
            <Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Notifications'/>
                </PageHeader>
                <Main>
                    <Table aria-label='Notifications list'
                        variant={ TableVariant.medium }
                        rows={ tableRows }
                        header={ tableColumns }
                        actions={ tableActions }>
                        <TableHeader />
                        <TableBody />
                    </Table>
                </Main>
            </Fragment>
        );
    }
}

export default NotificationsIndex;
