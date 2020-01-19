import { Component, OnInit, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormArray, ControlContainer, FormGroup } from '@angular/forms';

import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';

import { AngularMaterialModule } from '../angular-material.module';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'option-editor',
    templateUrl: 'option-editor.component.html',
    styleUrls: ['./option-editor.component.scss']
})

export class OptionEditorComponent implements OnInit {

    @Input() arrayName: string;

    @Input() initialOption = false;

    constructor(private controlContainer: ControlContainer, private fb: FormBuilder) { }

    ngOnInit() {
        if (this.initialOption) {
            this.addOption();
        }
    }

    initOptionRows() {
        return this.fb.group({
          label: [''],
          value: ['']
        });
      }

    get formArr() {
        return this.controlContainer.control.get(this.arrayName) as FormArray;
    }

    addOption() {
        this.formArr.push(this.initOptionRows());
    }

    deleteOption(index: number) {
        this.formArr.removeAt(index);
    }

    moveOption(previousIndex: number, currentIndex: number) {
        // get values from previousIndex
        const grp = this.formArr.at(previousIndex) as FormGroup;
        const l = grp.controls.label.value;
        const v = grp.controls.value.value;

        // remove previousIndex
        this.deleteOption(previousIndex);

        // insert at currentIndex
        this.formArr.insert(currentIndex,
            this.fb.group({
                label: [l],
                value: [v]
              })
        );
    }

    drop(event: CdkDragDrop<any[]>) {
        this.moveOption(event.previousIndex, event.currentIndex);
    }
}

@NgModule({
    imports: [
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule,
        CommonModule],
    exports: [OptionEditorComponent],
    declarations: [OptionEditorComponent],
  })
export class OptionEditorModule {}
