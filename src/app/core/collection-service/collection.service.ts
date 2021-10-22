import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

export interface Point {
    value?: string | number | boolean;   // data value to match
    point?: number | null;
}

export interface GradeResponse {
    field: string;
    points: Point[];
}

export interface CollectionItem {
    id: string;
    name: string;
    description?: string;
    form?: string;
    activeLink?: string;
    allowMultiple?: boolean;
    trackResponses?: boolean;
    gradeResponse?: GradeResponse[];
}

@Injectable({
    providedIn: 'root',
})
export class CollectionService {

    constructor(private afs: AngularFirestore) { }

    private iCollection: AngularFirestoreCollection<CollectionItem>;
    get itemsCollection(): AngularFirestoreCollection<CollectionItem> {
        if (!this.iCollection) {
            this.iCollection = this.afs.collection<CollectionItem>('collections');
        }
        return this.iCollection;
    }

    getItems(): Observable<CollectionItem[]> {
        return this.itemsCollection.valueChanges();
    }

    upsertItem(item: CollectionItem): Promise<CollectionItem> {
        return new Promise<CollectionItem>(resolve => {
            if (item.id === '-1') {
                // create a new ID
                item.id = this.afs.createId();
                this.itemsCollection.doc(item.id).set(item);
                resolve(item);
            } else {
                this.getItem(item.id)
                    .then(res => {
                        const editResult = { ...res, ...item };
                        console.log('upsetItem', editResult);
                        this.itemsCollection.doc(item.id).update(editResult);
                        resolve(editResult);
                    }, err => console.log(err));
            }
        });
    }

    update(item: CollectionItem): Promise<void> {
        return this.itemsCollection.doc(item.id).update(item);
    }

    getItem(id: string): Promise<CollectionItem> {
        return this.itemsCollection.doc<CollectionItem>(id).valueChanges().pipe(
            take(1),
            map(item => {
              return item;
            })
        ).toPromise();
    }

    removeItem(item: CollectionItem): Promise<void> {
        return this.itemsCollection.doc(item.id).delete();
    }

}
