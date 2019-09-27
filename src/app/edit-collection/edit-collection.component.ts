import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

import { CollectionService, CollectionItem } from '../core/collection-service/collection.service';

@Component({
    selector: 'app-edit-collection',
    templateUrl: 'edit-collection.component.html',
    styleUrls: ['./edit-collection.component.scss']
})

export class EditCollectionComponent implements OnInit {
    editItem: CollectionItem;
    editName = false;
    showNameEditor = false;
    collectionNameGrp: FormGroup;

    constructor(private route: ActivatedRoute, private collectionService: CollectionService, private formBuilder: FormBuilder) {
        route.params.subscribe(p => {
            this.editItem = this.collectionService.getItem(p.id);
        });
    }

    ngOnInit() {
        //  TODO resolve duplicate with create collection view
        this.collectionNameGrp = this.formBuilder.group({
            nameCtrl: [this.editItem.name, Validators.required]
        });
    }

    onEditName() {
        this.showNameEditor = true;
    }

    onCancel() {
        this.showNameEditor = false;
    }

    onSave() {
        this.showNameEditor = false;
        this.editItem = this.collectionService.addItem({
            id: this.editItem.id,
            name: this.collectionNameGrp.get('nameCtrl').value,
            description: this.editItem.description
        });
    }
}

@NgModule({
    imports: [
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatDividerModule,
        ReactiveFormsModule,
        CommonModule],
    exports: [EditCollectionComponent],
    declarations: [EditCollectionComponent],
  })
  export class EditCollectionModule {}
