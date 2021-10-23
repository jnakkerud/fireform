import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AngularFireFunctions } from '@angular/fire/compat/functions';

import { AngularMaterialModule } from '../angular-material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TrackingUserService } from '../core/tracking-user-service/tracking-user.service';
import { CollectionItem, CollectionService } from '../core/collection-service/collection.service';
import { LinkService } from '../core/link-service/link.service';

export interface SendInvitationData {
    collectionItem: CollectionItem;
}

interface EmailToken {
    email: string;
    token: string;
}

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'send-invitation',
    templateUrl: 'send-invitation.component.html',
    styleUrls: ['./send-invitation.component.scss']
})

export class SendInvitationComponent implements OnInit {

    form: FormGroup = new FormGroup({
        email: new FormControl(''),
        subject: new FormControl(''),
        message: new FormControl('')
    });

    collectionItem: CollectionItem;

    constructor(
        private trackingUserService: TrackingUserService,
        private linkService: LinkService,
        private collectionService: CollectionService,
        private fns: AngularFireFunctions,
        private snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<SendInvitationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SendInvitationData) { }

    ngOnInit() {
        this.collectionItem = this.data.collectionItem;
    }

    async sendInvitations() {
        const tokens: EmailToken[] = [];
        const emails = this.form.get('email').value;
        const emailArray = emails.split(',');
        for (const e of emailArray) {
            // For each email, update the tracking-user db
            await this.trackingUserService.upsert(
                {
                    collectionId: this.collectionItem.id,
                    user: e,
                    isRegistered: true
                }
            ).then(t => tokens.push({email: e, token: t}));
        }

        const subject = this.form.get('subject').value;
        const message = this.form.get('message').value;

        let linkId = this.collectionItem.activeLink;
        if (!linkId) {
            linkId = this.linkService.generateLinkId();
            this.saveLink(this.collectionItem, linkId);
        }
        const url = `${window.location.origin}/form/${linkId}`;

        const callable = this.fns.httpsCallable('sendMail');
        const result = callable({
            subject,
            message,
            url,
            tokens
        });

        result.subscribe(x => this.snackBar.open('Email sent', 'Success!', {
            duration: 3000,
        }));
    }

    saveLink(editItem: CollectionItem, linkId: string) {
        if (!editItem.activeLink) {
            editItem.activeLink = linkId;
            this.collectionService.upsertItem(editItem);
        }
        this.linkService.upsertLink(linkId, editItem.id);
    }
}

@NgModule({
    imports: [
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule],
    exports: [SendInvitationComponent],
    declarations: [SendInvitationComponent]
  })
export class SendInvitationModule {}
