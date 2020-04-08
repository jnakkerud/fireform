import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/storage';

import { CollectionItem } from '../collection-service/collection.service';

@Injectable({
    providedIn: 'root',
})
export class StorageService {

    constructor(private storage: AngularFireStorage) {}

    public uploadFile(fileLocation: string, file: File) {
        // store just the file.
        const filePath = `formdata/${fileLocation}`;
        const task = this.storage.upload(filePath, file);
    }

    public getDownloadURL(fileLocation: string): Observable<string | null> {
        const ref = this.storage.ref(`formdata/${fileLocation}`);
        return ref.getDownloadURL();
    }
}
