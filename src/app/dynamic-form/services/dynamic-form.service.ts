import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';

import { distinct } from 'rxjs/operators';

import { DynamicFormControlModel, DynamicFormControlModelConfig } from '../models/dynamic-form-control.model';
import { DynamicFormModel } from '../models/dynamic-form.model';
import { ValidatorModel } from '../models/validator.model';

import { DynamicFormModule } from '../dynamic-form.module';
import { isString } from '../../core/utils';

// https://github.com/udos86/ng-dynamic-forms/blob/master/packages/core/src/service/dynamic-form-validation.service.ts

// export type Validator = ValidatorFn | AsyncValidatorFn;
// export type ValidatorFactory = (args: any) => Validator;

export function parseReviver(key: string, value: any): any {
  const regexDateISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|([+\-])([\d|:]*))?$/;
  return isString(value) && regexDateISO.test(value) ? new Date(value) : value;
}

export type ValidatorFactory = (args: any) => ValidatorFn;

@Injectable({
  providedIn: DynamicFormModule
})
export class DynamicFormService {

  private uriPrefix = 'assets/data/forms/';
  private uriSuffix = '.json';

  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient) {
  }

  public getFormMetadata(formId: string) {
    return this.httpClient.get<DynamicFormControlModelConfig[]>(this.uriPrefix + formId + this.uriSuffix);
  }

  public createGroup(formModel: DynamicFormModel): FormGroup {

    const group = this.formBuilder.group({});

    formModel.forEach(controlModel => {

      const name = controlModel.id ? controlModel.id : controlModel.name;

      // ignore label types
      if (controlModel.type !== 'label') {
        group.addControl(name, this.createControl(controlModel));
      }
    });

    return group;
  }

  public createControl(controlModel: DynamicFormControlModel): FormControl {

    if (controlModel.type === 'toggle') {
      return this.formBuilder.control(false, this.getValidators(controlModel.validators || []) );
    }

    const fc: FormControl = this.formBuilder.control(null, this.getValidators(controlModel.validators || []) );

    // handle number types
    // TODO Add DynamicFormControlModel.value Update the value with valueChanges Use a DynamicFormControlModel.convertor for Firebase, etc.
    // See example pattern:
    // https://github.com/udos86/ng-dynamic-forms dynamic-form-control-container.component.ts
    if (controlModel.type === 'input' && controlModel.inputType === 'number') {
      fc.valueChanges
        .pipe(distinct())
        .subscribe(value => fc.setValue(+value  || 0));
    }

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

    if (Validators.hasOwnProperty(validatorName) ) {

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

  /*private getProperty = (obj, path) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
  )*/

}
