import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { CollectionService, CollectionItem } from '../../core/collection-service/collection.service';

@Component({
    selector: 'app-project-list',
    templateUrl: 'collection-list.component.html',
    styleUrls: ['./collection-list.component.scss']
})

export class CollectionListComponent {

    collectionItems: Observable<CollectionItem[]>;

    constructor(collectionService: CollectionService) {
        this.collectionItems = collectionService.getItems();
    }
}
