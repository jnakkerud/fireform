import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    add(data: any) {
        console.log('data added', data);
    }
}
