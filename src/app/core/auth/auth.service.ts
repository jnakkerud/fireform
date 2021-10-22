import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
export interface Login {
    username: string;
    password: string;
}
@Injectable()
export class AuthService {

    constructor(public auth: AngularFireAuth) {}

    public authenticate(login?: Login): Promise<boolean> {
        if (login) {
            return this.doEmailLogin(login);
        }
        return this.doAnonymousLogin();
    }

    private doEmailLogin(login: Login): Promise<boolean>  {
        return new Promise<boolean>((resolve) => {
            this.auth.signInWithEmailAndPassword(login.username, login.password)
                .then(res => {
                    resolve(res?.user?.email === login.username);
                }, err => {
                    resolve(false);
                });
        });
    }

    private doAnonymousLogin(): Promise<boolean>  {
        return new Promise<boolean>((resolve) => {
            this.auth.signInAnonymously()
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
            if (this.auth.currentUser) {
                this.auth.signOut();
                resolve();
            } else {
                reject();
            }
        });
    }
}
