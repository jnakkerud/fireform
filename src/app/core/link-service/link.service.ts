import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import {
    AngularFirestore,
    AngularFirestoreCollection} from '@angular/fire/firestore';

import { FirestoreService } from '../firestore-service/firestore.service';

export interface Link {
    id: string;
    collectionId: string;
}

@Injectable({
    providedIn: 'root',
})
export class LinkService {

    constructor(private afs: AngularFirestore, private firestoreService: FirestoreService) { }

    private lCollection: AngularFirestoreCollection<Link>;
    get linksCollection(): AngularFirestoreCollection<Link> {
        if (!this.lCollection) {
            this.lCollection = this.afs.collection<Link>('links');
        }
        return this.lCollection;
    }

    generateLinkId(): string {
        return this.firestoreService.generateId();
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
        return this.firestoreService.upsert(`links/${linkId}`, {
            id: linkId,
            collectionId: cId
        });
    }

    removeLink(linkId: string): Promise<void> {
        return this.linksCollection.doc(linkId).delete();
    }
}
