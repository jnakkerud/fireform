import { Component, Inject } from '@angular/core';
import { DYNAMIC_FORM_WRAPPER_CONFIG, DynamicFormWrapperConfig } from 'src/app/dynamic-form-wrapper/dynamic-form-wrapper-config';
@Component({
    // tslint:disable-next-line: component-selector
    selector: 'dynamic-form-test',
    templateUrl: 'dynamic-form-test.component.html'
})
export class DynamicFormTestComponent {

    constructor(@Inject(DYNAMIC_FORM_WRAPPER_CONFIG) public config: DynamicFormWrapperConfig) {}
  
}

