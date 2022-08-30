import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { DynamicFormModel } from '../../models/dynamic-form.model';
import { DynamicFormControlCustomEvent } from '../../models/dynamic-form-control.model';

@Component({
  // encapsulation: ViewEncapsulation.None,
  selector: 'dynamic-form, app-dynamic-form, lib-dynamic-form',
  template: `
    <form  [autocomplete]="autocomplete"
           [className]="className"
           [formGroup]="formGroup">

      <ng-container *ngFor="let controlModel of formModel;"
                    dynamicControl [formGroup]="formGroup"
                    [model]="controlModel"
                    (customEvent)="onCustomEvent($event)">
      </ng-container>

    </form>
  `,
  styleUrls: ['dynamic-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DynamicFormComponent {

  @Input() formGroup: UntypedFormGroup;

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('model') formModel: DynamicFormModel;

  @Input() autocomplete = 'off';
  @Input() className: string;

  @Output() customEvent = new EventEmitter<any>();


  public onCustomEvent(event: DynamicFormControlCustomEvent) {
    this.customEvent.emit(event);
  }

}
