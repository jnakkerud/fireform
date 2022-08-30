import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { DynamicFormControlCustomEvent, DynamicFormControlModel } from '../../models/dynamic-form-control.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'dynamic-slide-toggle',
  templateUrl: 'dynamic-slide-toggle.component.html'
})
export class DynamicSlideToggleComponent implements OnInit {

  @Input() formGroup: UntypedFormGroup;
  @Input() model: DynamicFormControlModel;

  @Output() customEvent = new EventEmitter<DynamicFormControlCustomEvent>();

  @HostBinding('class') elementClass;

  public ngOnInit() {
    this.elementClass = this.model.gridItemClass;
  }

}
