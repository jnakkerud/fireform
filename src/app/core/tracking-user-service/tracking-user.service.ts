import { Injectable } from '@angular/core';

import { FirestoreService } from '../firestore-service/firestore.service';
import { CollectionItem } from '../collection-service/collection.service';
import { FingerprintService } from '../fingerprint-service/fingerprint.service';

export interface TrackingUser {
    collectionId: string;
    id?: string;
    email?: string; // email or for anonymous users: tracking ID
    isRegistered?: boolean;
}

@Injectable({providedIn: 'root'})
export class TrackingUserService {

    constructor(private fireStoreService: FirestoreService, private fingerprintService: FingerprintService) { }

    public async lookupTrackingUserById(collectionItem: CollectionItem, lookupId?: string): Promise<TrackingUser> {
        let trackingId = lookupId;
        if (!trackingId) {
            trackingId = await this.generateTrackingId({collectionId: collectionItem.id});
        }
        let trackingUser = await this.fireStoreService.get<TrackingUser>(`tracking-users/${trackingId}`);
        if (!trackingUser) {
            // create an anonymous tracking user
            trackingUser = {collectionId: collectionItem.id, id: trackingId, isRegistered: false};
        }

        return new Promise<TrackingUser>((resolve) => {
            resolve(trackingUser);
        });
    }

    public async upsert(user: TrackingUser, id?: string): Promise<string> {
        let trackingId = id;
        if (!trackingId) {
            trackingId = await this.generateTrackingId(user);
            user.id = trackingId;
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
