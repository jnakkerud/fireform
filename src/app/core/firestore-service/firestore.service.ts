import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import firebase from 'firebase/app';
import { take } from 'rxjs/operators';

type DocPredicate<T> = string | AngularFirestoreDocument<T>;

// See https://pastebin.com/Rt02hdHZ
@Injectable({ providedIn: 'root' })
export class FirestoreService {

    constructor(private afs: AngularFirestore) { }

    generateId(): string {
        return this.afs.createId();
    }

    // Firebase Server Timestamp
    get timestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }

    doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
        return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
    }

    collection(path: string): AngularFirestoreCollection {
        return this.afs.collection(path);
    }

    get<T>(ref: DocPredicate<T>): Promise<T> {
        return new Promise<T>(resolve => {
            this.doc(ref).ref.get().then(doc => {
                if (doc.exists) {
                    resolve(doc.data() as T);
                } else {
                    resolve(null);
                }
            });
        });
    }

    insert<T>(ref: DocPredicate<T>, data: any): Promise<void> {
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
        return snap.payload.exists ? this.update(ref, data) : this.insert(ref, data);
    }
}
