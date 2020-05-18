import { Injectable } from '@angular/core';

import { AngularFirestore,  } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { CollectionItem, GradeResponse } from '../collection-service/collection.service';
import { isDate } from '../utils';
import { take, map, concatMap, filter, reduce, pluck } from 'rxjs/operators';
import { from, pairs, Observable } from 'rxjs';

interface AdditionalData {
    timestamp: firebase.firestore.FieldValue;
    grade?: number;
}

export function totalGrade(gradeResponse: GradeResponse[]): Observable<number> {
    return from(gradeResponse).pipe(
        concatMap(g => from(g.points).pipe(pluck('point'))),
        reduce((acc, val) => acc + val)
    );
}

export function grade(gradeResponse: GradeResponse[], data: any): Observable<number> {

    const dataPairs = pairs(data);

    // filter by matching the field in the data object
    // to the GradeResponse, merge the result
    const filtered = from(gradeResponse).pipe(
        concatMap(g => dataPairs.pipe(
            filter(pair => g.field === pair[0]),
            map(pair => ({g, p: Array.isArray(pair[1]) ? pair[1] : [pair[1]]})),
        )
    ));

    // match the values, then calculate a total
    const res = filtered.pipe(
        concatMap(val => from(val.g.points).pipe(
            filter(point => val.p.includes(point.value)),
            map(v => v.point)
        )),
        reduce((acc, val) => acc + val)
    );

    return res;
}

@Injectable({
    providedIn: 'root',
})
export class DataService {

    constructor(private afs: AngularFirestore) {}

    public async add(item: CollectionItem, data: any) {
        // Note that dates have to be converted to firestore Timestamp
        const validData = {};

        Object.keys(data).forEach(key => {
            let val = data[key];
            if (isDate(val)) {
                val = firebase.firestore.Timestamp.fromDate(val);
            }
            validData[key] = val;
        });

        // add a timestamp
        const additionalData: AdditionalData = {timestamp: firebase.firestore.FieldValue.serverTimestamp()};

        if (item.gradeResponse) {
            additionalData.grade = await this.gradeResponse(item.gradeResponse, data);
        }

        // merge
        const mergedData = {...additionalData, ...validData};

        // TODO return data

        // See https://firebase.google.com/docs/firestore/data-model#hierarchical-data
        this.afs.collection(`formdata/${item.id}/data`).add(mergedData);
    }

    queryByTrackingUser(collectionItem: CollectionItem, user: string): Promise<any> {
        return this.afs.collection(`formdata/${collectionItem.id}/data`, ref => ref.where('tracking_user', '==', user)).
            valueChanges().pipe(
                take(1),
                map(data => {
                    if (Array.isArray(data)) {
                        return data.pop();
                    }
                    return data;
                })
            ).toPromise();
    }

    private gradeResponse(gradeResponse: GradeResponse[], data: any): Promise<number> {
        return grade(gradeResponse, data).toPromise();
    }
}
