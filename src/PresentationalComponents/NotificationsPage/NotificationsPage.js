import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    Main,
    PageHeader,
    PageHeaderTitle
} from '@red-hat-insights/insights-frontend-components';
import {
    Breadcrumb,
    BreadcrumbItem,
    Split,
    SplitItem
} from '@patternfly/react-core';

import PropTypes from 'prop-types';

export class NotificationsPage extends Component {
    toIndex = (event) => {
        event.preventDefault();
        this.props.history.push('/list');
    }

    showRootLink = () =>
        this.props.history && this.props.history.location.pathname !== '/list' ?
            <BreadcrumbItem to='#' onClick={ this.toIndex }>Hooks</BreadcrumbItem>
            : '';

    showBreadcrumb = () =>
        this.props.showBreadcrumb && <Breadcrumb>
            { this.showRootLink() }
            <BreadcrumbItem isActive>
                { this.props.title }
            </BreadcrumbItem>
        </Breadcrumb>

    render() {
        const { rightBar, title, children } = this.props;

        return (
            <Fragment>
                <PageHeader>
                    <Split>
                        <SplitItem isMain>
                            { this.showBreadcrumb() }
                            <PageHeaderTitle title={ title } />
                        </SplitItem>
                        <SplitItem>{ rightBar }</SplitItem>
                    </Split>
                </PageHeader>
                <Main>
                    { children }
                </Main>
            </Fragment>
        );
    }
};

NotificationsPage.defaultProps = {
    showBreadcrumb: true
};

NotificationsPage.propTypes = {
    title: PropTypes.string.isRequired,
    rightBar: PropTypes.node,
    showBreadcrumb: PropTypes.bool,
    children: PropTypes.node,
    history: PropTypes.object
};

export default withRouter(NotificationsPage);
