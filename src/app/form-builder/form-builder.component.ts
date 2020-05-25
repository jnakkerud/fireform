import {
    Component,
    NgModule,
    Input,
    ViewChildren,
    QueryList,
    AfterViewInit,
    OnDestroy,
    ViewChild,
    OnChanges,
    SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DragDropModule, CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';

import { AngularMaterialModule } from '../angular-material.module';
import { FormFieldSnippetComponent } from './form-field-snippet/form-field-snippet.component';
import { DynamicFormControlModelConfig, DynamicFormControlModel } from '../dynamic-form/models/dynamic-form-control.model';
import { DynamicFormModel } from '../dynamic-form/models/dynamic-form.model';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { PropertyEditorComponent } from './property-editor/property-editor.component';
import { CollectionItem } from '../core/collection-service/collection.service';
import { OptionEditorComponent } from './option-editor/option-editor.component';
import { ImageInputComponent } from './image-input/image-input.component';
import { GradeEditorComponent } from './grade-editor/grade-editor.component';
import { FormBuilderStore } from './form-builder-store.service';

export interface FormConfig {
    config: DynamicFormControlModelConfig;
    name?: string;
}

export class FormField {
    type: string;
    name: string;
    fieldId: string;
    model: DynamicFormModel;

    constructor(formConfig: FormConfig) {
        this.name = formConfig.name;
        this.type = formConfig.config.type;
        this.model = [new DynamicFormControlModel(formConfig.config)];
        this.fieldId = this.model[0].id ? this.model[0].id : '_' + Math.random().toString(36).substr(2, 9);
    }
}

// Clamps a number between zero and a maximum.
function clamp(value: number, max: number): number {
    return Math.max(0, Math.min(max, value));
}

function clone(formField: FormField): FormField {
    const result = new FormField(
        { config:
            {
                type: formField.type,
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
    },
    {
        name: 'Image',
        config:
            {
                type: 'image',
            }
    }
];

@Component({
    selector: 'app-form-builder',
    templateUrl: 'form-builder.component.html',
    styleUrls: ['./form-builder.component.scss'],
    providers: [FormBuilderStore]
})
export class FormBuilderComponent implements AfterViewInit, OnDestroy, OnChanges {

    @Input() selectedIndex = -1;

    @Input() collectionItem: CollectionItem;

    formFields: FormField[] = [];

    private destroyed = new Subject<void>();

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

    constructor(private formBuilderStore: FormBuilderStore) { }

    ngAfterViewInit(): void {
        this.fieldSnippets.changes.pipe(takeUntil(this.destroyed)).subscribe(e => {
            this.selectField();
        });
    }

    ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.hasOwnProperty('collectionItem')) {
            const collectionItemChange = changes.collectionItem;
            if (collectionItemChange.currentValue !== collectionItemChange.previousValue) {
                this.formBuilderStore.setCollectionItem(collectionItemChange.currentValue);
                this.propertyEditor.formField = null;
                this.formFields = [];
                this.initializeFormFields();
                this.formBuilderStore.setFormFields(this.formFields);
            }
        }
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
            Promise.resolve(null).then(() => {
                this.propertyEditor.bindEditor(this.fieldSnippets.toArray()[this.selectedIndex].formField, this.collectionItem);
            });
        } else if (this.fieldSnippets.length === 0 || this.selectedIndex === -1) {
            // clear the property editor
            this.propertyEditor.formField = null;
        }
    }

    private initializeFormFields() {
        if (this.collectionItem && this.collectionItem.form) {
            this.formFields = this.fromJson(this.collectionItem.form);
            this.selectedIndex = 0;
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
    exports: [FormBuilderComponent,
        FormFieldSnippetComponent,
        PropertyEditorComponent,
        GradeEditorComponent,
        OptionEditorComponent,
        ImageInputComponent],
    declarations: [FormBuilderComponent,
        FormFieldSnippetComponent,
        PropertyEditorComponent,
        GradeEditorComponent,
        OptionEditorComponent,
        ImageInputComponent],
    providers: [FormBuilderStore]
  })
  export class FormBuilderModule {}
