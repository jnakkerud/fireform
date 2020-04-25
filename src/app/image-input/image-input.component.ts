import { Component, NgModule, HostListener, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AngularMaterialModule } from '../angular-material.module';
import { StorageService } from '../core/storage-service/storage.service';
import { StorageLocationService } from '../core/storage-service/storage-location.service';

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

    dropMessage = 'Drop image file here';
    filename: string;
    removable = true;

    uploadPercent: Observable<number>;

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
    @HostListener('dragleave', ['$event']) onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.dragging = false;
    }

    // Drop listener
    @HostListener('drop', ['$event']) ondrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.dragging = false;

        // TODO explore better ways to disable drag
        if (this.filename) {
            return;
        }

        const files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.handleFile(files[0]);
        }
    }

    constructor(private storage: StorageService, @SkipSelf() private location: StorageLocationService) { }

    // TODO restrict file types?

    onFileSelected(event) {
        this.handleFile(event.target.files[0]);
    }

    handleFile(file: File) {
        if (file) {
            this.file = file;
            this.filename = this.file.name;
            const path = `${this.location.path}/${this.filename}`;

            // perform the upload
            const task = this.storage.uploadFile(path, this.file);

            // TODO observe percentage changes
            this.uploadPercent = task.percentageChanges();

            // get notified when the download URL is available
            task.snapshotChanges().pipe(
                finalize(() =>  {
                    // update the form model
                    if (this.onChange) {
                        this.onChange(path);
                    }
                })
            )
            .subscribe();
        }
    }

    remove() {
        const path = `${this.location.path}/${this.filename}`;
        this.storage.removeFile(path).subscribe(data => {
            this.file = this.filename = null;
        });
    }

    writeValue(value: any) {
        // clear file input
        this.file = this.filename = null;

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
