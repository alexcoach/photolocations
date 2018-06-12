// @flow

import LocationsOverviewScreen from 'app/modules/locations/screens/LocationsOverview';
import LocationDetailsModalScreen from 'app/modules/locations/screens/LocationDetailsModal';

export default [
    { path: '/', exact: true, component: LocationsOverviewScreen },
    { path: '/locationDetails', component: LocationDetailsModalScreen },
];
