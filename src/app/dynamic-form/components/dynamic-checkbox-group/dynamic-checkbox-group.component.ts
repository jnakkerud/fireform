import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormControlModel } from '../../models/dynamic-form-control.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dynamic-checkbox-group',
  template: `
    <ng-container [formGroup]="formGroup">

      <label>{{model.label}}</label>
      <mat-selection-list [formControlName]="model.id" role="list">
        <mat-list-option *ngFor="let option of model.options" [value]="option.value" checkboxPosition="before">
         {{option.label}}
        </mat-list-option>
      </mat-selection-list>

    </ng-container>
`,
  styles: []
})
export class DynamicCheckboxGroupComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() model: DynamicFormControlModel;

  @HostBinding('class') elementClass;

  public ngOnInit() {
    this.elementClass = this.model.gridItemClass;
  }

}
