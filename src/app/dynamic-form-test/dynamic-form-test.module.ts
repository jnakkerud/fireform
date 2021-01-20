import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { DYNAMIC_FORM_WRAPPER_CONFIG } from '../dynamic-form-wrapper/dynamic-form-wrapper-config';
import { DynamicFormWrapperModule } from '../dynamic-form-wrapper/dynamic-form-wrapper.module';

import { DynamicFormTestComponent } from './form/dynamic-form-test.component';
import { DynamicTableTestComponent } from './table/dynamic-table-test.component';
import { TEST_CONFIG } from './test-config';
@NgModule({
    imports: [
        AngularMaterialModule,
        DynamicFormWrapperModule,
        FormsModule,
        CommonModule],
    exports: [DynamicFormTestComponent, DynamicTableTestComponent],
    declarations: [DynamicFormTestComponent, DynamicTableTestComponent],
    providers: [{
        provide: DYNAMIC_FORM_WRAPPER_CONFIG,
        useValue: TEST_CONFIG
      }]
  })
export class DynamicFormTestModule {}