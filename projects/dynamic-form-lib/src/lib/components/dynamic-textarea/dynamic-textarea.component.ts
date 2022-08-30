import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { DynamicFormControlCustomEvent, DynamicFormControlModel } from '../../models/dynamic-form-control.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'dynamic-textarea',
  templateUrl: 'dynamic-textarea.component.html'
})
export class DynamicTextareaComponent implements OnInit {

  @Input() formGroup: UntypedFormGroup;
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
