import {
    FETCH_FILTERS,
    FETCH_ENDPOINTS,
    FETCH_ENDPOINT,
    DELETE_ENDPOINT,
    SUBMIT_ENDPOINT,
    NEW_ENDPOINT,
    successMessage,
    failureMessage,
    pendingMessage
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
                endpoints: action.payload.data.map(normalizeEndpointData)
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
            const endpoint = normalizeEndpointData(action.payload.data);
            return {
                ...state,
                endpoint,
                endpoints: [ ...state.endpoints, endpoint ],
                submitting: false,
                message: 'Endpoint saved'
            };

        case failureMessage(SUBMIT_ENDPOINT):
            return {
                ...state,
                submitting: false,
                error: action.payload.message
            };

        case NEW_ENDPOINT:
            return {
                ...state,
                endpoint: {}
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

        case successMessage(FETCH_FILTERS):
            return {
                ...state,
                loading: false,
                error: null,
                filters: action.payload.filters
            };

        case failureMessage(FETCH_FILTERS):
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
