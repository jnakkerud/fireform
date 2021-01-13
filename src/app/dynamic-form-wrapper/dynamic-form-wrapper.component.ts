import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DataTransformFactory } from './data-transform-factory.service';
import { FireStoreFormService, DataPath } from './firestore-form.service';

import { DynamicFormService, 
    DynamicFormModel, 
    DynamicFormControlModelConfig } from 'dynamic-form-lib';

function isString(value: any): value is string {
    return typeof value === 'string';
}
@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ff-form',
    templateUrl: 'dynamic-form-wrapper.component.html',
    styleUrls: ['./dynamic-form-wrapper.component.scss'],
    providers: [DataTransformFactory, FireStoreFormService]
})
export class DynamicFormWrapperComponent implements OnInit {

    public formGroup: FormGroup;
 
    public formModel: DynamicFormModel;

    @Input() modelConfig: DynamicFormControlModelConfig[] | string;

    @Input() title: string;

    @Input() dataPath: DataPath | string;

    constructor(
        private dynamicFormService: DynamicFormService, 
        private fireStoreFormService: FireStoreFormService,
        private dataTransform: DataTransformFactory) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.formModel = this.getFormMetadata();
        this.formGroup = this.dynamicFormService.createGroup(this.formModel);
    }

    // TODO OnChanges on dataPath.  If data path contains id then get from fireStoreFormService
    // and formGroup.patch the data
    // Test ID: 60sGMd1ZxSWhUxXE8ZRS

    onSubmit() {
        // save the document to the collection
        console.log('Before:', this.formGroup.value);

        const data = this.dataTransform.transform(this.formGroup.value, this.formModel);

        console.log('After:', data);

        this.fireStoreFormService.upsert(isString(this.dataPath) ? new DataPath(this.dataPath as string) : this.dataPath, data).then(dp => {
            // TODO fireevent: afterSubmit
            console.log(dp);
        });
    }

    getFormMetadata(): DynamicFormModel {
        return this.dynamicFormService.fromJSON(this.modelConfig);
    }

}

