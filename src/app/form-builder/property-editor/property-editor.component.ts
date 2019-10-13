import { Component } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import { FormField } from '../form-builder.component';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'property-editor',
    templateUrl: 'property-editor.component.html',
    styleUrls: ['./property-editor.component.scss']
})
export class PropertyEditorComponent {

    formField: FormField;
    formGroup: FormGroup;

    editorEnabled = false;

    constructor(private formBuilder: FormBuilder) { }

    onFormField(formField: FormField) {
        if (formField) {
            this.editorEnabled = true;
            this.formField = formField;
            // this.formField.model[0].placeholder = 'Placeholder created';
            this.createForm(formField);
        }
    }

    private createForm(formField: FormField) {
        // form builder, label and placeholder
        const ff: {[k: string]: any} = {};

        ff.label = [formField.model[0].label];
        ff.placeholder = [formField.model[0].placeholder];

        if (formField.type === 'input') {
            ff.inputType = [formField.model[0].inputType];
        }

        this.formGroup = this.formBuilder.group(ff);

        // add valueChange to each control
        Object.keys(this.formGroup.controls).forEach(key => {
            this.subscribeValueChange(this.formGroup.controls[key], key);
        });
    }

    private subscribeValueChange(control: AbstractControl, key: string) {
        // TODO unsubscribe ??
        control.valueChanges.subscribe(val => {
            this.formField.model[0][key] = val;
        });
    }
}
