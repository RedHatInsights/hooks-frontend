import React, { Component } from 'react';
import {
    Title,
    Button,
    Bullseye,
    EmptyState,
    EmptyStateIcon,
    EmptyStateBody,
    Pagination,
    ToolbarGroup,
    ToolbarItem
} from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import { CubesIcon } from '@patternfly/react-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from 'Store/actions';
import {
    Skeleton,
    SkeletonSize,
    TableToolbar
} from '@red-hat-insights/insights-frontend-components';
import {
    Table,
    TableBody,
    TableGridBreakpoint,
    TableHeader,
    sortable
} from '@patternfly/react-table';
import registryDecorator from '@red-hat-insights/insights-frontend-components/Utilities/Registry';
import debounce from 'lodash/debounce';

import './notifications-index.scss';

import {
    EndpointToggle,
    LoadingState,
    NotificationActions,
    NotificationsPage,
    StatusIcon,
    StatusPopup
} from 'PresentationalComponents';

@registryDecorator()
export class NotificationsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            perPage: 10,
            rows: [ ],
            sortBy: {
                index: 0,
                direction: 'asc'
            },
            columns: [
                { title: 'Name', key: 'name', transforms: [ sortable ]},
                'Type',
                { title: 'Path', key: 'url', transforms: [ sortable ]},
                'Status',
                { title: 'Active', key: 'active', transforms: [ sortable ]},
                ''
            ]
        };

        this.onSort = this.onSort.bind(this);
    }

    onSort(_event, index, direction) {
        const column = this.state.columns[index].key;
        this.props.fetchEndpoints(this.state.page, this.state.perPage, `${column} ${direction}`).then(() => {
            this.setState({ sortBy: { index, direction }});
            this.filtersInRowsAndCells();
        });
    }

    componentDidMount() {
        this.refreshData();
    }

    changePage = debounce(() => { this.refreshData(); }, 800);

    onPageChange = (_event, page, shouldDebounce) => {
        this.setState({ page });
        if (shouldDebounce) {
            this.changePage();
        } else {
            this.refreshData(page);
        }
    }

    onPageInput = (event, page) =>
        this.onPageChange(event, page, true)

    onSetPage = (event, page) =>
        event.target.className === 'pf-c-form-control' || this.onPageChange(event, page, false)

    refreshData = (page = this.state.page, perPage = this.state.perPage, { direction, index } = this.state.sortBy) => {
        const column = this.state.columns[index].key;
        this.props.fetchEndpoints(page, perPage, `${column} ${direction}`).then(() =>
            this.filtersInRowsAndCells()
        );
    }

    getNextEndpoint = () => {
        const { direction, index } = this.state.sortBy;
        const column = this.state.columns[index].key;
        return this.props.fetchEndpoints(this.state.perPage * this.state.page, 1, `${column} ${direction}`, true);
    }

    onPerPageSelect = (_event, perPage) => {
        let page = this.state.page;
        const total = this.props.total;
        // If current page and perPage would request data beyond total, show last available page
        if (page * perPage > total) {
            page = Math.floor(total / perPage) + 1;
        }

        this.setState({ page, perPage });
        this.refreshData(page, perPage);
    }

    filtersInRowsAndCells = () => {
        const endpoints = Object.values(this.props.endpoints);

        let rows = [];
        if (endpoints.length > 0) {
            rows = endpoints.map(({ id, lastDeliveryStatus, lastDeliveryTime, firstFailureTime, attributes: { active, name, url }}) => (
                [
                    { title: name },
                    { title: 'HTTP' },
                    { title: url },
                    { title: <StatusPopup
                        lastAttempt={ lastDeliveryTime }
                        lastFailure={ firstFailureTime }
                        status={ lastDeliveryStatus || 'unknown' } >
                        <StatusIcon key={ `notification_status_${id}` }
                            status={ lastDeliveryStatus || 'unknown' } />
                    </StatusPopup>
                    },
                    { title: <EndpointToggle key={ `notification_switch_${id}` }
                        id={ parseInt(id) }
                        active={ active }
                        onChange={ (checked) => {
                            this.props.toggleEndpoint(id, checked).then(() => this.filtersInRowsAndCells());
                        } } /> },
                    { title: <NotificationActions key={ `notification_actions_${id}` }
                        endpointId={ parseInt(id) }
                        onDelete={ this.onDelete(id, name) }
                        onTest={ this.onTest(id) } /> }
                ]));
        }

        this.setState({ rows });
    }

    onDelete = (id, name) =>
        event => {
            event.preventDefault();
            this.props.deleteEndpoint(id, name).then(() => {
                this.filtersInRowsAndCells();
                return this.getNextEndpoint();
            }).then(() => {
                this.filtersInRowsAndCells();
            });
        }

    onTest = (id) =>
        event => {
            event.preventDefault();
            const next = () => this.filtersInRowsAndCells();
            this.props.testEndpoint(id).then(next, next);
        }

    noResults = () =>
        <Bullseye>
            <EmptyState>
                <p>
                    <EmptyStateIcon icon={ CubesIcon } />
                </p>
                <Title size="lg">No hooks found</Title>
                <EmptyStateBody>
                    There are no hooks configured yet.
                </EmptyStateBody>
                <Button variant="primary" to={ '/new' } component={ Link } onClick={ this.props.newEndpoint }>New hook</Button>
            </EmptyState>
        </Bullseye>

    resultsTable = () => {
        const { perPage, page, rows, columns, sortBy } = this.state;
        const pagination = <Pagination
            itemCount={ this.props.total }
            widgetId="pagination-options-menu-bottom"
            perPage={ perPage }
            page={ page }
            onSetPage={ this.onSetPage }
            onPageInput={ this.onPageInput }
            onPerPageSelect={ this.onPerPageSelect } />;

        return <React.Fragment>
            <TableToolbar>
                <ToolbarGroup>
                    <ToolbarItem>
                        <Button component={ Link } to={ '/new' } onClick={ this.props.newEndpoint }>New hook</Button>
                    </ToolbarItem>
                </ToolbarGroup>
            </TableToolbar>
            <Table aria-label='Hooks list'
                rows={ rows }
                cells={ columns }
                sortBy={ sortBy }
                onSort={ this.onSort }
                gridBreakPoint={ TableGridBreakpoint.gridMd } >
                <TableHeader />
                <TableBody />
                <tfoot><tr><td colSpan='6'>
                    { pagination }
                </td></tr></tfoot>
            </Table>
        </React.Fragment>;
    }

    render() {
        const placeholder = <Skeleton size={ SkeletonSize.lg } />;
        const { loading, total } = this.props;

        return (
            <NotificationsPage
                title='Hooks'
                showBreadcrumb={ false }>
                <LoadingState
                    loading={ loading }
                    placeholder={ placeholder } >
                    { total > 0 ? this.resultsTable() : this.noResults() }
                </LoadingState>
            </NotificationsPage>
        );
    }
}

NotificationsIndex.propTypes = {
    fetchEndpoints: PropTypes.func.isRequired,
    deleteEndpoint: PropTypes.func.isRequired,
    newEndpoint: PropTypes.func.isRequired,
    toggleEndpoint: PropTypes.func.isRequired,
    testEndpoint: PropTypes.func.isRequired,
    endpoints: PropTypes.object.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
    total: PropTypes.number
};

const mapStateToProps = ({ endpoints: { endpoints, loading, error, total }}) => ({
    endpoints,
    loading,
    error,
    total
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        fetchEndpoints: actionCreators.fetchEndpoints,
        deleteEndpoint: actionCreators.deleteEndpoint,
        newEndpoint: actionCreators.newEndpoint,
        toggleEndpoint: actionCreators.toggleEndpoint,
        testEndpoint: actionCreators.testEndpoint
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIndex);
