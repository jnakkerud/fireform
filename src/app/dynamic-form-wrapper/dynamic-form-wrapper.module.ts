import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularFireStorageModule } from '@angular/fire/storage';

import { AngularMaterialModule } from '../angular-material.module';
import { DynamicFormLibModule, ImageService } from 'dynamic-form-lib';

import { DownloadImageService } from './download-image.service';
import { DynamicFormWrapperComponent } from './dynamic-form-wrapper.component';
import { ConvertorFactoryService } from './convertor-factory.service';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
@NgModule({
    imports: [
        AngularMaterialModule,
        ReactiveFormsModule,
        DynamicFormLibModule,
        AngularFireStorageModule,
        RouterModule,
        CommonModule],
    exports: [DynamicFormWrapperComponent, DynamicTableComponent],
    declarations: [DynamicFormWrapperComponent, DynamicTableComponent],
    providers: [
        {provide: ImageService, useClass: DownloadImageService}, 
        ConvertorFactoryService]
  })
export class DynamicFormWrapperModule {}