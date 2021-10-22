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

    public authenticate(login?: Login): Promise<boolean> {
        if (login) {
            return this.doEmailLogin(login);
        }
        return this.doAnonymousLogin();
    }

    private doEmailLogin(login: Login): Promise<boolean>  {
        return new Promise<boolean>((resolve) => {
            firebase.auth().signInWithEmailAndPassword(login.username, login.password)
                .then(res => {
                    resolve(res?.user?.email === login.username);
                }, err => {
                    resolve(false);
                });
        });
    }

    private doAnonymousLogin(): Promise<boolean>  {
        return new Promise<boolean>((resolve) => {
            firebase.auth().signInAnonymously()
                .then(res => {
                    resolve(true);
                }, err => {
                    // this.doLogout().then(() => {});
                    console.log(err);
                    resolve(false);
                });
        });
    }

    doLogout() {
        return new Promise<void>((resolve, reject) => {
            if (firebase.auth().currentUser) {
                firebase.auth().signOut();
                resolve();
            } else {
                reject();
            }
        });
    }
}
