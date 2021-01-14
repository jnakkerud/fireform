import { Injectable } from '@angular/core';
import { DynamicFormModel } from 'dynamic-form-lib';
import { Convertor, ConvertorsMap } from '../core/data-service/convertors';

import { ConvertorFactoryService } from './convertor-factory.service';

@Injectable({providedIn: 'root'})
export class DataTransformFactory {
    
    constructor(private convertorFactory: ConvertorFactoryService) {}

    public transform(data: any, formModel: DynamicFormModel): any {
        return this.convert(data, this.getConvertors(formModel));
    }

    public convert(data: any, convertors?: ConvertorsMap ): any {
        let validData = Object.assign({}, data);
        if (convertors) {
            validData = {};
            Object.keys(data).forEach(key => {
                let val = data[key];
                const convertor: Convertor = convertors.get(key);
                if (convertor) {
                    val = convertor(val);
                }
                validData[key] = val;
            });
        }
        return validData;
    }

    public formTransform(data: any): any {
        let validData = {};
        Object.keys(data).forEach(key => {
            let val = data[key];
            // if (val instanceof firebase.firestore.Timestamp)
            const convertor: Convertor = this.convertorFactory.getConvertor(val);
            if (convertor) {
                val = convertor(val);
            }
            validData[key] = val;
        });
        return validData;      
    }

    private getConvertors(formModel: DynamicFormModel): ConvertorsMap | undefined {
        const cv = this.convertorFactory.getConvertors(formModel);
        return cv.size > 0 ? cv : undefined;
    }
}