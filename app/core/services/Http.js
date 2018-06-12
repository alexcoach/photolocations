// @flow
import axios from 'axios';

const globalDefaultOptions = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export default class Http {

    serviceConfig: Object;
    defaultOptions: Object;

    constructor(config: Object = {}, defaultOptions: Object = {}) {
        this.serviceConfig = config;
        this.defaultOptions = defaultOptions;
    }

    get = (endpoint: string, params: ?Object, options: Object = {}) =>
        this.request(endpoint, 'get', params, null, options.headers, options);
    post = (endpoint: string, params: ?Object, body: ?Object, options: Object = {}) =>
        this.request(endpoint, 'post', params, body, options.headers, options);
    put = (endpoint: string, params: ?Object, body: ?Object, options: Object = {}) =>
        this.request(endpoint, 'put', params, body, options.headers, options);
    patch = (endpoint: string, params: ?Object, body: ?Object, options: Object = {}) =>
        this.request(endpoint, 'patch', params, body, options.headers, options);
    delete = (endpoint: string, params: ?Object, options: Object = {}) =>
        this.request(endpoint, 'delete', params, null, options.headers, options);

    request(
        endpoint: string,
        method: string,
        params: ?Object,
        body: ?Object,
        headers: Object = {},
        options: Object = {}) {

        const { baseURL } = this.serviceConfig;

        const requestOptions = {
            baseURL,
            url: endpoint,
            ...globalDefaultOptions,
            ...this.defaultOptions,
            method,
            params,
            headers: {
                ...globalDefaultOptions.headers,
                ...headers,
            },
            body: body ? JSON.stringify(body) : '',
            ...options,
        };
        return axios(requestOptions).then(response => response.data);
    }
}
