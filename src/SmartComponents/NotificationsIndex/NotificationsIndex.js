import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../store/actions';
import {
    Main,
    PageHeader,
    PageHeaderTitle,
    Table,
    TableHeader,
    TableBody,
    TableVariant
} from '@red-hat-insights/insights-frontend-components';
import registryDecorator from '@red-hat-insights/insights-frontend-components/Utilities/Registry';
import { Alert } from '@patternfly/react-core';
import {
    Split,
    SplitItem,
    Toolbar,
    ToolbarGroup,
    ToolbarItem
} from '@patternfly/react-core';

import { Link } from 'react-router-dom';

import './notifications-index.scss';

import NotificationActions from '../../PresentationalComponents/NotificationActions/NotificationActions';

class MyToolbar extends Component {
    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarItem><Link to={ '/new' }>New endpoint</Link></ToolbarItem>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

@registryDecorator()
export class NotificationsIndex extends Component {
    componentDidMount() {
        this.props.fetchEndpoints();
    };

    filtersInRowsAndCells() {
        return this.props.endpoints.map((endpoint) => {
            return { cells: [
                endpoint.name,
                endpoint.url,
                endpoint.active ? 'true' : 'false',
                endpoint.filtersCount,
                <NotificationActions key={ `notification_actions_${endpoint.id}` }
                    endpointId={ endpoint.id }
                    onDelete={ (event) => { event.preventDefault(); this.props.deleteEndpoint(endpoint.id); } } />
            ]};
        });
    };

    render() {
        const tableColumns = [ 'Name', 'URL', 'Active', 'Filters', 'Actions' ];

        if (this.props.loading) {
            return 'Loading endpoints ...';
        }

        let alert = this.props.error ? <Alert variant='danger' title={ this.props.error } /> : '';
        return (
            <Fragment>
                <PageHeader >
                    <Split>
                        <SplitItem isMain>
                            <PageHeaderTitle title='Notifications'/>
                        </SplitItem>
                        <SplitItem><MyToolbar /></SplitItem>
                    </Split>
                </PageHeader>
                <Main>
                    { alert }
                    <Table aria-label='Notifications list'
                        variant={ TableVariant.medium }
                        rows={ this.filtersInRowsAndCells() }
                        header={ tableColumns }>
                        <TableHeader />
                        <TableBody />
                    </Table>
                </Main>
            </Fragment>
        );
    }
}

NotificationsIndex.propTypes = {
    fetchEndpoints: PropTypes.func.isRequired,
    deleteEndpoint: PropTypes.func,
    endpoints: PropTypes.array.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool
};

const mapStateToProps = function(state) {
    return {
        endpoints: state.endpoints.endpoints,
        loading: state.endpoints.loading,
        error: state.endpoints.error
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        fetchEndpoints: actionCreators.fetchEndpoints,
        deleteEndpoint: actionCreators.deleteEndpoint
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIndex);
