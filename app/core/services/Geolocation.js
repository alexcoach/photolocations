export default {
    getPosition: () => new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(({ coords }) => resolve(coords), reject);
    }),
    getDistance: (position1, position2, unit = 'K') => {
        const { latitude: lat1, longitude: lon1 } = position1;
        const { latitude: lat2, longitude: lon2 } = position2;
        const radLat1 = (Math.PI * lat1) / 180;
        const radLat2 = (Math.PI * lat2) / 180;
        const theta = lon1 - lon2;
        const radTheta = (Math.PI * theta) / 180;
        let dist = (Math.sin(radLat1) * Math.sin(radLat2)) +
            (Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta));
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === 'K') {
            return dist * 1.609344;
        }
        if (unit === 'N') {
            return dist * 0.8684;
        }
        return dist;
    },
};
