import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root',
})
export class StorageService {

    public locationRoot = 'formdata';

    constructor(private storage: AngularFireStorage) {}

    public uploadFile(fileLocation: string, file: File): AngularFireUploadTask {
        // store just the file.
        const filePath = `${this.locationRoot}/${fileLocation}`;
        return this.storage.upload(filePath, file);
    }

    public removeFile(fileLocation: string): Observable<any> {
        const ref = this.storage.ref(`${this.locationRoot}/${fileLocation}`);
        return ref.delete();
    }

    public getDownloadURL(fileLocation: string): Observable<string | null> {
        const ref = this.storage.ref(`${this.locationRoot}/${fileLocation}`);
        return ref.getDownloadURL();
    }

}
