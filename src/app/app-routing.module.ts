import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from './project-list/project-list.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';

const routes: Routes = [
  {path: '', redirectTo: 'collections', pathMatch: 'full'},
  {
    path: 'collections',
    children: [
      {path: '', component: ProjectListComponent}, // TODO rename to CollectionListComponent
      {path: ':id', component: EditCollectionComponent},
    ],
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
