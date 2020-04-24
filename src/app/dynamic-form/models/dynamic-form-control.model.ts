import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidatorModel } from './validator.model';

export interface DynamicFormControlCustomEvent {
  type: string;                    // 'click' string
  id: string;                      // 'organisation.name'
  directive: string;               // 'matSuffix'
  name: string;                    // 'search'
}

export interface DynamicFormControl {
  formGroup: FormGroup;
  model: DynamicFormControlModel;
  customEvent?: EventEmitter<any>;
}

export interface Option {
  label: string;
  value: any;
}

export interface DynamicFormControlModelConfig {

  type: string;                    // "input"
  id?: string;                      // id for the control

  // Optional items
  inputType?: string;              // "text"
  appearance?: string;             // "outline"
  autocomplete?: string;           // aka autoFill
  gridItemClass?: string;          // "grid-column-1"
  label?: string;                  // form label
  name?: string;                   // form control name, default = id
  placeholder?: string;            // form field placeholder
  prefixIconName?: string;
  required?: boolean;              // false
  suffixIconName?: string;
  fileName?: string;               // file name used by image control

  validators?: ValidatorModel[];

  options?: Option[];
}

export class DynamicFormControlModel {

  type: string;                    // "input"
  id?: string;                     // id for the control

  // Optional items
  inputType?: string;               // "text"
  appearance?: string;             // "outline"
  autocomplete?: string;           // aka autoFill
  gridItemClass?: string;          // "grid-column-1"
  label?: string;                  // form label
  name?: string;                   // form control name, default = id
  placeholder?: string;            // form field placeholder
  prefixIconName?: string;
  required?: boolean;              // false
  suffixIconName?: string;
  fileName?: string;               // file name used by image control

  validators?: ValidatorModel[];

  options?: Option[];

  public constructor(config: DynamicFormControlModelConfig) {

    this.type = config.type;
    this.id = config.id;

    this.inputType = config.inputType || 'text';

    this.appearance = config.appearance || 'standard';
    this.autocomplete = config.autocomplete || 'off';
    this.gridItemClass = config.gridItemClass || null;
    this.label = config.label || null;
    this.name = config.name || config.id;
    this.placeholder = config.placeholder || config.label;
    this.prefixIconName = config.prefixIconName || null;
    this.required = config.required || false;
    this.suffixIconName = config.suffixIconName || null;
    this.fileName = config.fileName || null;

    this.validators = config.validators || null;

    this.options = config.options || null;
  }

}
