import { Component, Input } from '@angular/core';

import { FormField } from '../form-builder.component';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'form-field-snippit',
    templateUrl: 'form-field-snippit.component.html',
    styleUrls: ['./form-field-snippit.component.scss']
})

export class FormFieldSnippitComponent {

    @Input() formField: FormField;

}
