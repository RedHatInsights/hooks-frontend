import { get } from '../../Utilities/notificationsBackendAPI';

export const FETCH_FILTERS = 'FETCH_FILTERS';
export const FETCH_FILTERS_SUCCESS = 'FETCH_FILTERS_SUCCESS';
export const FETCH_FILTERS_FAILURE = 'FETCH_FILTERS_FAILURE';
export const FETCH_ENDPOINTS = 'FETCH_ENDPOINTS';
export const FETCH_ENDPOINTS_PENDING = FETCH_ENDPOINTS + '_PENDING';
export const FETCH_ENDPOINTS_SUCCESS = FETCH_ENDPOINTS + '_FULFILLED';
export const FETCH_ENDPOINTS_FAILURE = FETCH_ENDPOINTS + '_REJECTED';
export const FETCH_ENDPOINT = 'FETCH_ENDPOINT';
export const FETCH_ENDPOINT_PENDING = FETCH_ENDPOINT + '_PENDING';
export const FETCH_ENDPOINT_SUCCESS = FETCH_ENDPOINT + '_FULFILLED';
export const FETCH_ENDPOINT_FAILURE = FETCH_ENDPOINT + '_REJECTED';

export const fetchFiltersFailure = error => ({
    type: FETCH_FILTERS_FAILURE,
    payload: { error }
});

export const fetchEndpointsFailure = error => ({
    type: FETCH_ENDPOINTS_FAILURE,
    payload: { error }
});

export const fetchFiltersSuccess = filters => ({
    type: FETCH_FILTERS_SUCCESS,
    payload: { filters }
});

export const fetchEndpointsSuccess = endpoints => ({
    type: FETCH_ENDPOINTS_SUCCESS,
    payload: { endpoints }
});

export const fetchEndpointSuccess = endpoint => ({
    type: FETCH_ENDPOINT_SUCCESS,
    payload: { endpoint }
});

export const fetchEndpoints = () => ({
    type: FETCH_ENDPOINTS,
    payload: get('/endpoints')
});

export const fetchEndpoint = (id) => ({
    type: FETCH_ENDPOINT,
    payload: get(`/endpoints/${ id }`)
});

export const fetchFilters = () => {
    return fetchFiltersSuccess([
        {
            id: 1,
            eventType: 'System down',
            severity: 'High'
        },
        {
            id: 2,
            eventType: 'System up',
            severity: 'Normal'
        },
        {
            id: 3,
            eventType: 'System error',
            severity: 'High'
        }
    ]);
};
