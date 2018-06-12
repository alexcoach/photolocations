// @flow

import { Http, ENV } from 'core/services';

export default new Http({
    baseURL: ENV.API_SERVER_URL,
})

export const endpoints = {
    locations: '/locations.json',
};