import {
    FETCH_FILTER
} from 'Store/actions/index';
import {
    successMessage,
    failureMessage,
    initialStateFor,
    normalizeData
} from './reducerHelper';

export const normalizeFilterData = (payload) =>
    normalizeData(payload, 'filter')[payload.data.id];

export const filterReducer = function(state = initialStateFor('filter', {}), action) {
    switch (action.type) {
        case FETCH_FILTER:
            return {
                ...state,
                loading: true,
                error: null
            };

        case successMessage(FETCH_FILTER):
            return {
                ...state,
                loading: false,
                error: null,
                filter: normalizeFilterData(action.payload)
            };

        case failureMessage(FETCH_FILTER):
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                filter: {}
            };

        default:
            return state;
    }
};
