import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { firebase } from '@firebase/app';
import '@firebase/auth';

@Injectable()
export class UserService {

    user: any;

    constructor(private afAuth: AngularFireAuth) {
        this.afAuth.auth.onAuthStateChanged(user => {
            this.user = user;
        });
    }

    getCurrentUser(): Promise<any> {
        return new Promise<any>((resolve) => {
            resolve(this.user);
        });
    }
}
