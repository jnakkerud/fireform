import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-create-collection',
    templateUrl: 'create-collection.component.html'
})

export class CreateCollectionComponent implements OnInit {

    collectionNameGrp: FormGroup;

    constructor(private router: Router, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.collectionNameGrp = this.formBuilder.group({
            nameCtrl: ['', Validators.required]
        });
    }

    onCancel() {
        this.router.navigate(['/']);
    }

    onNext() {
        // validate
        const name = this.collectionNameGrp.get('nameCtrl').value;

        // save collection project

        // move to edit collection
        this.router.navigate(['/collections', name]);
    }
}

@NgModule({
    imports: [
        RouterModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        CommonModule],
    exports: [CreateCollectionComponent],
    declarations: [CreateCollectionComponent],
  })
  export class CreateCollectionModule {}
