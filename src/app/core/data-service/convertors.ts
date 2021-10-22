import firebase from 'firebase/compat/app';

export type Convertor = (value: any) => any;

export type ConvertorsMap = Map<string, Convertor>;

export function isDate(input: any) {
    if (Object.prototype.toString.call(input) === '[object Date]') {
        return true;
    }
    return false;
}

export function isTimeStamp(input: any): boolean {
    return (input instanceof firebase.firestore.Timestamp);
}

export function isGeoPoint(input: any): boolean {
    return (input instanceof firebase.firestore.GeoPoint);
}

export const NUMBER_CONVERTOR: Convertor = (value: any) => {
    return Number(value || 0);
};

export const DATE_CONVERTOR: Convertor = (value: any) => {
    if (isDate(value)) {
        return firebase.firestore.Timestamp.fromDate(value);
    }
    return value;
};

export const LOCATION_CONVERTOR: Convertor = (value: any) => {
    if (value) {
        const ary = value.split(',');
        const lat = Number(ary[0].trim());
        const lon = Number(ary[1].trim());
        return new firebase.firestore.GeoPoint(lat, lon);
    }
    return value;
};

export const ToDateConvertor: Convertor = (value: firebase.firestore.Timestamp) => {
    return value.toDate();
};

export const ToLocationConvertor: Convertor = (value: firebase.firestore.GeoPoint) => {
    return `${value.latitude},${value.longitude}`;
};