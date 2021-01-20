import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { DynamicFormWrapperModule } from '../dynamic-form-wrapper/dynamic-form-wrapper.module';

import { DynamicFormTestComponent } from './form/dynamic-form-test.component';
import { DynamicTableTestComponent } from './table/dynamic-table-test.component';


@NgModule({
    imports: [
        AngularMaterialModule,
        DynamicFormWrapperModule,
        FormsModule,
        CommonModule],
    exports: [DynamicFormTestComponent, DynamicTableTestComponent],
    declarations: [DynamicFormTestComponent, DynamicTableTestComponent],
  })
export class DynamicFormTestModule {}