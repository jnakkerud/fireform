import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface TrackingUser {
    token: string;
    email?: string;
    isRegistered?: boolean;
    // login?: any;  // login timestamp
}

@Injectable({providedIn: 'root'})
export class TrackingUserService {

    constructor(private httpClient: HttpClient) { }

    public lookupTrackingUserByToken(token: string): Promise<TrackingUser> {
        // TODO implement
        // If token is null, return an anon user
        return new Promise<TrackingUser>((resolve, reject) => {
            resolve({token: 'xx', email: ''});
        });
    }

    public generateTrackingToken(): string {
        return 'TODO';
    }

    private update(user: TrackingUser) {
        // TODO 
    }

    private insert(user: TrackingUser) {
        // TODO
    }
    
    public upsert(user: TrackingUser) {
        // TODO

        // add created timestamp

        // add updated timestamp, i.e. login timestamp
    }
}
