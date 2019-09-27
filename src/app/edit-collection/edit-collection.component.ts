import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

import { CollectionService, CollectionItem } from '../core/collection-service/collection.service';
import { RecentlyUsedService } from '../core/recently-used-service/recently-used.service';

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

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private collectionService: CollectionService,
        private recentlyUsedService: RecentlyUsedService,
        private formBuilder: FormBuilder) {
        this.route.params.subscribe(p => {
            this.editItem = this.collectionService.getItem(p.id);
            this.recentlyUsedService.set(this.editItem.id);
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

    onDelete() {
        // delete from the collection
        this.collectionService.removeItem(this.editItem);

        // move to card view
        this.router.navigate(['/']);
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
