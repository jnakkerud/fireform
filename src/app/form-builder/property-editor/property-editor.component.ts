import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { FormField } from '../form-builder.component';
import { DynamicFormModel } from 'dynamic-form-lib';
import { CollectionItem } from 'src/app/core/collection-service/collection.service';
import { StorageLocationService } from 'src/app/core/storage-service/storage-location.service';
import { PropertyEditor, FormBuilderStore } from '../form-builder-store.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'property-editor',
    templateUrl: 'property-editor.component.html',
    styleUrls: ['./property-editor.component.scss'],
    providers: [StorageLocationService]
})
export class PropertyEditorComponent implements OnDestroy, PropertyEditor {

    formGroup: FormGroup;

    // tslint:disable-next-line: variable-name
    private _formField: FormField;
    get formField(): FormField {
        return this._formField;
    }
    set formField(ff: FormField | null) {
        this.unsubscribe();
        this.formGroup = null;
        this._formField = ff;
    }

    subscriptions: Subscription[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private storageLocation: StorageLocationService,
        private formBuilderStore: FormBuilderStore) { }

    ngOnDestroy() {
        this.unsubscribe();
    }

    bindEditor(field: FormField, collectionItem: CollectionItem) {
        this.storageLocation.path = collectionItem.id;
        this.formField = field;
        this.formBuilderStore.bindPropertyEditor(this);
        this.createForm(field.model);
    }

    isDirty(): boolean {
        if (this.formGroup) {
            return this.formGroup.dirty;
        }
        return false;
    }

    private createForm(model: DynamicFormModel) {

        // form builder, label and placeholder
        const ff: {[k: string]: any} = {};

        const type = model[0].type;
        ff.label = [model[0].label];
        ff.placeholder = [model[0].placeholder];
        ff.required = [model[0].required];

        if (type === 'input') {
            ff.inputType = [model[0].inputType];
        }

        if (type === 'image') {
            ff.fileName = [model[0].fileName];
        }

        if (type === 'checkboxgroup' || type === 'radiogroup' || type === 'select') {

            // seed initial option if needed
            if (!model[0].options) {
                model[0].options = [
                    { label: 'Label', value: 'value' }
                ];
            }

            // create a array of formgroups
            const formGroups: FormGroup[] = [];
            for (const cfg of model[0].options) {
                formGroups.push(this.formBuilder.group(cfg));
            }

            ff.options = this.formBuilder.array(formGroups);
        }

        this.formGroup = this.formBuilder.group(ff);

        // add valueChange to each control
        Object.keys(this.formGroup.controls).forEach(key => {
            this.subscribeValueChange(this.formGroup.controls[key], key);
        });
    }

    private subscribeValueChange(control: AbstractControl, key: string) {
        this.subscriptions.push(control.valueChanges.subscribe(val => { this.formField.model[0][key] = val; }));
    }

    private unsubscribe() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }
}
