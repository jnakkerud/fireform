import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CollectionItem } from '../../core/collection-service/collection.service';

@Component({
    selector: 'app-create-collection',
    templateUrl: 'create-collection.component.html'
})
export class CreateCollectionComponent {

    constructor(private router: Router, private route: ActivatedRoute) { }

    onCancel() {
        const returnUrl = this.route.snapshot.queryParams?.returnUrl || '/';
        if (returnUrl === '/') {
            this.router.navigate(['/']);
        } else {
            this.router.navigate(['/collections', returnUrl]);
        }
    }

    onNext(newItem: CollectionItem) {
        // move to edit collection
        this.router.navigate(['/collections', newItem.id]);
    }
}
