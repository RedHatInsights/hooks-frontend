import {
    FETCH_FILTERS,
    FETCH_FILTERS_SUCCESS,
    FETCH_FILTERS_FAILURE
} from '../actions/index';

const initialState = {
    filters: [],
    loading: false,
    error: null
};

export const filterReducer = function(state = initialState, action) {
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
