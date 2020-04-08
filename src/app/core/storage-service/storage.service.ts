import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFireStorage } from '@angular/fire/storage';

import { CollectionItem } from '../collection-service/collection.service';

@Injectable({
    providedIn: 'root',
})
export class StorageService {

    constructor(private storage: AngularFireStorage) {}

    public uploadFile(item: CollectionItem, file: File) {
        // store just the file.
        const filePath = `formdata/${item.id}/${file.name}`;
        const task = this.storage.upload(filePath, file);
    }

    public getDownloadURL(item: CollectionItem, fileName: string): Observable<string | null> {
        const ref = this.storage.ref(`formdata/${item.id}/${fileName}`);
        return ref.getDownloadURL();
    }

}
