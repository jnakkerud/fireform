import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Link {
    id: string;
    collectionId: string;
}

@Injectable({
    providedIn: 'root',
})
export class LinkService {

    private linksCollection: AngularFirestoreCollection<Link>;

    constructor(private afs: AngularFirestore) {
        this.linksCollection = afs.collection<Link>('links');
    }

    generateLinkId(): string {
        return this.afs.createId();
    }

    addLink(linkId: string, cId: string) {
        this.linksCollection.doc(linkId).set(
            {
                id: linkId,
                collectionId: cId
            }
        );
    }

    getLink(linkId: string): Observable<Link> {
        return this.linksCollection.doc<Link>(linkId).valueChanges().pipe(
            take(1),
            map(link => {
              return link;
            })
        );
    }

}
