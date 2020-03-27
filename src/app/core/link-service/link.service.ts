import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument } from '@angular/fire/firestore';

import * as firebase from 'firebase/app';

export interface Link {
    id: string;
    collectionId: string;
}

type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({
    providedIn: 'root',
})
export class LinkService {

    constructor(private afs: AngularFirestore) { }

    private lCollection: AngularFirestoreCollection<Link>;
    get linksCollection(): AngularFirestoreCollection<Link> {
        if (!this.lCollection) {
            this.lCollection = this.afs.collection<Link>('links');
        }
        return this.lCollection;
    }

    generateLinkId(): string {
        return this.afs.createId();
    }

    // Firebase Server Timestamp
    get timestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }

    doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
        return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
    }

    set<T>(ref: DocPredicate<T>, data: any): Promise<void> {
        const timestamp = this.timestamp;
        return this.doc(ref).set({
            ...data,
            updatedAt: timestamp,
            createdAt: timestamp,
        });
    }

    update<T>(ref: DocPredicate<T>, data: any): Promise<void> {
        return this.doc(ref).update({
            ...data,
            updatedAt: this.timestamp,
        });
    }

    async upsert<T>(ref: DocPredicate<T>, data: any): Promise<void> {
        const doc = this.doc(ref)
          .snapshotChanges()
          .pipe(take(1))
          .toPromise();

        const snap = await doc;
        return snap.payload.exists ? this.update(ref, data) : this.set(ref, data);
      }

    getLink(linkId: string): Observable<Link> {
        return this.linksCollection.doc<Link>(linkId).valueChanges().pipe(
            take(1),
            map(link => {
              return link;
            })
        );
    }

    upsertLink(linkId: string, cId: string): Promise<void> {
        return this.upsert(`links/${linkId}`, {
            id: linkId,
            collectionId: cId
        });
    }

    removeLink(linkId: string): Promise<void> {
        return this.linksCollection.doc(linkId).delete();
    }
}
