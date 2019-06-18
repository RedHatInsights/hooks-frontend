import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes } from './Routes';
import { NotificationsPortal } from '@redhat-cloud-services/frontend-components-notifications';
import '@redhat-cloud-services/frontend-components-notifications/index.css';
import './App.scss';

class App extends Component {

    componentDidMount() {
        insights.chrome.init();
        insights.chrome.identifyApp('hooks');
        insights.chrome.navigation(buildNavigation());

        this.buildNav = this.props.history.listen(() => insights.chrome.navigation(buildNavigation()));
    }

    componentWillUnmount () {
        this.appNav();
        this.buildNav();
    }

    render () {
        return (
            <Fragment>
                <NotificationsPortal />
                <Routes childProps={ this.props } />
            </Fragment>
        );
    }
}

App.propTypes = {
    history: PropTypes.object
};

/**
 * withRouter: https://reacttraining.com/react-router/web/api/withRouter
 * connect: https://github.com/reactjs/react-redux/blob/master/docs/api.md
 *          https://reactjs.org/docs/higher-order-components.html
 */
export default withRouter (connect()(App));

function buildNavigation () {
    const currentPath = window.location.pathname.split('/').slice(-1)[0];
    return [{
        title: 'Hooks',
        id: 'hooks'
    }].map(item => ({
        ...item,
        active: item.id === currentPath
    }));
}
