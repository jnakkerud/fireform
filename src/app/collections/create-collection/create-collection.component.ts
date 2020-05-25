import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CollectionItem } from '../../core/collection-service/collection.service';

@Component({
    selector: 'app-create-collection',
    templateUrl: 'create-collection.component.html'
})
export class CreateCollectionComponent {

    private returnUrl: string;

    constructor(private router: Router) { }

    onCancel() {
        // TODO back to originating view
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate(['/']);
    }

    onNext(newItem: CollectionItem) {
        // move to edit collection
        this.router.navigate(['/collections', newItem.id]);
    }
}
