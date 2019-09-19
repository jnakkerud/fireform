import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionListComponent } from './collection-list/collection-list.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { LoginComponent } from './core/login/login.component';
import { AuthGuardService } from './core/auth/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'collections', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'createCollection', component: CreateCollectionComponent, canActivate: [AuthGuardService]},
  {
    path: 'collections',
    canActivateChild: [AuthGuardService],
    children: [
      {path: '', component: CollectionListComponent}, // TODO rename to CollectionListComponent
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
