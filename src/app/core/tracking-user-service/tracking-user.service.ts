import { Injectable } from '@angular/core';

import { FirestoreService } from '../firestore-service/firestore.service';
import { CollectionItem } from '../collection-service/collection.service';
import { FingerprintService } from '../fingerprint-service/fingerprint.service';

export interface TrackingUser {
    collectionId: string;
    email?: string;
    isRegistered?: boolean;
}

@Injectable({providedIn: 'root'})
export class TrackingUserService {

    constructor(private fireStoreService: FirestoreService, private fingerprintService: FingerprintService) { }

    public async lookupTrackingUserById(collectionItem: CollectionItem, trackingId?: string): Promise<TrackingUser> {
        let lookupId = trackingId;
        if (!lookupId) {
            lookupId = await this.generateTrackingId({collectionId: collectionItem.id});
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

    public async upsert(user: TrackingUser, id?: string): Promise<string> {
        let trackingId = id;
        if (!trackingId) {
            trackingId = await this.generateTrackingId(user);
        }

        return new Promise<string>(resolve => {
            this.fireStoreService.upsert(`tracking-users/${trackingId}`, user).then(() => resolve(trackingId));
        });
    }

    // Doc ID is limited to 1500 bytes. https://firebase.google.com/docs/firestore/quotas
    private generateTrackingId(user: TrackingUser): Promise<string> {
        if (user.isRegistered) {
            return new Promise<string>(resolve => resolve(this.fireStoreService.generateId()));
        } else {
            // For an anonymous user, create a fingerprint to be used as the id
            return this.fingerprintService.getFingerprint(user.collectionId);
        }
    }
}
