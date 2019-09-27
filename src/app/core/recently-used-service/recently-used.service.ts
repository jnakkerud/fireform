import { Injectable } from '@angular/core';

import { CollectionService, CollectionItem } from '../collection-service/collection.service';

@Injectable({
    providedIn: 'root',
})
export class RecentlyUsedService {

    constructor(private collectionService: CollectionService) { }

    public get(): CollectionItem[] {
        // get ID's from local storage
        const data = localStorage.getItem('collection-ids');
        const storedIds = (data) ? JSON.parse(data) as [] : [];

        const collectionItems: CollectionItem[] = [];

        for (const id of storedIds) {
            const item = this.collectionService.getItem(id);
            if (item) {
                collectionItems.push(item);
            }
        }

        if (collectionItems.length < 5) {
            const items = this.collectionService.getCollectionItems();
            for (const item of items) {
                if (!storedIds.find(i => i === item.id)) {
                    collectionItems.push(item);
                }
                if (collectionItems.length === 5) {
                    break;
                }
             }

        }

        return collectionItems;
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
