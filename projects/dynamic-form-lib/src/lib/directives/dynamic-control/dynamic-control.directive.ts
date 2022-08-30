import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef
} from '@angular/core';

import { UntypedFormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { DynamicFormControl, DynamicFormControlCustomEvent, DynamicFormControlModel } from '../../models/dynamic-form-control.model';

import { DynamicDatepickerComponent } from '../../components/dynamic-datepicker/dynamic-datepicker.component';
import { DynamicInputComponent } from '../../components/dynamic-input/dynamic-input.component';
import { DynamicTextareaComponent } from '../../components/dynamic-textarea/dynamic-textarea.component';
import { DynamicCheckboxGroupComponent } from '../../components/dynamic-checkbox-group/dynamic-checkbox-group.component';
import { DynamicRadioGroupComponent } from '../../components/dynamic-radio-group/dynamic-radio-group.component';
import { DynamicSelectComponent } from '../../components/dynamic-select/dynamic-select.component';
import { DynamicSlideToggleComponent } from '../../components/dynamic-slide-toggle/dynamic-slide-toggle.component';
import { DynamicLabelComponent } from '../../components/dynamic-label/dynamic-label.component';
import { DynamicImageComponent } from '../../components/dynamic-image/dynamic-image.component';
import { DynamicLocationComponent } from '../../components/dynamic-location/dynamic-location.component';

const components = {
  date: DynamicDatepickerComponent,
  input: DynamicInputComponent,
  textarea: DynamicTextareaComponent,
  checkboxgroup: DynamicCheckboxGroupComponent,
  radiogroup: DynamicRadioGroupComponent,
  select: DynamicSelectComponent,
  toggle: DynamicSlideToggleComponent,
  label: DynamicLabelComponent,
  image: DynamicImageComponent,
  location: DynamicLocationComponent,
};

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[dynamicControl]'
})
export class DynamicControlDirective implements OnInit, OnDestroy {

  @Input() formGroup: UntypedFormGroup;
  @Input() model: DynamicFormControlModel;

  @Output() customEvent = new EventEmitter<DynamicFormControlCustomEvent>();

  protected componentRef: ComponentRef<DynamicFormControl>;
  protected componentSubscriptions: Subscription[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) {
  }

  public ngOnInit() {
    this.createDynamicFormControlComponent();
  }

  public ngOnDestroy() {

    this.destroyDynamicFormControlComponent();
  }

  private createDynamicFormControlComponent() {

    if (!components[this.model.type]) {

      const supportedTypes = Object.keys(components).join(', ');

    } else {

      const factory = this.resolver.resolveComponentFactory(components[this.model.type]);
      this.componentRef = this.viewContainerRef.createComponent(factory) as ComponentRef<DynamicFormControl>;

      const instance = this.componentRef.instance;

      instance.formGroup = this.formGroup;
      instance.model = this.model;

      if (instance.customEvent !== undefined) {

        this.componentSubscriptions.push(
          instance.customEvent.subscribe((event: DynamicFormControlCustomEvent) => this.onCustomEvent(event)));
      }

    }

  }

  private destroyDynamicFormControlComponent() {

    if (this.componentRef) {

      this.componentSubscriptions.forEach(subscription => {
        subscription.unsubscribe();
      });

      this.componentSubscriptions = [];
      this.componentRef.destroy();

    }

  }

  onCustomEvent(event: DynamicFormControlCustomEvent): void {

    // const emitter = this.customEvent as EventEmitter<any>;
    // emitter.emit($event);
    this.customEvent.emit(event);
  }

}
