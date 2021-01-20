import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { DynamicFormControlModelConfig, DynamicFormService, DynamicFormModel } from 'dynamic-form-lib';
import { DataTransformFactory } from '../data-transform-factory.service';
import { DataPath, FireStoreFormService, coerceDataPath } from '../firestore-form.service';

function isDisplayable(type: string): boolean {
    switch (type) {
        case 'image':
        case 'label':
            return false;
        default:
            return true;
    }
} 

export interface Column {
    id: string;
    title: string;
}
@Component({
    selector: 'ff-table',
    templateUrl: 'dynamic-table.component.html',
    styleUrls: ['dynamic-table.component.scss'],
    providers: [DataTransformFactory, FireStoreFormService]
})
export class DynamicTableComponent implements OnInit {
    columns: Column[];

    displayedColumns: string[];

    data: [] = [];

    @Input() modelConfig: DynamicFormControlModelConfig[] | string;

    @Input() dataPath: DataPath | string;

    constructor(
        private dynamicFormService: DynamicFormService, 
        private fireStoreFormService: FireStoreFormService,
        private dataTransform: DataTransformFactory) { }

    ngOnInit(): void {
        // get columns
        const model = this.dynamicFormService.fromJSON(this.modelConfig);
        this.columns = this.extractColumns(model);

        this.displayedColumns = this.columns.map(c => c.id);

        console.log('columns', this.columns);
        console.log('dataPath', this.dataPath);

        // get data collection
        this.fireStoreFormService.items(coerceDataPath(this.dataPath)).subscribe(d => {
            console.log(d);
            this.data = d;
        });
    }

    // TODO ignore label, image types
    extractColumns(model: DynamicFormModel): Column[] {
        const c: Column[] = [];
        for (const m of model) {
            if (isDisplayable(m.type)) {
                c.push({id: m.id, title: m.label});
            }
        }
        return c;
    }

}