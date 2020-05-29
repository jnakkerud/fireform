import { Injectable, KeyValueDiffers, KeyValueDiffer, OnDestroy, NgZone } from '@angular/core';

import { CollectionItem, CollectionService, GradeResponse } from '../core/collection-service/collection.service';
import { FormField } from './form-builder.component';
import { DynamicFormControlModel } from '../dynamic-form/models/dynamic-form-control.model';
import { Observable, fromEvent, of as observableOf, Subscription } from 'rxjs';
import { Platform } from '@angular/cdk/platform';

export interface PropertyEditor {
    formField: FormField;
    isDirty(): boolean;
}

export interface GradeEditor {
    isDirty(): boolean;
    updatedGradeResponse(): Promise<GradeResponse>;
}

function toJson(model: DynamicFormControlModel[]): string {
    const formJson = JSON.stringify(model, (key, value) => {
        // Filtering out null properties
        if (value === null) {
            return undefined;
        }
        return value;
    });
    return formJson;
}

@Injectable()
export class FormBuilderStore implements OnDestroy {

    private previousCollectionItem: CollectionItem;
    private dirty = false;

    collectionItem: CollectionItem;

    formFields: FormField[];

    propertyEditor: PropertyEditor;
    gradeEditor: GradeEditor;

    formFieldsDiffer: KeyValueDiffer<any, any>;

    private windowUnloadSubscription: Subscription;

    constructor(
        private collectionService: CollectionService,
        private kvDiffers: KeyValueDiffers,
        platform: Platform,
        ngZone: NgZone) {

        ngZone.runOutsideAngular(() => {
            const windowUnload: Observable<Event> = platform.isBrowser ?
                fromEvent(window, 'beforeunload') :
                observableOf();

            this.windowUnloadSubscription = windowUnload.subscribe(event => {
                if (this.isDirty()) {
                    event.preventDefault();
                    this.save();
                    const message: any = typeof event.returnValue === 'boolean' ? this.isDirty() : 'Leave form?';
                    return (event.returnValue = message);
                }
                return null;
            });
        });
    }

    ngOnDestroy() {
        this.windowUnloadSubscription.unsubscribe();
        this.save();
    }

    save(item: CollectionItem = this.collectionItem) {
        if (item && this.isDirty()) {
            const saver = async (
                            collectionItem: CollectionItem,
                            formFields: FormField[],
                            gradeEditor: GradeEditor,
                            fieldId: string): Promise<void> => {
                if (gradeEditor && gradeEditor.isDirty()) {
                    const gradeResponse = await gradeEditor.updatedGradeResponse();
                    if (gradeResponse) {
                        this.updateGradeResponse(collectionItem, gradeResponse, fieldId);
                    }
                }
                this.updateCollectionItem(collectionItem, formFields);
                console.log('toSave', collectionItem);
                await this.collectionService.update(item);
            };

            const ff = this.formFields;
            const id = this.propertyEditor.formField.fieldId;
            const ge = this.gradeEditor;
            saver(item, ff, ge, id).then(() => this.dirty = false);
        }
    }

    public isDirty(): boolean {
        if (this.dirty || this.isFormFieldsDirty() || this.propertyEditor?.isDirty() || this.gradeEditor?.isDirty()) {
            return true;
        }
        return false;
    }

    public getGradeResponse(): GradeResponse {
        const fieldId = this.propertyEditor.formField.fieldId;

        let gradeResponse: GradeResponse;

        if (this.collectionItem?.gradeResponse) {
            gradeResponse = this.collectionItem.gradeResponse.find(gr => gr.field === fieldId);
        }
        // If a grade response does not exist for the field, then seed a new one
        if (!gradeResponse) {
            gradeResponse = {
                field: fieldId,
                points: [{value: '', point: null}]
            };
        }
        return gradeResponse;
    }

    setCollectionItem(item: CollectionItem) {
        if (item !== this.previousCollectionItem) {
            this.save(this.previousCollectionItem);
        }
        this.previousCollectionItem = this.collectionItem;
        this.collectionItem = item;
        this.propertyEditor = null;
        this.gradeEditor = null;
        this.dirty = false;

    }

    setFormFields(formFields: FormField[]) {
        this.formFields = formFields;
        this.formFieldsDiffer = this.kvDiffers.find(this.formFields).create();
        // !! Need to do a diff here to seed the differ,
        // as first diff will compare against an empty object
        this.formFieldsDiffer.diff(this.formFields);
    }

    // Check if form fields have been added, removed or moved
    isFormFieldsDirty(): boolean {
        const diff = this.formFieldsDiffer.diff(this.formFields);
        return !!diff;
    }

    bindPropertyEditor(editor: PropertyEditor) {
        // see if the current editor is dirty
        if (this.propertyEditor && this.propertyEditor.isDirty()) {
            this.dirty = true;
        }

        this.propertyEditor = editor;
    }

    bindGradeEditor(editor: GradeEditor) {
        // see if the current editor is dirty
        if (this.gradeEditor && this.gradeEditor.isDirty()) {
            this.dirty = true;
            const fieldId = this.propertyEditor.formField.fieldId;
            this.gradeEditor.updatedGradeResponse().then(gr => this.updateGradeResponse(this.collectionItem, gr, fieldId));
        }
        this.gradeEditor = editor;
    }

    updateCollectionItem(item: CollectionItem, formFields: FormField[]) {

        // 1) resolve the form fields to DynamicFormControlModel
        const resolveModel = (ff: FormField): DynamicFormControlModel => {
            const m = ff.model[0];
            if (!m.id) {
                const label = m.label;
                m.id = label ? label.split(' ').join('_').toLowerCase() : Math.random().toString(36).substr(2, 9);
            }
            return m;
        };
        const formControlModels: DynamicFormControlModel[]  = [];
        formFields.forEach(ff => {
            formControlModels.push(resolveModel(ff));
        });

        // 2) Generate clean JSON for the form
        item.form = toJson(formControlModels);

        // 3) sync id's for grade responses
        if (item.gradeResponse) {
            item.gradeResponse.forEach(gradeResponse => {
                const formField = formFields.find(ff => ff.fieldId === gradeResponse.field);
                gradeResponse.field = formField.model[0].id;
            });
        }
    }

    updateGradeResponse(item: CollectionItem, gradeResponse: GradeResponse, fieldId: string) {
        if (!item.hasOwnProperty('gradeResponse')) {
            item.gradeResponse = [];
        }

        const idx = item.gradeResponse.findIndex(gr => gr.field === fieldId);

        if (idx === -1) {
            item.gradeResponse.push(gradeResponse);
        } else {
            item.gradeResponse[idx] = gradeResponse;
        }
    }


}
