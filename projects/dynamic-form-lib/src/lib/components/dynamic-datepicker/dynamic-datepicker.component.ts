import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { DynamicFormControlModel } from '../../models/dynamic-form-control.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'dynamic-datepicker',
  templateUrl: 'dynamic-datepicker.component.html'
})
export class DynamicDatepickerComponent implements OnInit {

  @Input() formGroup: UntypedFormGroup;
  @Input() model: DynamicFormControlModel;

  @HostBinding('class') elementClass;

  public ngOnInit() {
    this.elementClass = this.model.gridItemClass;
  }

}
