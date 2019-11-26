import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { CollectionItem } from '../collection-service/collection.service';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    constructor(private afs: AngularFirestore) {}

    add(item: CollectionItem, data: any) {

        // See https://firebase.google.com/docs/firestore/data-model#hierarchical-data
        this.afs.collection(`formdata/${item.id}/data`).add(data);

    }
}
