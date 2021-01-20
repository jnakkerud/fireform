import { Component, Inject } from '@angular/core';
import { DynamicFormControlModelConfig } from 'dynamic-form-lib';
import { DYNAMIC_FORM_WRAPPER_CONFIG, DynamicFormWrapperConfig } from 'src/app/dynamic-form-wrapper/dynamic-form-wrapper-config';
@Component({    // tslint:disable-next-line: component-selector
    selector: 'dynamic-table-test',
    templateUrl: 'dynamic-table-test.component.html',
    styleUrls: ['./dynamic-table-test.component.scss']
})
export class DynamicTableTestComponent {

    constructor(@Inject(DYNAMIC_FORM_WRAPPER_CONFIG) public config: DynamicFormWrapperConfig) {}

}

