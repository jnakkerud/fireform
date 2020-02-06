import { Injectable } from '@angular/core';

import { AngularFirestore,  } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { CollectionItem } from '../collection-service/collection.service';

// TODO Utils
export function isDate(input: any) {
    if (Object.prototype.toString.call(input) === '[object Date]') {
        return true;
    }
    return false;
}

@Injectable({
    providedIn: 'root',
})
export class DataService {

    constructor(private afs: AngularFirestore) {}

    add(item: CollectionItem, data: any) {

        // Note that dates have to be converted to firestore Timestamp
        const newObj = {};

        Object.keys(data).forEach(key => {
            let val = data[key];
            if (isDate(val)) {
                val = firebase.firestore.Timestamp.fromDate(val);
            }
            newObj[key] = val;
          });

        // See https://firebase.google.com/docs/firestore/data-model#hierarchical-data
        this.afs.collection(`formdata/${item.id}/data`).add(newObj);

    }
}
