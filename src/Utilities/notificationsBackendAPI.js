export const NOTIFICATIONS_API_ROOT = '/r/insights/platform/notifications';

export const API_HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

export const get = (path, apiProps) => {
    return window.insights.chrome.auth.getUser()
    .then(() => {
        return fetch(NOTIFICATIONS_API_ROOT.concat(path), {
            method: 'get',
            headers: API_HEADERS,
            body: JSON.stringify(apiProps)
        });
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    });
};
