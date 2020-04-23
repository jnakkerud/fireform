import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/storage';

import { CollectionItem } from '../collection-service/collection.service';

export interface FileLocation {
    file: File;
    location: string;
}

@Injectable({
    providedIn: 'root',
})
export class StorageService {

    private files: FileLocation[] = [];

    public collectionItem: CollectionItem;

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

    public addFile(f: File) {
        this.files.push(
            {
                file: f,
                location: this.getLocation()
            }
        );
    }

    public getLocation(): string {
        if (this.collectionItem) {
            // TODO
            return 'user-location';
        }
        return 'user-test-dir';
    }

    public flushFiles() {
        // TODO foreach file, upload.
    }
}
