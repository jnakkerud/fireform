import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../angular-material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TrackingUserService, Token } from '../core/tracking-user-service/tracking-user.service';
import { CollectionItem } from '../core/collection-service/collection.service';

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
        public dialogRef: MatDialogRef<SendInvitationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SendInvitationData) { }

    ngOnInit() {
        this.collectionItem = this.data.collectionItem;
    }

    sendInvitations() {
        const tokens: EmailToken[] = [];

        const emails = this.form.get('email').value;

        const emailArray = emails.split(',');
        for (const e of emailArray) {
            // For each email, update the tracking-user db
            this.trackingUserService.upsert(
                {
                    collectionId: this.collectionItem.id,
                    email: e,
                    isRegistered: true
                }
            ).then(t => tokens.push({email: e, token: t}));
        }

        // TODO: Cloud Function: array of tracking users, subject line, message
        const subject = this.form.get('subject').value;
        const message = this.form.get('message').value;
        console.log('subject', subject);
        console.log('message', message);
        // sendEmailsFunc(tokens, subject, message);

        // TODO: when all is done, send message via snackbar
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
