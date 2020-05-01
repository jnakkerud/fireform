import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../angular-material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TrackingUserService } from '../core/tracking-user-service/tracking-user.service';
import { CollectionItem } from '../core/collection-service/collection.service';

export interface SendInvitationData {
    collectionItem: CollectionItem;
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
        const emails = this.form.get('email').value;

        const emailArray = emails.split(',');
        for (const email of emailArray) {
            // For each email, update the tracking-user db
            console.log('email', email);
        }

        // Update should return a TrackingUser object, put in an array

        // TODO: Cloud Function: array of tracking users, subject line, message

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
