import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// TODO needed ?
import { HttpClientModule } from '@angular/common/http';

import { DynamicControlDirective } from './directives/dynamic-control/dynamic-control.directive';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';

import { DynamicDatepickerComponent } from './components/dynamic-datepicker/dynamic-datepicker.component';
import { DynamicInputComponent } from './components/dynamic-input/dynamic-input.component';
import { DynamicTextareaComponent } from './components/dynamic-textarea/dynamic-textarea.component';
import { DynamicCheckboxGroupComponent } from './components/dynamic-checkbox-group/dynamic-checkbox-group.component';
import { DynamicRadioGroupComponent } from './components/dynamic-radio-group/dynamic-radio-group.component';
import { DynamicSelectComponent } from './components/dynamic-select/dynamic-select.component';
import { DynamicSlideToggleComponent } from './components/dynamic-slide-toggle/dynamic-slide-toggle.component';
import { DynamicLabelComponent } from './components/dynamic-label/dynamic-label.component';
import { DynamicImageComponent } from './components/dynamic-image/dynamic-image.component';
import { DynamicLocationComponent } from './components/dynamic-location/dynamic-location.component';

import { ImageService } from './components/dynamic-image/image.service';

import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    DynamicControlDirective,
    DynamicFormComponent,
    DynamicDatepickerComponent,
    DynamicTextareaComponent,
    DynamicInputComponent,
    DynamicCheckboxGroupComponent,
    DynamicRadioGroupComponent,
    DynamicSelectComponent,
    DynamicSlideToggleComponent,
    DynamicLabelComponent,
    DynamicImageComponent,
    DynamicLocationComponent
  ],
  exports: [
    DynamicFormComponent
  ],
  providers: [ImageService]
})
export class FireFormLibModule {}
