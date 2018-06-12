// @flow

import { Model } from 'core/services';

export default class Location extends Model {
    constructor(data: Object) {
        super(data);
        this.id = Math.random().toString();
        this.notes = data.notes || [];
    }
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    notes: Array<string>;
}
