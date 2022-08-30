import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { DynamicFormControlModel } from '../../models/dynamic-form-control.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'dynamic-radio-group',
  templateUrl: 'dynamic-radio-group.component.html',
  styleUrls: ['./dynamic-radio-group.component.scss']
})
export class DynamicRadioGroupComponent implements OnInit {

  @Input() formGroup: UntypedFormGroup;
  @Input() model: DynamicFormControlModel;

  @HostBinding('class') elementClass;

  public ngOnInit() {
    this.elementClass = this.model.gridItemClass;
  }

}
