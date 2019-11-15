import { Injectable } from '@angular/core';

export interface Link {
    id: string;
    collectionId: string;
}

@Injectable({
    providedIn: 'root',
})
export class LinkService {

    private links: Link[] = [];

    constructor() {
        // seed the collection
        const s = localStorage.getItem('links');
        if (s) {
            this.links.push.apply(this.links, JSON.parse(s));
        }
    }

    generateLinkId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    addLink(linkId: string, cId: string) {
        this.links.push({
            id: linkId,
            collectionId: cId
        });
        this.write();
    }

    getLink(linkId: string): Link {
        return this.links.find(x => x.id === linkId);
    }

    private write() {
        localStorage.setItem('links', JSON.stringify(this.links));
    }

}
