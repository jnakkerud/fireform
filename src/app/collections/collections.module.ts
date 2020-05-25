// TODO create a Collections module that contains collection-settings, edit-collection and create-collection, place under this directory
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from '../angular-material.module';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionSettingsComponent } from './collection-settings/collection-settings.component';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        DynamicFormModule,
        AngularMaterialModule],
    exports: [CollectionListComponent, CollectionSettingsComponent],
    declarations: [CollectionListComponent, CollectionSettingsComponent],
})
export class CollectionsModule {}
