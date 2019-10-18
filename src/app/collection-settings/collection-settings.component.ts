import { Component, NgModule, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CollectionService, CollectionItem } from '../core/collection-service/collection.service';
import { AngularMaterialModule } from '../angular-material.module';
import { DynamicFormService } from '../dynamic-form/services/dynamic-form.service';
import { DynamicFormModel } from '../dynamic-form/models/dynamic-form.model';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';

const SETTINGS_FORM = 'settings';

@Component({
    selector: 'app-collection-settings',
    templateUrl: 'collection-settings.component.html',
    styleUrls: ['./collection-settings.component.scss']
})
export class CollectionSettingsComponent implements OnInit {

    @Output() cancel = new EventEmitter<void>();

    @Output() save = new EventEmitter<CollectionItem>();

    @Input()
    get collectionItem(): CollectionItem {
        return this.item;
    }
    set collectionItem(value: CollectionItem) {
        this.item = value;
    }
    private item = {
        id: '-1',
        name: ''
    };

    public formGroup: FormGroup;
    public formModel: DynamicFormModel;

    constructor(
        private dynamicFormService: DynamicFormService,
        private collectionService: CollectionService) { }

    ngOnInit() {
        this.createForm();
    }

    async createForm() {
        this.formModel = await this.dynamicFormService.getFormMetadata(SETTINGS_FORM);
        this.formGroup = this.dynamicFormService.createGroup(this.formModel);

        // bind the collection item to the form
        this.formGroup.patchValue(this.collectionItem);
    }

    onCancel() {
        // fire cancel event
        this.cancel.emit();
    }

    onSubmit() {
        // validate
        const nameVal = this.formGroup.get('name').value;

        // save collection project
        const newItem = this.collectionService.addItem({
            id: this.collectionItem.id,
            name: nameVal,
            description: this.formGroup.get('description').value
        });

        // fire submit event
        this.save.emit(newItem);
    }

    public isValid() {
        let valid = true;

        if (this.formGroup) {
            valid = this.formGroup.valid;
        }

        return valid;
    }

    get submitButtonLabel(): string {
        return (this.item.id === '-1' ? 'Next' : 'Save');
    }
}

@NgModule({
    imports: [
        AngularMaterialModule,
        ReactiveFormsModule,
        DynamicFormModule,
        CommonModule],
    exports: [CollectionSettingsComponent],
    declarations: [CollectionSettingsComponent],
  })
  export class CollectionSettingsModule {}
