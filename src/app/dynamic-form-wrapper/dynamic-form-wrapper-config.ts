import { InjectionToken } from "@angular/core";
import { DynamicFormControlModelConfig } from "dynamic-form-lib";

export class DynamicFormWrapperConfig {
    formModel: DynamicFormControlModelConfig[] | string;
    collectionPath: string;
}

export const DYNAMIC_FORM_WRAPPER_CONFIG = new InjectionToken<DynamicFormWrapperConfig>('dynamic-form-wrapper-config');