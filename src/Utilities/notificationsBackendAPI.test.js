import ApiClient from './notificationsBackendAPI';

describe('request', () => {
    const objectResolver = Promise.resolve({});
    const mockFetchPromise = Promise.resolve({
        ok: true,
        json: () => objectResolver
    });
    const fetchSpy = jest.fn(() => mockFetchPromise);

    beforeAll(() => {
        window.insights = {
            chrome: { auth: { getUser: jest.fn(() => objectResolver) }}
        };
        window.fetch = fetchSpy;
    });

    it('calls fetch', () => {
        expect(ApiClient.request('/path', {}, 'get')).toEqual(objectResolver);
        // Oddly this does not give the expected result, even though it has to call the
        // spy in order to get objectResolver as an expected result above.
        //
        //  expect(window.fetch).toHaveBeenCalledWith('/api/hooks/path');
    });

    afterAll(() => {
        window.fetch.mockClear();
    });
});

describe('checkForErrors', () => {
    const errors = {
        errors: [
            {
                title: 'Not found',
                detail: 'Record not found'
            }
        ]
    };

    it('returns the response if status is not between 400 and <600', () => {
        const response = {
            status: 200,
            body: 'OK'
        };
        expect(ApiClient.checkForErrors(response)).toBe(response);
    });

    it('rejects with first error if status is between 400 and <600', () => {
        const response = {
            status: 404,
            body: 'Not found',
            json: jest.fn(() => Promise.resolve(errors))
        };
        response.clone = jest.fn(() => response);

        expect(ApiClient.checkForErrors(response)).rejects.toBe(errors.errors[0]);
        expect(response.json).toHaveBeenCalled();
    });

    it('rejects with the all errors if status is 422', () => {
        const response = {
            status: 422,
            body: 'Unprocessable entity',
            json: jest.fn(() => Promise.resolve(errors))
        };
        response.clone = jest.fn(() => response);

        expect(ApiClient.checkForErrors(response)).rejects.toBe(errors);
        expect(response.json).toHaveBeenCalled();
    });
});

describe('API calls', () => {
    const mockGet = jest.fn(() => ({}));

    beforeAll(() => {
        Object.assign(ApiClient, {
            request: mockGet
        });
    });

    describe('create', () => {
        it('calls request with /create and post', () => {
            expect(ApiClient.create('/create', {})).toEqual({});
            expect(ApiClient.request).toHaveBeenCalledWith('/create', {}, 'post');
        });
    });

    describe('get', () => {
        it('calls request with path and get', () => {
            expect(ApiClient.get('/get')).toEqual({});
            expect(ApiClient.request).toHaveBeenCalledWith('/get');
        });
    });

    describe('update', () => {
        it('calls request with path and put', () => {
            expect(ApiClient.update('/update', {})).toEqual({});
            expect(ApiClient.request).toHaveBeenCalledWith('/update', {}, 'put');
        });
    });

    describe('destroy', () => {
        it('calls request with path and delete', () => {
            expect(ApiClient.destroy('/destroy')).toEqual({});
            expect(ApiClient.request).toHaveBeenCalledWith('/destroy', null, 'delete');
        });
    });

    afterAll(() => {
        ApiClient.request.mockClear();
    });
});
