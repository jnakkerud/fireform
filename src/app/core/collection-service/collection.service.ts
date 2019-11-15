import { Injectable } from '@angular/core';

export interface CollectionItem {
    id: string;
    name: string;
    description?: string;
    form?: string;
}

@Injectable({
    providedIn: 'root',
})
export class CollectionService {

    private items: CollectionItem[] = [];

    constructor() {
        // seed the collection
        const c = localStorage.getItem('collections');
        if (c) {
            this.items.push.apply(this.items, JSON.parse(c));
        }
    }

    getCollectionItems(): CollectionItem[] {
        return this.items;
    }

    // TODO better name
    addItem(item: CollectionItem): CollectionItem {
        let editResult: CollectionItem;
        if (item.id === '-1') {
            // create a new ID
            item.id = this.generateId();
            this.items.push(item);
            editResult = item;
        } else {
            editResult = this.getItem(item.id);
            if (editResult) {
                editResult.name = item.name;
                editResult.description = item.description;
                editResult.form = item.form;
            }
        }
        this.write();
        return editResult;
    }

    getItem(itemId: string): CollectionItem {
        return this.items.find(x => x.id === itemId);
    }

    removeItem(item: CollectionItem) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === item.id) {
                this.items.splice(i, 1);
            }
        }
        this.write();
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    private write() {
        localStorage.setItem('collections', JSON.stringify(this.items));
    }
}
