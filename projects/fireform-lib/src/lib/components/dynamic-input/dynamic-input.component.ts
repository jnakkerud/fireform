import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormControlCustomEvent, DynamicFormControlModel } from '../../models/dynamic-form-control.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dynamic-input',
  templateUrl: 'dynamic-input.component.html'
})
export class DynamicInputComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() model: DynamicFormControlModel;

  @Output() customEvent = new EventEmitter<DynamicFormControlCustomEvent>();

  @HostBinding('class') elementClass;

  public ngOnInit() {
    this.elementClass = this.model.gridItemClass;
  }

  public iconSuffixClickHandler() {
    this.customEvent.emit({ type: 'click', id: this.model.id, directive: 'matSuffix', name: this.model.suffixIconName });
  }

}
