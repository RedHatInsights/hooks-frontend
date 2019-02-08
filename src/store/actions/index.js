export const FETCH_FILTERS = 'FETCH_FILTERS';
export const FETCH_FILTERS_SUCCESS = 'FETCH_FILTERS_SUCCESS';
export const FETCH_FILTERS_FAILURE = 'FETCH_FILTERS_FAILURE';

export const fetchFilters = () => {
    return {
        type: FETCH_FILTERS_SUCCESS,
        payload: {
            filters: [
                [ 'Slack - #insight-slackbot 1', 'Green', '10', 'Active' ],
                [ 'Slack - #insight-slackbot 2', 'Green', '10', 'Active' ],
                [ 'Slack - #insight-slackbot 3', 'Green', '10', 'Active' ]
            ]
        }
    };
};

export const fetchFiltersFailure = error => ({
    type: FETCH_FILTERS_FAILURE,
    payload: { error }
});

export const fetchFiltersSuccess = filters => ({
    type: FETCH_FILTERS_SUCCESS,
    payload: { filters }
});
