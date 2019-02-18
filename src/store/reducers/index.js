import {
    FETCH_FILTERS,
    FETCH_FILTERS_SUCCESS,
    FETCH_FILTERS_FAILURE,
    FETCH_ENDPOINTS_SUCCESS,
    FETCH_ENDPOINTS_FAILURE,
    FETCH_ENDPOINTS_PENDING,
    FETCH_ENDPOINT_SUCCESS,
    FETCH_ENDPOINT_FAILURE,
    FETCH_ENDPOINT_PENDING,
    SUBMIT_ENDPOINT,
    successMessage,
    pendingMessage,
    failureMessage
} from '../actions/index';

const defaultIntialState = {
    loading: false,
    error: null
};

const initialStateFor = function (reducerName) {
    let initState = Object.assign({}, defaultIntialState);
    initState[reducerName] = [];
    return initState;
};

const normalizeEndpointData = (endpoint) => ({
    ...endpoint.attributes,
    id: parseInt(endpoint.id),
    filtersCount: endpoint.attributes.filter_count
});

export const endpointReducer = function(state = initialStateFor('endpoints'), action) {
    switch (action.type) {
        case FETCH_ENDPOINTS_PENDING:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_ENDPOINTS_SUCCESS:
            return {
                ...state,
                loading: false,
                endpoints: action.payload.data.map(normalizeEndpointData)
            };

        case FETCH_ENDPOINTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.message,
                endpoints: []
            };

        case FETCH_ENDPOINT_PENDING:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_ENDPOINT_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                endpoint: normalizeEndpointData(action.payload.data)
            };

        case FETCH_ENDPOINT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.message
            };

        case successMessage(SUBMIT_ENDPOINT):
            return {
                ...state
            };

        case pendingMessage(SUBMIT_ENDPOINT):
            return {
                ...state
            };

        case failureMessage(SUBMIT_ENDPOINT):
            return {
                ...state
            };

        default:
            return state;
    }
};

export const filterReducer = function(state = initialStateFor('filters'), action) {
    switch (action.type) {
        case FETCH_FILTERS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_FILTERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                filters: action.payload.filters
            };

        case FETCH_FILTERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                filters: []
            };

        default:
            return state;
    }
};
