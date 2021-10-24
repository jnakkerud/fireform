import { Component, Input, KeyValueDiffers, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { filter, map, tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { MatExpansionPanel } from '@angular/material/expansion';

import { GradeResponse } from 'src/app/core/collection-service/collection.service';
import { FormField } from '../form-builder.component';
import { FormBuilderStore, GradeEditor } from '../form-builder-store.service';

type FieldType = 'text' | 'options' | 'boolean';

interface Option {
    value?: string;
    point?: number;
    label?: string;
}

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'grade-editor',
    templateUrl: 'grade-editor.component.html',
    styleUrls: ['./grade-editor.component.scss']
})
export class GradeEditorComponent implements OnChanges, GradeEditor {

    @Input() formField: FormField;

    @Input() formGroup: FormGroup;

    group: FormGroup;

    gradeResponse: GradeResponse;

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

    @ViewChild('expansionPanel') expansionPanel !: MatExpansionPanel;

    constructor(private formBuilder: FormBuilder, private kvDiffers: KeyValueDiffers, private formBuilderStore: FormBuilderStore) { }

    // Called on initial load and when the formField value changes like label or value
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('formField')) {
            this.formBuilderStore.bindGradeEditor(this);
            this.group = null;
            if (this.expansionPanel && this.expansionPanel.expanded) {
                this.expansionPanel.close();
            }
        }
    }

    // When the expansion panel opens create the form
    onOpen() {
        if (!this.group) {
            this.createForm();
        }
    }

    createForm() {
        this.gradeResponse = this.formBuilderStore.getGradeResponse();
        const points = this.gradeResponse.points;

        if (this.fieldType === 'options') {
            // create a array of form groups
            const model = this.formField.model[0];

            const formGroups: FormGroup[] = [];
            for (const option of model.options) {
                const pt = points.find(point => point.value === option.value);
                formGroups.push(this.formBuilder.group({
                    label: [option.label],
                    value: [option.value],
                    point: [pt ? pt.point : '']
                }));
            }

            this.group = this.formBuilder.group({
                options: this.formBuilder.array(formGroups)
            });

            // Create the differ to listen for changes to the options control of {label, value}
            const optionsControl = this.formGroup.get('options');
            const arrayDiffer = this.kvDiffers.find(optionsControl.value).create<string, string>();

            // !! Need to do a diff here to seed the differ,
            // as first diff will compare against an empty object
            arrayDiffer.diff(optionsControl.value);

            // Listen to the formfield changes to the options and update the grade editor
            // to reflect the new changes, i.e. if an option is removed, then remove from the
            // grade editor
            optionsControl.valueChanges.subscribe(() => {
                const diff = arrayDiffer.diff(optionsControl.value);
                if (diff) {
                    diff.forEachAddedItem(() => {
                        this.options.push(this.formBuilder.group({
                            label: [''],
                            value: [''],
                            point: ['']
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
        } else {
            this.group = this.formBuilder.group({
                value: [points[0].value],
                point: [points[0].point]
            });
        }
    }

    isDirty(): boolean {
        if (this.group) {
            return this.group.dirty;
        }
        return false;
    }

    // Return an updated grade response
    updatedGradeResponse(): Promise<GradeResponse> {
        return new Promise<GradeResponse>(resolve => {
            const val = this.group.value;
            if (val.hasOwnProperty('options')) {
                this.gradeResponse.points = [];
                const options = from(val.options) as Observable<Option>;
                options.pipe(
                    filter(option => (typeof option.point === 'number') && (option.point > 0)),
                    map(option => ({value: option.value, point: option.point})),
                    tap(v =>  this.gradeResponse.points.push(v))
                ).subscribe(() => resolve(this.gradeResponse));

            } else {
                this.gradeResponse.points[0] = val;
                resolve(this.gradeResponse);
            }
        });
    }
}
