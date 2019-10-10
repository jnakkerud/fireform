import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../angular-material.module';

@Component({
    selector: 'app-form-builder',
    templateUrl: 'form-builder.component.html',
    styleUrls: ['./form-builder.component.scss']
})

export class FormBuilderComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}

@NgModule({
    imports: [
        AngularMaterialModule,
        CommonModule],
    exports: [FormBuilderComponent],
    declarations: [FormBuilderComponent],
  })
  export class FormBuilderModule {}
