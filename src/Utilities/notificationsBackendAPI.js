export const NOTIFICATIONS_API_ROOT = '/api/hooks';

export const API_HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

class BackendAPIClient {
    static request(path, apiProps, method) {
        return this.authenticate()
        .then(() => this.fetch(path, apiProps, method))
        .then(this.checkForErrors)
        .then(this.checkForEmptyResponse)
        .then((response) => response.json());
    }

    static fetch(path, apiProps, method) {
        return fetch(NOTIFICATIONS_API_ROOT.concat(path), {
            method: method || 'get',
            headers: API_HEADERS,
            body: JSON.stringify(apiProps)
        });
    }

    static checkForEmptyResponse(response) {
        return response.status === 204 ? { json: () => ({}) } : response;
    }

    static checkForErrors(response) {
        if (response.status >= 400 && response.status <= 600) {
            return response.clone()
            .json()
            .then((json) => Promise.reject(response.status !== 422 ? json.errors[0] : json));
        }

        return response;
    }

    static authenticate() {
        return window.insights.chrome.auth.getUser();
    }

    static create(path, apiProps) {
        return this.request(path, apiProps, 'post');
    }

    static update(path, apiProps) {
        return this.request(path, apiProps, 'put');
    }

    static get(path) {
        return this.request(path);
    }

    static destroy(path) {
        return this.request(path, null, 'delete');
    }
}

export default BackendAPIClient;
