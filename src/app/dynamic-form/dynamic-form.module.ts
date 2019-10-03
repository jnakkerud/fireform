import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicControlDirective } from './directives/dynamic-control/dynamic-control.directive';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';

import { DynamicDatepickerComponent } from './components/dynamic-datepicker/dynamic-datepicker.component';
import { DynamicInputComponent } from './components/dynamic-input/dynamic-input.component';

import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicControlDirective,
    DynamicFormComponent,
    DynamicDatepickerComponent,
    DynamicInputComponent
  ],
  exports: [
    DynamicFormComponent
  ],
  entryComponents: [
    DynamicDatepickerComponent,
    DynamicInputComponent
  ]
})
export class DynamicFormModule {

}
