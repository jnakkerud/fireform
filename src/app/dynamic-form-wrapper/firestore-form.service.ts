import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FirestoreService } from '../core/firestore-service/firestore.service';

function isString(value: any): value is string {
    return typeof value === 'string';
}

export function coerceDataPath(value: DataPath | string): DataPath {
    return isString(value) ? new DataPath(value as string) : value;
}
@Injectable()
export class FireStoreFormService {

    constructor(private fireStoreService: FirestoreService) { }
    
    public get(dataPath: DataPath): Promise<any> {
        return this.fireStoreService.get(dataPath.path());
    }

    public upsert(dataPath: DataPath, data: any): Promise<DataPath> {
        if (!dataPath.id) {
            dataPath.id = this.fireStoreService.generateId();
        }

        return new Promise<DataPath>(resolve => {
            this.fireStoreService.upsert(dataPath.path(), data).then(() => resolve(new DataPath(dataPath.path())));
        });        
    }

    public items(dataPath: DataPath): Observable<any> {
        return this.fireStoreService.collection(dataPath.path()).valueChanges();
    }
}

export class DataPath {
    collection: string;
    id?: string;

    constructor(path: string) {
        const s = path.split('/');
        this.collection = s[0];
        if (s.length > 1) {
            this.id = s[1];
        }
    }

    public path(): string {
        if (!this.id) {
            return this.collection;
        }
        return `${this.collection}/${this.id}`;
    }
}