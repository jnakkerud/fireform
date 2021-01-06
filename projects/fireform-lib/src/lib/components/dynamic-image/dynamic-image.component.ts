import { Component, HostBinding, Input, OnInit, DoCheck, KeyValueDiffers, KeyValueDiffer, KeyValueChangeRecord } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { DynamicFormControlModel } from '../../models/dynamic-form-control.model';
import { ImageService } from './image.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'dynamic-image',
    templateUrl: 'dynamic-image.component.html'
})
export class DynamicImageComponent implements OnInit, DoCheck {

    @Input() formGroup: FormGroup;
    @Input() model: DynamicFormControlModel;

    @HostBinding('class') elementClass;

    imageUrl: Observable<string | null>;
    differ: KeyValueDiffer<any, any>;

    constructor(private imageService: ImageService, private differs: KeyValueDiffers) { }

    ngDoCheck(): void {
        // Called every time that the input properties of a component or a directive are checked on the page.
        // Can be expensive

        const changes = this.differ.diff(this.model);

        if (changes) {
            changes.forEachChangedItem((record: KeyValueChangeRecord<any, any>) => {
                if (record.key === 'fileName' && record.currentValue !== record.previousValue) {
                    if (record.currentValue) {
                        this.loadImage();
                    } else {
                        this.imageUrl = null;
                    }
                }
            });
        }
    }

    ngOnInit() {
        this.differ = this.differs.find(this.model).create();

        this.elementClass = this.model.gridItemClass;

        this.loadImage();
    }

    private loadImage() {
        if (this.model.fileName) {
            this.imageUrl = this.imageService.getImageURL(this.model.fileName);
        }
    }

}
