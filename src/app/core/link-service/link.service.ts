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

    generateLinkId(): string {
        return Math.random().toString(36).substr(2, 9);
    }

    addLink(linkId: string, cId: string) {
        this.links.push({
            id: linkId,
            collectionId: cId
        });
    }
}
