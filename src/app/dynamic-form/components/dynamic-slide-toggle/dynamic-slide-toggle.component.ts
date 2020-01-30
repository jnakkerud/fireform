import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormControlCustomEvent, DynamicFormControlModel } from '../../models/dynamic-form-control.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dynamic-slide-toggle',
  template: `
  <ng-container [formGroup]="formGroup">

    <mat-slide-toggle [formControlName]="model.id">{{model.label}}</mat-slide-toggle>

  </ng-container>
  `,
  styles: []
})
export class DynamicSlideToggleComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() model: DynamicFormControlModel;

  @Output() customEvent = new EventEmitter<DynamicFormControlCustomEvent>();

  @HostBinding('class') elementClass;

  public ngOnInit() {
    this.elementClass = this.model.gridItemClass;
  }

}
