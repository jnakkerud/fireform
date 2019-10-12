import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DragDropModule, CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';

import { AngularMaterialModule } from '../angular-material.module';
import { FormFieldSnippitComponent } from './form-field-snippit/form-field-snippit.component';
import { DynamicFormControlModel } from '../dynamic-form/models/dynamic-form-control.model';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';

/** Clamps a number between zero and a maximum. */
function clamp(value: number, max: number): number {
    return Math.max(0, Math.min(max, value));
}

export interface FormField {
    type: string;
    name: string;
    model: DynamicFormControlModel[];
}

@Component({
    selector: 'app-form-builder',
    templateUrl: 'form-builder.component.html',
    styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent {

    controls: FormField[] = [
        {
            type: 'input',
            name: 'Input',
            model: [
                {
                    type: 'input',
                    id: 'input',
                    label: 'Input Label'
                }
            ]
        },
        {
            type: 'textarea',
            name: 'TextArea',
            model: [
                {
                    type: 'textarea',
                    id: 'textarea',
                    label: 'TextArea Label'
                }
            ]

        },
        {
            type: 'date',
            name: 'Date',
            model: [
                {
                    type: 'date',
                    id: 'date',
                    label: 'Date Label'
                }
            ]
        }
    ];

    formFields: FormField[] = [];

    drop(event: CdkDragDrop<FormField[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else if (event.previousContainer.id === 'control-list') {
            copyArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        } else {
            // just remove from form field list
            const currentArray = event.previousContainer.data;
            const from = clamp(event.previousIndex, currentArray.length - 1);
            currentArray.splice(from, 1);
        }
    }
}

@NgModule({
    imports: [
        AngularMaterialModule,
        DragDropModule,
        DynamicFormModule,
        ReactiveFormsModule,
        CommonModule],
    exports: [FormBuilderComponent, FormFieldSnippitComponent],
    declarations: [FormBuilderComponent, FormFieldSnippitComponent],
  })
  export class FormBuilderModule {}
