import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DragDropModule, CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';

import { AngularMaterialModule } from '../angular-material.module';
import { FormFieldSnippitComponent } from './form-field-snippit/form-field-snippit.component';
import { DynamicFormControlModel } from '../dynamic-form/models/dynamic-form-control.model';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { PropertyEditorComponent } from './property-editor/property-editor.component';
import { CollectionItem } from '../core/collection-service/collection.service';
import { OptionEditorModule } from '../option-editor/option-editor.component';

/** Clamps a number between zero and a maximum. */
function clamp(value: number, max: number): number {
    return Math.max(0, Math.min(max, value));
}

function clone(formField: FormField): FormField {
    return {
        type: formField.type,
        name: formField.name,
        model: [
            {
                type: formField.model[0].type,
                id: formField.model[0].id,
                label: `${formField.name} Label`
            }
        ]
    };
}

export interface FormField {
    type: string;
    name: string;
    model: DynamicFormControlModel[];
}

const FORM_CONTROLS: FormField[] = [
    {
        type: 'input',
        name: 'Input',
        model: [
            {
                type: 'input',
                id: 'input',
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
            }
        ]
    },
    {
        type: 'checkboxgroup',
        name: 'Checkbox Group',
        model: [
            {
                type: 'checkboxgroup',
                id: 'checkboxgroup',
            }
        ]
    },
    {
        type: 'radiogroup',
        name: 'Radio Group',
        model: [
            {
                type: 'radiogroup',
                id: 'radiogroup',
            }
        ]
    }
];

@Component({
    selector: 'app-form-builder',
    templateUrl: 'form-builder.component.html',
    styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent {

    @Input()
    get collectionItem(): CollectionItem {
        return this.item;
    }
    set collectionItem(value: CollectionItem) {
        this.formFields = [];
        this.item = value;
        if (this.item && this.item.form) {
            this.formFields = this.fromJson(this.item.form);
        }
    }
    private item: CollectionItem;

    private formFields: FormField[] = [];

    get controls(): FormField[] {
        return FORM_CONTROLS;
    }

    drop(event: CdkDragDrop<FormField[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else if (event.previousContainer.id === 'control-list') {
            // clone and copy the model
            const ff = event.previousContainer.data[event.previousIndex];
            event.previousContainer.data[event.previousIndex] = clone(ff);

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

    toJson(): string {
        const model = [];

        for (const ff of this.formFields) {
            // Generate an ID for the form
            const label = ff.model[0].label;
            ff.model[0].id = label ? label.split(' ').join('_').toLowerCase() : Math.random().toString(36).substr(2, 9);
            model.push(ff.model[0]);
        }

        const formJson = JSON.stringify(model);
        console.log(formJson);
        return formJson;
    }

    fromJson(formJson: string): FormField[] {
        const fields: FormField[] = [];
        const model: DynamicFormControlModel[] = JSON.parse(formJson);
        console.log(model);
        for (const ff of model) {
            fields.push({
                type: ff.type,
                name: '',
                model: [ff]
            });
        }
        return fields;
    }
}

@NgModule({
    imports: [
        AngularMaterialModule,
        DragDropModule,
        DynamicFormModule,
        ReactiveFormsModule,
        OptionEditorModule,
        CommonModule],
    exports: [FormBuilderComponent, FormFieldSnippitComponent, PropertyEditorComponent],
    declarations: [FormBuilderComponent, FormFieldSnippitComponent, PropertyEditorComponent],
  })
  export class FormBuilderModule {}
