import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CollectionItem, GradeResponse } from 'src/app/core/collection-service/collection.service';

type FieldType = 'text' | 'options' | 'boolean';

const FORM_GROUP_CONTROLS = {
    text: {
        matchValue: [''],
        points: ['']
    },
    options: {
        matchValue: [''],
        points: ['']
    },
    boolean: {
        matchValue: [''],
        points: ['']
    }
};

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'grade-editor',
    templateUrl: 'grade-editor.component.html',
    styleUrls: ['./grade-editor.component.scss']
})
export class GradeEditorComponent implements OnInit {

    @Input() fieldType: FieldType;

    @Input() formGroup: FormGroup;

    @Input() collectionItem: CollectionItem;

    group: FormGroup;
    gradeResponse: GradeResponse;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        // this.gradeResponse = this.collectionItem.gradeResponse;

        this.createForm();
    }

    createForm() {
        this.group = this.formBuilder.group(FORM_GROUP_CONTROLS[this.fieldType]);

        // this.group.patchValue
    }

}
