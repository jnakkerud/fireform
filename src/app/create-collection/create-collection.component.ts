import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CollectionService } from '../core/collection-service/collection.service';

@Component({
    selector: 'app-create-collection',
    templateUrl: 'create-collection.component.html'
})

export class CreateCollectionComponent implements OnInit {

    collectionNameGrp: FormGroup;

    constructor(private router: Router, private formBuilder: FormBuilder, private collectionService: CollectionService) { }

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
        const nameVal = this.collectionNameGrp.get('nameCtrl').value;

        // save collection project
        const newItem = this.collectionService.addItem({
            id: '-1',
            name: nameVal,
            description: 'description'
        });

        // move to edit collection
        this.router.navigate(['/collections', newItem.id]);
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
