import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CollectionService, CollectionItem } from '../../core/collection-service/collection.service';
import { DynamicFormService } from '../../dynamic-form/services/dynamic-form.service';
import { DynamicFormModel } from '../../dynamic-form/models/dynamic-form.model';
import { DynamicFormControlModelConfig } from '../../dynamic-form/models/dynamic-form-control.model';
import { Subscription } from 'rxjs';

const SETTINGS_FORM = 'settings';

@Component({
    selector: 'app-collection-settings',
    templateUrl: 'collection-settings.component.html',
    styleUrls: ['./collection-settings.component.scss']
})
export class CollectionSettingsComponent implements OnInit, OnDestroy {

    @Output() cancel = new EventEmitter<void>();

    @Output() save = new EventEmitter<CollectionItem>();

    @Input()
    get collectionItem(): CollectionItem {
        return this.item;
    }
    set collectionItem(value: CollectionItem) {
        this.item = value;
    }
    private item: CollectionItem = {
        id: '-1',
        name: '',
        allowMultiple: true
    };

    public formGroup: FormGroup;
    public formModel: DynamicFormModel;

    subscription: Subscription;

    constructor(
        private dynamicFormService: DynamicFormService,
        private collectionService: CollectionService) { }

    ngOnInit() {
        this.createForm();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    createForm() {
        this.dynamicFormService.getFormMetadata(SETTINGS_FORM)
            .subscribe((data: DynamicFormControlModelConfig[]) => {
                this.formModel = this.dynamicFormService.fromJSON(data);
                this.formGroup = this.dynamicFormService.createGroup(this.formModel);
                // bind the collection item to the form
                this.formGroup.patchValue(this.collectionItem);

                // respond to value changes on the form
                this.subscribeToChanges();
            });
    }

    subscribeToChanges() {
        this.subscription = this.formGroup.get('allowMultiple').valueChanges.subscribe(val => {
            const trackResponses = this.formGroup.get('trackResponses');
            if (val === false) {
                // set tracking to true
                trackResponses.setValue(true);

                // disable
                trackResponses.disable();
            } else {
                if (trackResponses.disabled) {
                    trackResponses.enable();
                }
            }
        });
    }

    onCancel() {
        // fire cancel event
        this.cancel.emit();
    }

    onSubmit() {
        // save collection project
        this.collectionService.upsertItem({
            id: this.collectionItem.id,
            name: this.formGroup.get('name').value,
            description: this.formGroup.get('description').value,
            allowMultiple: this.formGroup.get('allowMultiple').value,
            trackResponses: this.formGroup.get('trackResponses').value
        }).then(item => {
            // fire submit event
            this.save.emit(item);
        });
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
