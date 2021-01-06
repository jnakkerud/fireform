import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormControlModel } from '../../models/dynamic-form-control.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dynamic-datepicker',
  templateUrl: 'dynamic-datepicker.component.html'
})
export class DynamicDatepickerComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() model: DynamicFormControlModel;

  @HostBinding('class') elementClass;

  public ngOnInit() {
    this.elementClass = this.model.gridItemClass;
  }

}
