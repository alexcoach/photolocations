// @flow
export const LOCATION_DETAILS_SET = 'LOCATION_DETAILS_SET';
export const LOCATION_DETAILS_SAVE = 'LOCATION_DETAILS_SAVE';
export const LOCATION_DETAILS_CLEAR = 'LOCATION_DETAILS_CLEAR';

import Location from 'app/data/models/Location';

export const setLocationDetails = (location: Location) => {
    return {
        type: LOCATION_DETAILS_SET,
        location,
    };
};

export const saveLocationDetails = (location: Location) => ({
    type: LOCATION_DETAILS_SAVE,
    location,
});
