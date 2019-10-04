import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { CollectionItem } from '../core/collection-service/collection.service';
import { CollectionSettingsModule } from '../collection-settings/collection-settings.component';

@Component({
    selector: 'app-create-collection',
    templateUrl: 'create-collection.component.html'
})

export class CreateCollectionComponent {

    constructor(private router: Router) { }

    onCancel() {
        this.router.navigate(['/']);
    }

    onNext(newItem: CollectionItem) {
        // move to edit collection
        this.router.navigate(['/collections', newItem.id]);
    }
}

@NgModule({
    imports: [
        RouterModule,
        CollectionSettingsModule,
        CommonModule],
    exports: [CreateCollectionComponent],
    declarations: [CreateCollectionComponent],
  })
  export class CreateCollectionModule {}
