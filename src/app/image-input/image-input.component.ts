import { Component, NgModule, HostBinding, HostListener } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material.module';

import { StorageService } from '../core/storage-service/storage.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'image-input',
    templateUrl: 'image-input.component.html',
    styleUrls: ['./image-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ImageInputComponent,
            multi: true
        }
    ]
})

export class ImageInputComponent implements ControlValueAccessor {

    filename = 'Drop image file here';

    onChange: (_: any) => {};

    private file: File | null = null;

    dragging = false;

    // Dragover listener
    @HostListener('dragover', ['$event']) onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.dragging = true;
    }

    // Dragleave listener
    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.dragging = false;
    }

    // Drop listener
    @HostListener('drop', ['$event']) public ondrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.dragging = false;
        const files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.handleFile(files[0]);
        }
    }

    constructor(private storage: StorageService) { }

    // TODO use the name property
    // "name": "user-test-dir/luislkellerhasen.png"

    // TODO restrict file types?

    onFileSelected(event) {
        this.handleFile(event.target.files[0]);
    }

    handleFile(file: File) {
        if (file) {
            this.file = file;
            this.filename = this.file.name;
            this.storage.addFile(this.file);
            if (this.onChange) {
                this.onChange(`${this.storage.getLocation()}/${this.file.name}`);
            }
        }
    }

    writeValue(value: any) {
        console.log(value);
        // clear file input
        this.file = null;

        if (value) {
            this.filename = value.substring(value.lastIndexOf('/') + 1);
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
    }
}

@NgModule({
    imports: [
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule],
    exports: [ImageInputComponent],
    declarations: [ImageInputComponent],
})
export class ImageInputModule { }
