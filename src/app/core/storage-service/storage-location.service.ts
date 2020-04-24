import { Injectable } from '@angular/core';

@Injectable()
export class StorageLocationService {

    // tslint:disable-next-line: variable-name
    private _path = 'user-test-dir';

    get path(): string {
        return this._path;
    }

    set path(path: string) {
        this._path = path;
    }
}
