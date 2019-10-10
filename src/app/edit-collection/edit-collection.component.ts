import { Component, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { CollectionService, CollectionItem } from '../core/collection-service/collection.service';
import { RecentlyUsedService } from '../core/recently-used-service/recently-used.service';
import { AngularMaterialModule } from '../angular-material.module';
import { CollectionSettingsModule, CollectionSettingsComponent } from '../collection-settings/collection-settings.component';
import { FormBuilderModule } from '../form-builder/form-builder.component';

@Component({
    selector: 'app-edit-collection',
    templateUrl: 'edit-collection.component.html',
    styleUrls: ['./edit-collection.component.scss']
})

export class EditCollectionComponent {
    editItem: CollectionItem;
    showEditor = false;

    // We need a setter here cause the CollectionSettingsComponent is hidden initially
    @ViewChild(CollectionSettingsComponent, {static: false}) set content(value: CollectionSettingsComponent) {
        this.settingsComponent = value;
        if (this.settingsComponent) {
            this.settingsComponent.collectionItem = this.editItem;
        }
    }
    settingsComponent: CollectionSettingsComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private collectionService: CollectionService,
        private recentlyUsedService: RecentlyUsedService) {
        this.route.params.subscribe(p => {
            this.editItem = this.collectionService.getItem(p.id);
            this.recentlyUsedService.set(this.editItem.id);
        });
    }

    toggleSettings() {
        this.showEditor = !this.showEditor;
    }

    onDelete() {
        // delete from the collection
        this.collectionService.removeItem(this.editItem);

        // move to card view
        this.router.navigate(['/']);
    }
}

@NgModule({
    imports: [
        RouterModule,
        AngularMaterialModule,
        CollectionSettingsModule,
        FormBuilderModule,
        CommonModule],
    exports: [EditCollectionComponent],
    declarations: [EditCollectionComponent],
  })
  export class EditCollectionModule {}
