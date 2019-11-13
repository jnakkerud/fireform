import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AngularMaterialModule } from '../angular-material.module';
import { LinkService } from '../core/link-service/link.service';

export interface LinkData {
    collectionId: string;
}

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'generate-link',
    templateUrl: 'generate-link.component.html'
})

export class GenenerateLinkComponent implements OnInit {

    linkId: string;
    linkUrl: string;

    constructor(
        public linkService: LinkService,
        public dialogRef: MatDialogRef<GenenerateLinkComponent>,
        @Inject(MAT_DIALOG_DATA) public data: LinkData) { }

    ngOnInit(): void {
        this.linkId = this.generateLinkId();

        this.linkUrl = `${window.location.origin}/forms/${this.linkId}`;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    generateLinkId(): string {
        return this.linkService.generateLinkId();
    }

    onGenerate(): void {
        // call LinkService.generateLink(collectionId, linkId)
        this.linkService.addLink(this.linkId, this.data.collectionId);
        // close the dialog
        this.dialogRef.close();
    }
}

@NgModule({
    imports: [
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule],
    entryComponents: [GenenerateLinkComponent],
    exports: [GenenerateLinkComponent],
    declarations: [GenenerateLinkComponent],
  })
  export class GenerateLinkModule {}
