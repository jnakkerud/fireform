import { Injectable } from '@angular/core';
import { DynamicFormModel } from 'fireform-lib';

import { ConvertorsMap, DATE_CONVERTOR, LOCATION_CONVERTOR, NUMBER_CONVERTOR } from '../core/data-service/convertors';

@Injectable({ providedIn: 'root' })
export class ConvertorFactoryService {

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
}