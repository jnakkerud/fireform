import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material.module';
import { DynamicFormService, DynamicFormModel, FireFormLibModule } from 'fireform-lib';

const FORM_JSON = `
[
    {
      "type": "input",
      "id": "name",
      "label": "Name",
      "placeholder": "collection name",

      "validators": [
        {
          "name": "required",
          "args": null,
          "propertyName": "required",
          "message": "You must enter a name"
        }
      ],
      "gridItemClass": "grid-column-1",
      "required": true
    },
    {
      "type": "textarea",
      "id": "description",
      "label": "Description",
      "gridItemClass": "grid-column-1"
    },
    {
        "type": "image",
        "id": "description",
        "label": "Description",
        "fileName": "user-test-dir/luislkellerhasen.png"
      },
    {
        "type": "checkboxgroup",
        "id": "checkboxgroup",
        "label": "Favorite Fruit",
        "options": [
            {"label": "Apple", "value": "apple"},
            {"label": "Orange", "value": "orange"},
            {"label": "Grape", "value": "grape"}
        ]
    },
    {
        "type": "label",
        "id": "label_type",
        "label": "This is an example of a label"
    },
    {
        "type": "location",
        "id": "location",
        "label": "Location (Lat/Long)"
    },
    {
        "type": "radiogroup",
        "id": "radiogroup",
        "label": "Shirt size",
        "options": [
            {"label": "Small", "value": "s"},
            {"label": "Medium", "value": "m"},
            {"label": "Large", "value": "l"}
        ]
    },
    {
        "type": "select",
        "id": "select",
        "label": "Favorite Vegetable",
        "options": [
            {"label": "Carrot", "value": "carrot"},
            {"label": "Eggplant", "value": "eggplant"},
            {"label": "Onion", "value": "onion"}
        ]
    },
    {
        "type": "toggle",
        "id": "milk",
        "label": "Like Milk?"
    },
    {
        "type": "date",
        "id": "bday",
        "label": "Birthday"
    }
]
`;

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'dynamic-form-test',
    templateUrl: 'dynamic-form-test.component.html',
    styleUrls: ['./dynamic-form-test.component.scss'],
})

export class DynamicFormTestComponent implements OnInit {

    public formGroup: FormGroup;
    public formModel: DynamicFormModel;

    constructor(private dynamicFormService: DynamicFormService) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.formModel = this.getFormMetadata();
        this.formGroup = this.dynamicFormService.createGroup(this.formModel);
    }

    onSubmit() {
        // save the document to the collection
        console.log(this.formGroup.value);
    }


    getFormMetadata(): DynamicFormModel {
        return this.dynamicFormService.fromJSON(FORM_JSON);
    }

}

@NgModule({
    imports: [
        AngularMaterialModule,
        ReactiveFormsModule,
        FireFormLibModule,
        CommonModule],
    exports: [DynamicFormTestComponent],
    declarations: [DynamicFormTestComponent],
  })
export class DynamicFormTestModule {}
