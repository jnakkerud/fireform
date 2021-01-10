import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DataTransformFactory } from './data-transform-factory.service';

import { DynamicFormService, 
    DynamicFormModel, 
    DynamicFormControlModelConfig } from 'fireform-lib';
@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ff-form',
    templateUrl: 'dynamic-form-wrapper.component.html',
    styleUrls: ['./dynamic-form-wrapper.component.scss'],
    providers: [DataTransformFactory]
})
export class DynamicFormWrapperComponent implements OnInit {

    public formGroup: FormGroup;
 
    public formModel: DynamicFormModel;

    @Input() modelConfig: DynamicFormControlModelConfig[] | string;

    @Input() title: string;

    constructor(private dynamicFormService: DynamicFormService, private dataTransform: DataTransformFactory) { }

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

        const data = this.dataTransform.transform(this.formGroup.value, this.formModel);

        console.log('After:', data);

        // TODO
        // See https://github.com/jmw5598/angular-generic-crud-service/tree/master/src/app
        // DataService ... generic
    }


    getFormMetadata(): DynamicFormModel {
        return this.dynamicFormService.fromJSON(this.modelConfig);
    }

}

