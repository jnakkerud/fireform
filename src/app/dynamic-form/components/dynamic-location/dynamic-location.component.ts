import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormControlCustomEvent, DynamicFormControlModel } from '../../models/dynamic-form-control.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dynamic-location',
  templateUrl: 'dynamic-location.component.html'
})
export class DynamicLocationComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() model: DynamicFormControlModel;

  @Output() customEvent = new EventEmitter<DynamicFormControlCustomEvent>();

  @HostBinding('class') elementClass;

  public ngOnInit() {
    this.elementClass = this.model.gridItemClass;

    // TODO add lat/long validator
    // TODO show error message 
  }

}
