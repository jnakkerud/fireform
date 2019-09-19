import { Injectable } from '@angular/core';

export interface Login {
    username: string;
    password: string;
}

@Injectable()
export class AuthService {

    authenticated = false;

    constructor() { }

    public authenticate(login: Login): boolean {
        if (login.username === 'test' && login.password === 'test') {
            this.authenticated = true;
        }
        return this.authenticated;
    }

    public isAuthenticated(): boolean {
        return this.authenticated;
    }
}
