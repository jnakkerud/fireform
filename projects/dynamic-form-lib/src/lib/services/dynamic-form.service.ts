import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ValidatorFn, UntypedFormControl } from '@angular/forms';

import { DynamicFormControlModel, DynamicFormControlModelConfig } from '../models/dynamic-form-control.model';
import { DynamicFormModel } from '../models/dynamic-form.model';
import { ValidatorModel } from '../models/validator.model';

import {  DynamicFormLibModule } from '../dynamic-form-lib.module';
import { isString } from '../utils';

function isFormControl(type: string): boolean {
  if (type === 'label' || type === 'image') {
    return false;
  }
  return true;
}

export function parseReviver(key: string, value: any): any {
  const regexDateISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|([+\-])([\d|:]*))?$/;
  return isString(value) && regexDateISO.test(value) ? new Date(value) : value;
}

export type ValidatorFactory = (args: any) => ValidatorFn;

@Injectable({
  providedIn: DynamicFormLibModule
})
export class DynamicFormService {

  private uriPrefix = 'assets/data/forms/';
  private uriSuffix = '.json';

  constructor(private formBuilder: UntypedFormBuilder, private httpClient: HttpClient) {
  }

  public getFormMetadata(formId: string) {
    return this.httpClient.get<DynamicFormControlModelConfig[]>(this.uriPrefix + formId + this.uriSuffix);
  }

  public createGroup(formModel: DynamicFormModel): UntypedFormGroup {

    const group = this.formBuilder.group({});

    formModel.forEach(controlModel => {

      const name = controlModel.id ? controlModel.id : controlModel.name;

      if (isFormControl(controlModel.type)) {
        group.addControl(name, this.createControl(controlModel));
      }
    });

    return group;
  }

  public createControl(controlModel: DynamicFormControlModel): UntypedFormControl {

    if (controlModel.type === 'toggle') {
      return this.formBuilder.control(false, this.getValidators(controlModel.validators || []));
    }

    const fc: UntypedFormControl = this.formBuilder.control(null, this.getValidators(controlModel.validators || []));

    return fc;
  }

  public getValidators(validatorModel: ValidatorModel[]) {

    if (validatorModel.length === 0) {
      return null;
    }

    const functions: ValidatorFn[] = [];

    validatorModel.forEach(validator => {

      functions.push(this.getValidatorFn(validator.name, validator.args));
    });

    return Validators.compose(functions);

  }

  public getValidatorFn(validatorName: string, validatorArgs: any) {

    let validatorFn: ValidatorFn = null;

    //
    // Built-in validators: https://angular.io/guide/form-validation#built-in-validators
    //

    if (Validators.hasOwnProperty(validatorName)) {

      validatorFn = (Validators as any)[validatorName];

      if (validatorArgs !== null) {
        validatorFn = (validatorFn as ValidatorFactory)(validatorArgs);
      }

      return validatorFn;

    }

  }

  public fromJSON(json: string | object[]): DynamicFormModel | never {
    const formModelJSON = isString(json) ? JSON.parse(json, parseReviver) : json;
    const formModel: DynamicFormModel = [];

    formModelJSON.forEach((model: any) => {
      formModel.push(new DynamicFormControlModel(model));
    });
    return formModel;
  }

}
