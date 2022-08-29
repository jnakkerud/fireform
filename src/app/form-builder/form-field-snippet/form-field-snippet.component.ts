import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { UntypedFormGroup } from '@angular/forms';

import { FormField } from '../form-builder.component';
import { DynamicFormService } from 'dynamic-form-lib';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'form-field-snippet',
    templateUrl: 'form-field-snippet.component.html',
    styleUrls: ['./form-field-snippet.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FormFieldSnippetComponent implements OnInit {

    @Input() formField: FormField;

    public formGroup: UntypedFormGroup;

    constructor(private dynamicFormService: DynamicFormService) { }

    ngOnInit() {
        Promise.resolve(null).then(() => this.formGroup = this.dynamicFormService.createGroup(this.formField.model));
    }

}
