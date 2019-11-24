import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { CollectionService, CollectionItem } from '../collection-service/collection.service';

@Injectable({
    providedIn: 'root',
})
export class RecentlyUsedService {

    collectionItems: Observable<CollectionItem[]>;

    constructor(collectionService: CollectionService) {
        this.collectionItems = collectionService.getItems();
    }

    public get(): Observable<CollectionItem[]>  {

        return new Observable((observer: Observer<CollectionItem[]>) => {
            this.collectionItems.subscribe(items => {
                // get ID's from local storage
                const data = localStorage.getItem('collection-ids');
                const storedIds = (data) ? JSON.parse(data) as [] : [];
                let resultItems: CollectionItem[] = [];
                for (const id of storedIds) {
                    const idx = items.findIndex(item => item.id === id);
                    if (idx > -1) {
                        resultItems.push(items[idx]);
                        items.splice(idx, 1);
                    }
                }

                if (items.length > 0 && resultItems.length < 5) {
                    // fill remaining items up to 5
                    resultItems = resultItems.concat(items.slice(0, Math.min(5 - resultItems.length, items.length)));
                }

                observer.next(resultItems);
            });
        });
    }

    public set(id: string) {
        // get from local storage
        const data = localStorage.getItem('collection-ids');
        const storedIds = (data) ? JSON.parse(data) as [] : [];

        // if id exists, remove
        for (let i = 0; i < storedIds.length; i++) {
            if ( storedIds[i] === id) {
                storedIds.splice(i, 1);
            }
         }

        // put at top of the array
        storedIds.unshift(id);

        // only store 5
        localStorage.setItem('collection-ids', JSON.stringify(storedIds.slice(0, 5)));
    }
}
