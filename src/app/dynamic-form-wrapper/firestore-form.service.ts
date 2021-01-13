import { Injectable } from '@angular/core';

import { FirestoreService } from '../core/firestore-service/firestore.service';

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
        return `${this.collection}/${this.id}`;
    }
}