import _ from 'lodash';

import {
    FETCH_ENDPOINTS,
    FETCH_ENDPOINT,
    DELETE_ENDPOINT,
    SUBMIT_ENDPOINT,
    NEW_ENDPOINT
} from 'Store/actions/index';
import {
    successMessage,
    failureMessage,
    pendingMessage,
    initialStateFor
} from './reducerHelper';

const normalizeEndpointData = (endpoint) => ({
    ...endpoint.attributes,
    id: parseInt(endpoint.id),
    filtersCount: endpoint.attributes.filter_count
});

const updateEndpointInEndpoints = (state, endpoint) => {
    const normalizedEndpoint = normalizeEndpointData(endpoint);
    const position = _.findIndex(state.endpoints, element => element.id === normalizedEndpoint.id);
    const before = _.slice(state.endpoints, 0, position);
    const after = position !== -1 ? _.slice(state.endpoints, position + 1) : [];
    return {
        ...state,
        endpoint: normalizedEndpoint,
        endpoints: [ ...before, normalizedEndpoint, ...after ]
    };
};

export const endpointsReducer = function(state = initialStateFor('endpoints'), action) {
    switch (action.type) {
        case pendingMessage(FETCH_ENDPOINTS):
            return {
                ...state,
                loading: true,
                error: null
            };

        case successMessage(FETCH_ENDPOINTS):
            return {
                ...state,
                loading: false,
                endpoints: action.payload.data.map(normalizeEndpointData),
                total: action.payload.meta.total
            };

        case failureMessage(FETCH_ENDPOINTS):
            return {
                ...state,
                loading: false,
                error: action.payload.message,
                endpoints: []
            };

        case pendingMessage(FETCH_ENDPOINT):
            return {
                ...state,
                loading: true,
                error: null
            };

        case successMessage(FETCH_ENDPOINT):
            return {
                ...state,
                error: null,
                loading: false,
                endpoint: normalizeEndpointData(action.payload.data)
            };

        case failureMessage(FETCH_ENDPOINT):
            return {
                ...state,
                loading: false,
                error: action.payload.message
            };

        case failureMessage(DELETE_ENDPOINT):
            return {
                ...state,
                error: action.payload.message
            };

        case successMessage(DELETE_ENDPOINT):
            return {
                ...state,
                endpoints: state.endpoints.filter(element => element.id !== action.payload.id)
            };

        case pendingMessage(SUBMIT_ENDPOINT):
            return {
                ...state,
                submitting: true
            };

        case successMessage(SUBMIT_ENDPOINT):
            return {
                ...state,
                ...updateEndpointInEndpoints(state, action.payload.data),
                submitting: false,
                message: 'Endpoint saved'
            };

        case failureMessage(SUBMIT_ENDPOINT):
            return {
                ...state,
                submitting: false,
                endpoint: action.meta.data,
                error: action.payload.message
            };

        case NEW_ENDPOINT:
            return {
                ...state,
                endpoint: null
            };

        default:
            return state;
    }
};
