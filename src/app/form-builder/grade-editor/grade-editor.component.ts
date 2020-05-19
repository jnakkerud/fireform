import { Component, OnInit, Input, KeyValueDiffers } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { CollectionItem, GradeResponse } from 'src/app/core/collection-service/collection.service';
import { FormField } from '../form-builder.component';

type FieldType = 'text' | 'options' | 'boolean';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'grade-editor',
    templateUrl: 'grade-editor.component.html',
    styleUrls: ['./grade-editor.component.scss']
})
export class GradeEditorComponent {

    @Input() formField: FormField;

    @Input() formGroup: FormGroup;

    @Input() collectionItem: CollectionItem;

    group: FormGroup;

    get fieldType(): FieldType {
        switch ( this.formField.type) {
            case 'input':
            case 'textarea':
                return 'text';
            case 'checkboxgroup':
            case 'radiogroup':
            case 'select':
                return 'options';
            case 'toggle':
                return 'boolean';
        }
    }

    get options(): FormArray {
        return this.group.get('options') as FormArray;
    }

    // tslint:disable-next-line: variable-name
    private _gradeResponse: GradeResponse;
    get gradeResponse(): GradeResponse {
        if (!this._gradeResponse) {
            this._gradeResponse = {
                field: this.formField.fieldId,
                points: []
            };
        }
        return this._gradeResponse;
    }
    set gradeResponse(gradeResponse: GradeResponse) {
        this._gradeResponse = gradeResponse;
    }

    constructor(private formBuilder: FormBuilder, private kvDiffers: KeyValueDiffers) { }

    onOpen() {
        if (!this.group) {
            if (this.collectionItem?.gradeResponse) {
                this.gradeResponse = this.collectionItem.gradeResponse.find(gr => gr.field === this.formField.fieldId);
            }
            this.createForm();
        }
    }

    // TODO refactor for better readability ?
    createForm() {

        // TODO seed the empty array
        const points = this.gradeResponse.points;

        if (this.fieldType === 'text') {
            this.group = this.formBuilder.group({
                matchValue: [''],
                points: ['']
            });
        } else if (this.fieldType === 'boolean') {
            // points[0] = {value: true};
            this.group = this.formBuilder.group({
                matchValue: ['true'],
                points: ['']
            });
        } else if (this.fieldType === 'options') {
            // create a array of form groups
            const model = this.formField.model[0];

            const formGroups: FormGroup[] = [];
            for (const cfg of model.options) {
                formGroups.push(this.formBuilder.group({
                    label: [cfg.label],
                    value: [cfg.value],
                    points: ['']
                }));
            }

            this.group = this.formBuilder.group({
                options: this.formBuilder.array(formGroups)
            });

            // Listen for changes to the options array of {label, value}
            const optionsControl = this.formGroup.get('options');
            // console.log('optionsControl', optionsControl.value)
            const arrayDiffer = this.kvDiffers.find(optionsControl.value).create<string, string>();
            // TODO Not sure why have to do this hack !!
            arrayDiffer.diff(optionsControl.value);

            optionsControl.valueChanges.subscribe(optionsArray => {
                const diff = arrayDiffer.diff(optionsControl.value);
                if (diff) {
                    diff.forEachAddedItem((record) => {
                        this.options.push(this.formBuilder.group({
                            label: [''],
                            value: [''],
                            points: ['']
                        }));
                    });
                    diff.forEachRemovedItem(record => {
                        this.options.removeAt(Number(record.key));
                    });
                    diff.forEachChangedItem(record => {
                        this.options.at(Number(record.key)).patchValue(record.currentValue);
                    });
                }
            });

        }

    }

}
