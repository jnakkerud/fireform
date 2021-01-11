import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material.module';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionSettingsComponent } from './collection-settings/collection-settings.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { DeleteConfirmationDialogComponent } from './edit-collection/delete-confirmation-dialog.component';
import { FormBuilderModule } from '../form-builder/form-builder.component';
import { GenerateLinkModule } from '../generate-link/generate-link.component';
import { SendInvitationModule } from '../send-invitation/send-invitation.component';
import { CollectionsRoutingModule } from './collections-routing.module';
import { DynamicFormLibModule } from 'dynamic-form-lib';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        FormBuilderModule,
        CollectionsRoutingModule,
        DynamicFormLibModule,
        GenerateLinkModule,
        SendInvitationModule,
        AngularMaterialModule],
    exports: [
        CollectionListComponent,
        CollectionSettingsComponent,
        CreateCollectionComponent,
        EditCollectionComponent,
        DeleteConfirmationDialogComponent],
    declarations: [
        CollectionListComponent,
        CollectionSettingsComponent,
        CreateCollectionComponent,
        EditCollectionComponent,
        DeleteConfirmationDialogComponent],
})
export class CollectionsModule {}
