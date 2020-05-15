import { Injectable } from '@angular/core';

import { AngularFirestore,  } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { CollectionItem, GradeResponse } from '../collection-service/collection.service';
import { isDate } from '../utils';
import { take, map, concatMap, filter, reduce, pluck } from 'rxjs/operators';
import { from, pairs, Observable } from 'rxjs';

export function totalGrade(gradeResponse: GradeResponse[]): Observable<number> {
    return from(gradeResponse).pipe(
        concatMap(g => from(g.point).pipe(pluck('points'))),
        reduce((acc, val) => acc + val)
    );
}

export function grade(gradeResponse: GradeResponse[], data: any ): Observable<number> {

    // 1) iterate over the array of grade responses
    // find the matching field in the data object

    // 2) Now take the Point array from the matched GradeResponse and match the value
    // or values from the matched field in the data object.  Accumulate the total

    // 3) add up all the sub-totals together to arrive at a grand total which is the grade

    const dataPairs = pairs(data);

    const filtered = from(gradeResponse).pipe(
        concatMap(g => dataPairs.pipe(
            filter(pair => g.field === pair[0]),
            map(pair => ({g, p: Array.isArray(pair[1]) ? pair[1] : [pair[1]]})),
        )
    ));

    const res = filtered.pipe(
        concatMap(val => from(val.g.point).pipe(
            filter(point => val.p.includes(point.value)),
            map(v => v.points)
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

    add(item: CollectionItem, data: any) {
        // Note that dates have to be converted to firestore Timestamp
        const validData = {};

        Object.keys(data).forEach(key => {
            let val = data[key];
            if (isDate(val)) {
                val = firebase.firestore.Timestamp.fromDate(val);
            }
            validData[key] = val;
        });

        if (item.gradeResponse) {
            // TODO grade the response
        }

        // add a timestamp and TODO add grade
        const ts = {timestamp: firebase.firestore.FieldValue.serverTimestamp()};

        // merge
        const mergedData = {...ts, ...validData};

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
}
