import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, UntypedFormGroup, ValidatorFn } from '@angular/forms';

import { DynamicFormControlCustomEvent, DynamicFormControlModel } from '../../models/dynamic-form-control.model';

function isLatitude(lat: any) {
    return isFinite(lat) && Math.abs(lat) <= 90;
  }
  
function isLongitude(lng: any) {
    return isFinite(lng) && Math.abs(lng) <= 180;
  }

export function latitudeLongitudeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let valid = !control.value;
        if (control.value) {            
            const ary = control.value.split(',');
            if (Array.isArray(ary)) {
                valid = isLatitude(ary[0]) && isLongitude(ary[1]);
            }
        }
        return valid? null : { latitudeLongitudeValidator: { value: control.value } };
    };
}

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'dynamic-location',
    templateUrl: 'dynamic-location.component.html'
})
export class DynamicLocationComponent implements OnInit {

    @Input() formGroup: UntypedFormGroup;
    @Input() model: DynamicFormControlModel;

    @Output() customEvent = new EventEmitter<DynamicFormControlCustomEvent>();

    @HostBinding('class') elementClass;

    formControl: AbstractControl;

    public ngOnInit() {
        this.elementClass = this.model.gridItemClass;

        this.formControl = this.formGroup.get(this.model.id);
        this.formControl.setValidators(latitudeLongitudeValidator());
        this.formControl.updateValueAndValidity();
    }

    getErrorMessage() {
        return 'Incorrect format for latitude and longitude';
    }
}
