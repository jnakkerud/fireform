import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'delete-confirmation',
    template: `
    <mat-dialog-content>
	<p>
		{{message}}
    </p>
    <p>
        {{formDataMessage}}
    </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close class="ff-button">{{cancelButtonText}}</button>
        <button mat-button class="ff-button" (click)="onConfirmClick()" cdkFocusInitial>{{confirmButtonText}}</button>
    </mat-dialog-actions>
  `,
})

export class DeleteConfirmationDialogComponent {
    message = 'Are you sure?';
    formDataMessage = 'Remove formdata manually';
    confirmButtonText = 'Yes';
    cancelButtonText = 'Cancel';

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>) {
        if (data) {
            this.message = data.message || this.message;
            this.formDataMessage = data.formDataMessage || this.formDataMessage;
            if (data.buttonText) {
                this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
        }
    }

    onConfirmClick(): void {
        this.dialogRef.close(true);
    }
}
