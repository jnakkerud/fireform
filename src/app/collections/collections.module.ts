// TODO create a Collections module that contains collection-settings, edit-collection and create-collection, place under this directory
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from '../angular-material.module';
import { CollectionListComponent } from './collection-list/collection-list.component';


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        BrowserAnimationsModule,
        AngularMaterialModule],
    exports: [CollectionListComponent],
    declarations: [CollectionListComponent],
})
export class CollectionsModule {}
