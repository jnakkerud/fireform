import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';

import { DynamicFormControlModel, DynamicFormControlModelConfig } from '../models/dynamic-form-control.model';
import { DynamicFormModel } from '../models/dynamic-form.model';
import { ValidatorModel } from '../models/validator.model';

import {  FireFormLibModule } from '../fireform-lib.module';
import { isString } from '../utils';
import { ConvertorsMap, NUMBER_CONVERTOR, DATE_CONVERTOR, LOCATION_CONVERTOR } from './dynamic-form-convertors';

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
  providedIn: FireFormLibModule
})
export class DynamicFormService {

  private uriPrefix = 'assets/data/forms/';
  private uriSuffix = '.json';

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
  }

  public getFormMetadata(formId: string) {
    return this.httpClient.get<DynamicFormControlModelConfig[]>(this.uriPrefix + formId + this.uriSuffix);
  }

  public createGroup(formModel: DynamicFormModel): FormGroup {

    const group = this.formBuilder.group({});

    formModel.forEach(controlModel => {

      const name = controlModel.id ? controlModel.id : controlModel.name;

      if (isFormControl(controlModel.type)) {
        group.addControl(name, this.createControl(controlModel));
      }
    });

    return group;
  }

  public createControl(controlModel: DynamicFormControlModel): FormControl {

    if (controlModel.type === 'toggle') {
      return this.formBuilder.control(false, this.getValidators(controlModel.validators || []));
    }

    const fc: FormControl = this.formBuilder.control(null, this.getValidators(controlModel.validators || []));

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

  public getConvertors(formModel: DynamicFormModel): ConvertorsMap {
    const convertors: ConvertorsMap = new Map();

    formModel.forEach(controlModel => {
      if (controlModel.type === 'input' && controlModel.inputType === 'number') {
        convertors.set(controlModel.id, NUMBER_CONVERTOR);
      }

      if (controlModel.type === 'date') {
        convertors.set(controlModel.id, DATE_CONVERTOR);
      }

      if (controlModel.type === 'location') {
        convertors.set(controlModel.id, LOCATION_CONVERTOR);
      }

    });

    return convertors;
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
