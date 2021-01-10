import { Injectable } from '@angular/core';

import { ImageService } from 'fireform-lib'; 
import { Observable } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/storage';

@Injectable()
export class DownloadImageService implements ImageService {
    public locationRoot = 'formdata';

    constructor(private fireStorage: AngularFireStorage) { }

    getImageURL(fileLocation: string): Observable<string | null> {
        const ref = this.fireStorage.ref(`${this.locationRoot}/${fileLocation}`);
        return ref.getDownloadURL();
    }
    
}