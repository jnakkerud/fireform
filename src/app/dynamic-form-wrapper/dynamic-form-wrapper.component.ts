import { Component, OnInit, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AngularFireStorageModule } from '@angular/fire/storage';

import { AngularMaterialModule } from '../angular-material.module';
import { DynamicFormService, 
    DynamicFormModel, 
    FireFormLibModule, 
    DynamicFormControlModelConfig,
    ImageService } from 'fireform-lib';

import { DownloadImageService } from './download-image.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ff-form',
    templateUrl: 'dynamic-form-wrapper.component.html',
    styleUrls: ['./dynamic-form-wrapper.component.scss'],
})
export class DynamicFormWrapperComponent implements OnInit {

    public formGroup: FormGroup;
 
    public formModel: DynamicFormModel;

    @Input() modelConfig: DynamicFormControlModelConfig[] | string;

    @Input() title: string;

    constructor(private dynamicFormService: DynamicFormService) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.formModel = this.getFormMetadata();
        this.formGroup = this.dynamicFormService.createGroup(this.formModel);
    }

    onSubmit() {
        // save the document to the collection
        console.log('Before:', this.formGroup.value);

        // TODO convertors
        // DataTransformFactory

        // TODO
        // See https://github.com/jmw5598/angular-generic-crud-service/tree/master/src/app
        // DataService ... generic
    }


    getFormMetadata(): DynamicFormModel {
        return this.dynamicFormService.fromJSON(this.modelConfig);
    }

}

@NgModule({
    imports: [
        AngularMaterialModule,
        ReactiveFormsModule,
        FireFormLibModule,
        AngularFireStorageModule,
        CommonModule],
    exports: [DynamicFormWrapperComponent],
    declarations: [DynamicFormWrapperComponent],
    providers: [{provide: ImageService, useClass: DownloadImageService}]
  })
export class DynamicFormWrapperModule {}
