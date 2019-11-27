import { Component, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { CollectionService, CollectionItem } from '../core/collection-service/collection.service';
import { RecentlyUsedService } from '../core/recently-used-service/recently-used.service';
import { AngularMaterialModule } from '../angular-material.module';
import { CollectionSettingsModule, CollectionSettingsComponent } from '../collection-settings/collection-settings.component';
import { FormBuilderModule } from '../form-builder/form-builder.component';
import { GenerateLinkModule,  GenenerateLinkComponent } from '../generate-link/generate-link.component';

@Component({
    selector: 'app-edit-collection',
    templateUrl: 'edit-collection.component.html',
    styleUrls: ['./edit-collection.component.scss']
})

export class EditCollectionComponent {
    editItem: CollectionItem = {id: '', name: ''};
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
        private dialog: MatDialog,
        private collectionService: CollectionService,
        private recentlyUsedService: RecentlyUsedService) {
        this.route.params.subscribe(p => {
            this.collectionService.getItem(p.id).subscribe(item => {
                this.editItem = item;
                this.recentlyUsedService.set(this.editItem.id);
            });
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

    onGenerateLink() {
        // show the generated link in a dialog

        // pass in the edit item to the dialog
        this.dialog.open(GenenerateLinkComponent, {
            width: '450px',
            data: { collectionItem: this.editItem }
        });
    }


    saveForm(formJson: string) {
        this.editItem.form = formJson;
        this.collectionService.upsertItem(this.editItem).subscribe(item => {
            this.editItem = item;
        });
    }

    saveSettings(item: CollectionItem) {
        this.editItem = item;
        this.toggleSettings();
    }
}

@NgModule({
    imports: [
        RouterModule,
        AngularMaterialModule,
        CollectionSettingsModule,
        FormBuilderModule,
        GenerateLinkModule,
        CommonModule],
    exports: [EditCollectionComponent],
    declarations: [EditCollectionComponent],
  })
  export class EditCollectionModule {}
