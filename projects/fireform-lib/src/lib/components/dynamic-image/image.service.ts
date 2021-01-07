import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ImageService {

    public getImageURL(fileLocation: string): Observable<string | null> {
        // return this.httpClient.get(fileLocation);
        return null;
    }
    
}