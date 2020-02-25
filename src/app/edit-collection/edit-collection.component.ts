import { Component, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { CollectionService, CollectionItem } from '../core/collection-service/collection.service';
import { LinkService } from '../core/link-service/link.service';
import { RecentlyUsedService } from '../core/recently-used-service/recently-used.service';
import { AngularMaterialModule } from '../angular-material.module';
import { CollectionSettingsModule, CollectionSettingsComponent } from '../collection-settings/collection-settings.component';
import { FormBuilderModule } from '../form-builder/form-builder.component';
import { GenerateLinkModule,  GenenerateLinkComponent } from '../generate-link/generate-link.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog.component';
import { DownloadService } from '../core/download-service/download.service';

@Component({
    selector: 'app-edit-collection',
    templateUrl: 'edit-collection.component.html',
    styleUrls: ['./edit-collection.component.scss']
})

export class EditCollectionComponent {
    editItem: CollectionItem = {id: '', name: ''};
    showEditor = false;

    // We need a setter here cause the CollectionSettingsComponent is hidden initially
    @ViewChild(CollectionSettingsComponent) set content(value: CollectionSettingsComponent) {
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
        private linkService: LinkService,
        private downloadService: DownloadService,
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
        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
            data: {
                message: 'Are you sure you want to delete this collection?',
                formDataMessage: `Form Data in formdata/${this.editItem.id} must be removed manually`,
                buttonText: {
                    ok: 'Delete',
                    cancel: 'Cancel'
                }
            }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                this.deleteAll().then(() => {
                    // move to card view
                    this.router.navigate(['/']);
                });
            }
        });
    }

    onGenerateLink() {
        // show the generated link in a dialog

        // pass in the edit item to the dialog
        this.dialog.open(GenenerateLinkComponent, {
            width: '450px',
            data: { collectionItem: this.editItem }
        });
    }

    onDownload() {
        this.downloadService.downloadCsv(this.editItem);
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

    async deleteAll(): Promise<void[]> {
        const p1 = this.collectionService.removeItem(this.editItem);

        // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await

        // delete links
        let p2 =  Promise.resolve();
        if (this.editItem.activeLink) {
            p2 = this.linkService.removeLink(this.editItem.activeLink);
        }

        return Promise.all([p1, p2]);
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
    exports: [EditCollectionComponent, DeleteConfirmationDialogComponent],
    declarations: [EditCollectionComponent, DeleteConfirmationDialogComponent]
  })
  export class EditCollectionModule {}
