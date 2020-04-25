import { Injectable } from '@angular/core';
import { Observable, of, Observer } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface CollectionItem {
    id: string;
    name: string;
    description?: string;
    form?: string;
    activeLink?: string;
    allowMultiple?: boolean;
    trackResponses?: boolean;
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

    upsertItem(item: CollectionItem): Observable<CollectionItem> {
        if (item.id === '-1') {
            // create a new ID
            item.id = this.afs.createId();
            this.itemsCollection.doc(item.id).set(item);
            return of(item);
        } else {
            return new Observable((observer: Observer<CollectionItem>) => {
                this.getItem(item.id)
                    .subscribe(res => {
                        const editResult = { ...res, ...item };
                        console.log('editResult', editResult);
                        this.itemsCollection.doc(item.id).update(editResult);
                        observer.next(editResult);
                        observer.complete();
                    }, err => observer.error(err));
            });
        }
    }

    getItem(id: string): Observable<CollectionItem> {
        return this.itemsCollection.doc<CollectionItem>(id).valueChanges().pipe(
            take(1),
            map(item => {
              return item;
            })
        );
    }

    removeItem(item: CollectionItem): Promise<void> {
        return this.itemsCollection.doc(item.id).delete();
    }

}
