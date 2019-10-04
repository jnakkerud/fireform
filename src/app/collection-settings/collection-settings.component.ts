import { Component, NgModule, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CollectionService, CollectionItem } from '../core/collection-service/collection.service';
import { AngularMaterialModule } from '../angular-material.module';

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
        name: '',
        description: ''
    };

    collectionNameGrp: FormGroup;

    constructor(private formBuilder: FormBuilder, private collectionService: CollectionService) { }

    ngOnInit() {
        this.collectionNameGrp = this.formBuilder.group({
            nameCtrl: [this.collectionItem.name, Validators.required]
        });
    }

    onCancel() {
        // fire cancel event
        this.cancel.emit();
    }

    onSubmit() {
        // validate
        const nameVal = this.collectionNameGrp.get('nameCtrl').value;

        // save collection project
        const newItem = this.collectionService.addItem({
            id: this.collectionItem.id,
            name: nameVal,
            description: this.collectionItem.description
        });

        // fire submit event
        this.save.emit(newItem);
    }

    get submitButtonLabel(): string {
        return (this.item.id === '-1' ? 'Next' : 'Save');
    }
}

@NgModule({
    imports: [
        AngularMaterialModule,
        ReactiveFormsModule,
        CommonModule],
    exports: [CollectionSettingsComponent],
    declarations: [CollectionSettingsComponent],
  })
  export class CollectionSettingsModule {}
