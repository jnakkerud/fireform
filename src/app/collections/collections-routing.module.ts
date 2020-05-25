import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionListComponent } from './collection-list/collection-list.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';

const routes: Routes = [
    { path: '', component: CollectionListComponent },
    { path: 'create', component: CreateCollectionComponent },
    { path: ':id', component: EditCollectionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }
