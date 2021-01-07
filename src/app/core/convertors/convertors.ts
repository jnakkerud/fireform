import firebase from 'firebase/app';

import { isDate } from '../../dynamic-form/utils';

export type Convertor = (value: any) => any;

export type ConvertorsMap = Map<string, Convertor>;

export const NUMBER_CONVERTOR: Convertor = (value: any) => {
    return Number(value || 0);
};

export const DATE_CONVERTOR: Convertor = (value: any) => {
    if (isDate(value)) {
        return firebase.firestore.Timestamp.fromDate(value);
    }
    return value;
};

// TODO test
export const LOCATION_CONVERTOR: Convertor = (value: any) => {
    const ary = value.split(',');
    return new firebase.firestore.GeoPoint(ary[0], ary[1]);
};
