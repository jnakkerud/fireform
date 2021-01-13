import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireStorageModule } from '@angular/fire/storage';

import { AngularMaterialModule } from '../angular-material.module';
import { DynamicFormLibModule, ImageService } from 'dynamic-form-lib';

import { DownloadImageService } from './download-image.service';
import { DynamicFormWrapperComponent } from './dynamic-form-wrapper.component';
import { ConvertorFactoryService } from './convertor-factory.service';
@NgModule({
    imports: [
        AngularMaterialModule,
        ReactiveFormsModule,
        DynamicFormLibModule,
        AngularFireStorageModule,
        CommonModule],
    exports: [DynamicFormWrapperComponent],
    declarations: [DynamicFormWrapperComponent],
    providers: [
        {provide: ImageService, useClass: DownloadImageService}, 
        ConvertorFactoryService]
  })
export class DynamicFormWrapperModule {}