
import Geolocation from '../Geolocation';

it('Geolocation calculate distance correctly', () => {
    expect(Geolocation.getDistance({ latitude: 0, longitude: 0 }, { latitude: 1, longitude: 0 })).toEqual(111.1895769599889);
});
