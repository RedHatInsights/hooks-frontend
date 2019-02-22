import ReducerRegistry from '@red-hat-insights/insights-frontend-components/Utilities/ReducerRegistry';
import promiseMiddleware from 'redux-promise-middleware';
import { filterReducer, endpointReducer } from './reducers';
import { notifications, notificationsMiddleware } from '@red-hat-insights/insights-frontend-components/components/Notifications';

let registry;

export function init (...middleware) {
    if (registry) {
        throw new Error('store already initialized');
    }

    registry = new ReducerRegistry({}, [
        promiseMiddleware(),
        notificationsMiddleware(),
        ...middleware
    ]);

    registry.register({
        filters: filterReducer,
        endpoints: endpointReducer,
        notifications
    });

    return registry;
}

export function getStore () {
    return registry.getStore();
}

export function register (...args) {
    return registry.register(...args);
}
