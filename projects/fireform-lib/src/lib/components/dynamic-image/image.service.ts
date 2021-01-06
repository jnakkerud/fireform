import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class ImageService {

    public getImageURL(fileLocation: string): Observable<string | null> {
        return null;
    }
    
}