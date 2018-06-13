// @flow

import ApiServer, { endpoints } from '../services/ApiServer';
import Location from '../models/Location';

export default {
    getLocations: () => ApiServer.get(endpoints.locations)
        .then(data => {
            if (!data || !Array.isArray(data.locations)) {
                throw new Error('Unexpected response data structure');
            }
            return data.locations.map(item => new Location({
                name: item.name,
                latitude: item.lat,
                longitude: item.lng,
            }));
        }),

}
