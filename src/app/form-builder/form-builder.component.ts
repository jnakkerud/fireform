import { Component, NgModule, Input, ViewChildren, QueryList, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DragDropModule, CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';

import { AngularMaterialModule } from '../angular-material.module';
import { FormFieldSnippetComponent } from './form-field-snippet/form-field-snippet.component';
import { DynamicFormControlModelConfig, DynamicFormControlModel } from '../dynamic-form/models/dynamic-form-control.model';
import { DynamicFormModel } from '../dynamic-form/models/dynamic-form.model';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { PropertyEditorComponent } from './property-editor/property-editor.component';
import { CollectionItem } from '../core/collection-service/collection.service';
import { OptionEditorModule } from '../option-editor/option-editor.component';

export interface FormConfig {
    config: DynamicFormControlModelConfig;
    name?: string;
}

export class FormField {
    type: string;
    name: string;
    model: DynamicFormModel;

    constructor(formConfig: FormConfig) {
        this.name = formConfig.name;
        this.type = formConfig.config.type;
        this.model = [new DynamicFormControlModel(formConfig.config)];
    }

    get resolveModel(): DynamicFormControlModel {
        // resolve and validate the model
        const m = this.model[0];
        if (!m.id) {
            const label = m.label;
            m.id = label ? label.split(' ').join('_').toLowerCase() : Math.random().toString(36).substr(2, 9);
        }
        return m;
    }
}

/** Clamps a number between zero and a maximum. */
function clamp(value: number, max: number): number {
    return Math.max(0, Math.min(max, value));
}

function clone(formField: FormField): FormField {
    const result = new FormField(
        { config:
            {
                type: formField.type,
                id: '',
                label: `${formField.name} Label`
            }
        }
    );
    result.name = formField.name;
    return result;
}

const FORM_CONTROLS: FormConfig[] = [
    {
        name: 'Input',
        config:
            {
                type: 'input',
            }
    },
    {
        name: 'TextArea',
        config:
            {
                type: 'textarea',
            }

    },
    {
        name: 'Date',
        config:
            {
                type: 'date',
            }
    },
    {
        name: 'Checkbox Group',
        config:
            {
                type: 'checkboxgroup',
            }
    },
    {
        name: 'Radio Group',
        config:
            {
                type: 'radiogroup',
            }
    },
    {
        name: 'Select',
        config:
            {
                type: 'select',
            }
    },
    {
        name: 'Slide Toggle',
        config:
            {
                type: 'toggle',
            }
    },
    {
        name: 'Label',
        config:
            {
                type: 'label',
            }
    }
];

@Component({
    selector: 'app-form-builder',
    templateUrl: 'form-builder.component.html',
    styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements AfterViewInit, OnDestroy {

    @Input() selectedIndex = -1;

    @Input()
    get collectionItem(): CollectionItem {
        return this.item;
    }
    set collectionItem(value: CollectionItem) {
        this.formFields = [];
        this.item = value;
        if (this.item && this.item.form) {
            this.formFields = this.fromJson(this.item.form);
            this.selectedIndex = 0;
        }
    }

    public formFields: FormField[] = [];

    private item: CollectionItem;

    private subscription: Subscription;

    private formControls: FormField[];
    get controls(): FormField[] {
        if (!this.formControls) {
            this.formControls = [];
            for (const fc of FORM_CONTROLS) {
                this.formControls.push(new FormField(fc));
            }
        }
        return this.formControls;
    }

    @ViewChildren(FormFieldSnippetComponent) fieldSnippets !: QueryList<FormFieldSnippetComponent>;

    @ViewChild(PropertyEditorComponent) propertyEditor !: PropertyEditorComponent;

    ngAfterViewInit(): void {
        this.subscription = this.fieldSnippets.changes.subscribe(e => {
            this.selectField();
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    drop(event: CdkDragDrop<FormField[]>) {
        if (event.previousContainer === event.container) {
            this.selectedIndex = event.currentIndex;
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else if (event.previousContainer.id === 'control-list') {
            this.selectedIndex = event.currentIndex;
            // clone and copy the model
            const ff = event.previousContainer.data[event.previousIndex];
            event.previousContainer.data[event.previousIndex] = clone(ff);

            copyArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        } else {
            // just remove from form field list
            this.selectedIndex = -1;
            const currentArray = event.previousContainer.data;
            const from = clamp(event.previousIndex, currentArray.length - 1);
            currentArray.splice(from, 1);
        }
    }

    toJson(): string {
        const model = [];

        for (const ff of this.formFields) {
            model.push(ff.resolveModel);
        }

        const formJson = JSON.stringify(model, (key, value) => {
            // Filtering out null properties
            if (value === null) {
                return undefined;
            }
            return value;
        });
        return formJson;
    }

    fromJson(fromJson: string): FormField[] {
        const fields: FormField[] = [];
        const model: DynamicFormControlModelConfig[] = JSON.parse(fromJson);
        for (const ff of model) {
            fields.push(new FormField({config: ff}));
        }
        return fields;
    }

    handleClick(index: number) {
        this.selectedIndex = index;
        this.selectField();
    }

    private selectField() {
        if (this.selectedIndex >= 0 && this.fieldSnippets.length > 0) {
            Promise.resolve(null).then(() => this.propertyEditor.onFormField(this.fieldSnippets.toArray()[this.selectedIndex].formField));
        } else if (this.fieldSnippets.length === 0 || this.selectedIndex === -1) {
            // clear the property editor
            this.propertyEditor.formField = null;
        }
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
    exports: [FormBuilderComponent, FormFieldSnippetComponent, PropertyEditorComponent],
    declarations: [FormBuilderComponent, FormFieldSnippetComponent, PropertyEditorComponent],
  })
  export class FormBuilderModule {}
