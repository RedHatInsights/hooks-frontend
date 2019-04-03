import React, { Component } from 'react';
import {
    Title,
    Button,
    Bullseye,
    EmptyState,
    EmptyStateIcon,
    EmptyStateBody
} from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import { CubesIcon } from '@patternfly/react-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from 'Store/actions';
import {
    Pagination,
    Skeleton,
    SkeletonSize
} from '@red-hat-insights/insights-frontend-components';
import {
    Table,
    TableHeader,
    TableBody,
    sortable,
    SortByDirection
} from '@patternfly/react-table';
import registryDecorator from '@red-hat-insights/insights-frontend-components/Utilities/Registry';
import debounce from 'lodash/debounce';

import './notifications-index.scss';

import {
    EndpointToggle,
    IndexToolbar,
    LoadingState,
    NotificationActions,
    NotificationsPage,
    StatusIcon
} from 'PresentationalComponents';

@registryDecorator()
export class NotificationsIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            perPage: 10,
            rows: [ ],
            sortBy: { },
            columns: [
                { title: 'Name', key: 'name', transforms: [ ]},
                'Type',
                'Path',
                'Status',
                'Active',
                ''
            ]
        };

        this.onSort = this.onSort.bind(this);
    }

    componentDidMount() {
        this.refreshData();
    }

    changePage = debounce(() => { this.refreshData(false); }, 800);

    onSetPage = (page, shouldDebounce) => {
        this.setState({ page });
        if (shouldDebounce) {
            this.changePage();
        } else {
            this.refreshData(page);
        }
    }

    refreshData = (page = this.state.page, perPage = this.state.perPage) => {
        this.props.fetchEndpoints(page, perPage).then(() =>
            this.filtersInRowsAndCells()
        );
    }

    onPerPageSelect = (perPage) => {
        this.setState({ perPage });
        this.refreshData(null, perPage);
    }

    filtersInRowsAndCells = () => {
        const endpoints =  Object.values(this.props.endpoints);

        if (endpoints.length === 0) {
            return null;
        }

        const rows = endpoints.map(({ id, attributes: { active, name, url }}) => ({
            cells: [
                { title: name },
                { title: 'HTTP' },
                { title: url },
                { title: <StatusIcon key={ `notification_status_${id}` } status={ true } /> },
                { title: <EndpointToggle key={ `notification_switch_${id}` }
                    id={ parseInt(id) }
                    active={ active }
                    onChange={ (checked) => {
                        this.props.toggleEndpoint(id, checked).then(() => this.filtersInRowsAndCells());
                    } } /> },
                { title: <NotificationActions key={ `notification_actions_${id}` }
                    endpointId={ parseInt(id) }
                    onDelete={ this.onDelete(id, name) } /> }
            ]}));
        this.setState({ rows });
    }

    onDelete = (id, name) =>
        event => {
            event.preventDefault();
            this.props.deleteEndpoint(id, name).then(() => this.filtersInRowsAndCells());
        }

    onSort(_event, index, direction) {
        if (this.state.rows.length === 0) {
            return;
        }

        const sortedRows = this.state.rows.sort((a, b) => (a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0));
        this.setState({
            sortBy: {
                index,
                direction
            },
            rows: direction === SortByDirection.asc ? sortedRows : sortedRows.reverse()
        });
    }

    noResults = () =>
        <Bullseye>
            <EmptyState>
                <p>
                    <EmptyStateIcon icon={ CubesIcon } />
                </p>
                <Title size="lg">No Endpoins found</Title>
                <EmptyStateBody>
                    There are no endpoints configured yet.
                </EmptyStateBody>
                <Button variant="primary" to={ '/new' } component={ Link } onClick={ this.props.newEndpoint }>New endpoint</Button>
            </EmptyState>
        </Bullseye>

    resultsTable = () => {
        const { perPage, page, rows, columns, sortBy } = this.state;
        const total = this.props.total ? this.props.total : 0;

        return <div>
            <Table aria-label='Notifications list'
                rows={ rows }
                cells={ columns }
                sortBy={ sortBy }
                onSort={ this.onSort }>
                <TableHeader />
                <TableBody />
            </Table>
            <Pagination
                numberOfItems={ total }
                itemsPerPage={ perPage }
                page={ page }
                onSetPage={ this.onSetPage }
                onPerPageSelect={ this.onPerPageSelect }
                useNext={ true } />
        </div>;
    }

    render() {
        const placeholder = <Skeleton size={ SkeletonSize.lg } />;

        return (
            <NotificationsPage
                title='Notifications'
                rightBar={ <IndexToolbar onClick={ this.props.newEndpoint }/> }>
                <LoadingState
                    loading={ this.props.loading }
                    placeholder={ placeholder } >
                    { this.state.rows.length > 0 ? this.resultsTable() : this.noResults() }
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
        toggleEndpoint: actionCreators.toggleEndpoint
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIndex);
