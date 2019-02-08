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

import './notifications-index.scss';

import NotificationActions from '../../PresentationalComponents/NotificationActions/NotificationActions';

@registryDecorator()
class NotificationsIndex extends Component {
    componentDidMount() {
        this.props.fetchFilters();
    };

    filtersInCells() {
        return this.props.filters.map((filter) => {
            return { cells: [ ...filter, <NotificationActions key={ filter[0] } /> ]};
        });
    };

    render() {
        const tableColumns = [ 'Name', 'Status', 'Events', 'Active', 'Actions' ];

        return (
            <Fragment>
                <PageHeader>
                    <PageHeaderTitle title='Notifications'/>
                </PageHeader>
                <Main>
                    <Table aria-label='Notifications list'
                        variant={ TableVariant.medium }
                        rows={ this.filtersInCells() }
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
    fetchFilters: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired
};

const mapStateToProps = function(state) {
    return {
        filters: state.filters.filters
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({
        fetchFilters: actionCreators.fetchFilters
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsIndex);
