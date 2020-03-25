import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { firebase } from '@firebase/app';
import '@firebase/auth';

export interface Login {
    username: string;
    password: string;
}

@Injectable()
export class AuthService {

    public authenticate(login: Login): Promise<boolean> {
        return this.doEmailLogin(login);
    }

    private doEmailLogin(login: Login): Promise<boolean>  {
        return new Promise<boolean>((resolve) => {
            firebase.auth().signInWithEmailAndPassword(login.username, login.password)
                .then(res => {
                    resolve(true);
                }, err => {
                    // this.doLogout().then(() => {});
                    resolve(false);
                });
        });
    }

    doLogout() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser) {
                firebase.auth().signOut();
                resolve();
            } else {
                reject();
            }
        });
    }
}
