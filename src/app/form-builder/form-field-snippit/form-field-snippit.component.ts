import { Component, Input, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';

import { FormField } from '../form-builder.component';
import { DynamicFormService } from '../../dynamic-form/services/dynamic-form.service';
import { DynamicFormModel } from '../../dynamic-form/models/dynamic-form.model';
import { DynamicFormControlModel } from '../../dynamic-form/models/dynamic-form-control.model';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'form-field-snippit',
    templateUrl: 'form-field-snippit.component.html',
    styleUrls: ['./form-field-snippit.component.scss']
})

export class FormFieldSnippitComponent implements OnInit {

    @Input() formField: FormField;

    public formGroup: FormGroup;
    public formModel: DynamicFormModel;

    constructor(private dynamicFormService: DynamicFormService) { }

    ngOnInit() {
        this.formModel = this.coerceModel(this.formField.model);
        this.formGroup = this.dynamicFormService.createGroup(this.formModel);
    }

    coerceModel(dynamicFormControlModel: DynamicFormControlModel[]): DynamicFormModel | never {
        const formModel: DynamicFormModel = [];
        dynamicFormControlModel.forEach((model: any) => {
          formModel.push(new DynamicFormControlModel(model));
        });
        return formModel;
    }
}
