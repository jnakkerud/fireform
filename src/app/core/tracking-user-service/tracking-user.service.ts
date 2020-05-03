import { Injectable } from '@angular/core';

import { FirestoreService } from '../firestore-service/firestore.service';
import { CollectionItem } from '../collection-service/collection.service';


// TODO revisit, use
/*function hashCode(s: string) {
    return s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
}*/

export interface TrackingUser {
    collectionId: string;
    email?: string;
    isRegistered?: boolean;
}

export interface Fingerprint {
    collectionId: string;
    email?: string;
    // for anonymous users:
    userAgent?: string;
    // TODO more values as fingerprinting
}

export interface TrackingInfo {
    trackingId: string;
    fingerprint: Fingerprint;
}

@Injectable({providedIn: 'root'})
export class TrackingUserService {

    constructor(private fireStoreService: FirestoreService) { }

    public async lookupTrackingUserById(collectionItem: CollectionItem, trackingId?: string): Promise<TrackingUser> {
        let lookupId = trackingId;
        if (!lookupId) {
            const info = this.generateTrackingInfo({collectionId: collectionItem.id});
            lookupId = info.trackingId;
        }
        let trackingUser = await this.fireStoreService.get<TrackingUser>(`tracking-users/${lookupId}`);
        if (!trackingUser) {
            // create an anonymous tracking user
            trackingUser = {collectionId: collectionItem.id, isRegistered: false};
        }

        return new Promise<TrackingUser>((resolve) => {
            resolve(trackingUser);
        });
    }

    public generateTrackingInfo(user: TrackingUser): TrackingInfo {
        const fp = this.generateFingerprint(user);
        return {
            fingerprint: fp,
            trackingId: this.generateTrackingId(user.isRegistered, fp)
        };
    }

    public upsert(user: TrackingUser, id?: string): Promise<string> {
        let trackingId = id;
        if (!trackingId) {
            const info = this.generateTrackingInfo(user);
            trackingId = info.trackingId;
        }

        return new Promise<string>(resolve => {
            this.fireStoreService.upsert(`tracking-users/${trackingId}`, user).then(_ => resolve(trackingId));
        });
    }

    // See https://stackoverflow.com/questions/47536063/how-to-recognize-user-from-different-browsers/47536192#47536192
    private generateFingerprint(user: TrackingUser): Fingerprint {
        // TODO.
        return {collectionId: user.collectionId, userAgent: navigator.userAgent};
    }

    // Doc ID is limited to 1500 bytes. https://firebase.google.com/docs/firestore/quotas
    private generateTrackingId(isRegistered: boolean, fingerprint: Fingerprint): string {
        let id: string;
        if (isRegistered) {
            id = this.fireStoreService.generateId();
        } else {
            // TODO hash based on fingerprint
            const v = Object.values(fingerprint).join();
            id = v;
        }
        return id;
    }
}
