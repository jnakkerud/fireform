import { Injectable } from '@angular/core';

export interface CollectionItem {
    id: string;
    name: string;
    description: string;
}

const PROJECTS: CollectionItem[] = [
    {
        id: '1',
        name: 'First Project',
        description: 'This is the first project'
    },
    {
        id: '2',
        name: 'Second Project',
        description: 'This is the second project'

    },
    {
        id: '3',
        name: 'Thrid Project',
        description: 'This is the second project'

    },
    {
        id: '4',
        name: 'Fourth Project',
        description: 'This is the second project'

    },
    {
        id: '5',
        name: '5 Project',
        description: 'This is the second project'

    },
    {
        id: '6',
        name: '6 Project',
        description: 'This is the second project'

    }
];

@Injectable({
    providedIn: 'root',
})
export class CollectionService {

    items: CollectionItem[] = [];

    constructor() {
        // seed the collection
        this.items.push.apply(this.items, PROJECTS);
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
            }
        }
        return editResult;
    }

    getItem(itemId: string): CollectionItem {
        return this.items.find(x => x.id === itemId);
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
