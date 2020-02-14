import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { FormGroup } from '@angular/forms';

import { FormField } from '../form-builder.component';
import { DynamicFormService } from '../../dynamic-form/services/dynamic-form.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'form-field-snippit',
    templateUrl: 'form-field-snippit.component.html',
    styleUrls: ['./form-field-snippit.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FormFieldSnippitComponent implements OnInit {

    @Input() formField: FormField;

    public formGroup: FormGroup;

    constructor(private dynamicFormService: DynamicFormService) { }

    ngOnInit() {
        Promise.resolve(null).then(() => this.formGroup = this.dynamicFormService.createGroup(this.formField.model));
    }

}
