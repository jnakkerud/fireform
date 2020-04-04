import { Injectable } from '@angular/core';

import { AngularFirestore,  } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { CollectionItem } from '../collection-service/collection.service';
import { isDate } from '../utils';

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

        // add a timestamp
        const ts = {timestamp: firebase.firestore.FieldValue.serverTimestamp()};

        // merge
        const mergedData = {...ts, ...validData};

        // See https://firebase.google.com/docs/firestore/data-model#hierarchical-data
        this.afs.collection(`formdata/${item.id}/data`).add(mergedData);
    }
}
