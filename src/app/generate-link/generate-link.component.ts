import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AngularMaterialModule } from '../angular-material.module';
import { LinkService } from '../core/link-service/link.service';
import { CollectionService, CollectionItem } from '../core/collection-service/collection.service';

export interface FormData {
    collectionItem: CollectionItem;
}

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'generate-link',
    templateUrl: 'generate-link.component.html'
})

export class GenerateLinkComponent implements OnInit {

    linkId: string;
    linkUrl: string;

    constructor(
        private linkService: LinkService,
        private collectionService: CollectionService,
        public dialogRef: MatDialogRef<GenerateLinkComponent>,
        @Inject(MAT_DIALOG_DATA) public data: FormData) { }

    ngOnInit(): void {
        // For now, support only one link per collection

        // Look for the existing link, if it does not exist, then generate one
        this.linkId = this.data.collectionItem.activeLink;
        if (!this.linkId) {
            this.linkId = this.linkService.generateLinkId();
        }

        this.linkUrl = `${window.location.origin}/form/${this.linkId}`;

        this.dialogRef.afterClosed().subscribe(result => {
            this.onGenerate();
        });
    }

    onGenerate(): void {
        // save the collection with the activeLink
        const editItem = this.data.collectionItem;
        if (!editItem.activeLink) {
            editItem.activeLink = this.linkId;
            this.collectionService.upsertItem(editItem).subscribe();
        }
        this.linkService.upsertLink(this.linkId, editItem.id);
    }

}

@NgModule({
    imports: [
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule],
    exports: [GenerateLinkComponent],
    declarations: [GenerateLinkComponent]
  })
  export class GenerateLinkModule {}
