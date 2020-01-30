import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';


import { DynamicFormControlModel } from '../models/dynamic-form-control.model';
import { DynamicFormModel } from '../models/dynamic-form.model';
import { ValidatorModel } from '../models/validator.model';

import { DynamicFormModule } from '../dynamic-form.module';

// https://github.com/udos86/ng-dynamic-forms/blob/master/packages/core/src/service/dynamic-form-validation.service.ts

// export type Validator = ValidatorFn | AsyncValidatorFn;
// export type ValidatorFactory = (args: any) => Validator;

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

  public getFormMetadata(formId: string): Promise<DynamicFormControlModel[]> {
    return this.httpClient.get<DynamicFormControlModel[]>(this.uriPrefix + formId + this.uriSuffix).toPromise();
  }

  public createGroup(formModel: DynamicFormModel): FormGroup {

    const group = this.formBuilder.group({});

    formModel.forEach(controlModel => {

      const name = controlModel.id ? controlModel.id : controlModel.name;

      group.addControl(name, this.createControl(controlModel));
    });

    return group;
  }

  public createControl(controlModel: DynamicFormControlModel) {
    if (controlModel.type === 'toggle') {
      return this.formBuilder.control(false, this.getValidators(controlModel.validators || []) );
    }

    return this.formBuilder.control('', this.getValidators(controlModel.validators || []) );
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

  public initGroup(formGroup: FormGroup, item): void {
    for (const field of Object.keys(formGroup.controls)) {

      const property = this.getProperty(item, field);

      if (typeof property !== 'undefined') {
        formGroup.controls[field].setValue(property);
      }

    }

  }

  public value(formGroup: FormGroup, item): void {

    for (const field of Object.keys(formGroup.controls)) {

      // embeddedObject, for example party.displayName
      const embeddedObject = field.split('.');

      switch (embeddedObject.length) {

        case 1:

          item[field] = formGroup.controls[field].value;
          break;

        case 2:
          item[embeddedObject[0]][embeddedObject[1]] = formGroup.controls[field].value;
          break;

        default:
          // TODO error
          break;

      }

    }

  }

  private getProperty = (obj, path) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
  )

}
