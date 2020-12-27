import firebase from 'firebase/app';

import { isDate } from '../../core/utils';

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
