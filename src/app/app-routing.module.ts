import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionListComponent } from './collections/collection-list/collection-list.component';
import { EditCollectionComponent } from './collections/edit-collection/edit-collection.component';
import { CreateCollectionComponent } from './collections/create-collection/create-collection.component';
import { LoginComponent } from './core/login/login.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { GeneratedFormComponent, FormCompleteComponent } from './generated-form/generated-form.component';
import { DynamicFormTestComponent } from './dynamic-form-test/dynamic-form-test.component';

const routes: Routes = [
  { path: '', redirectTo: 'collections', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'test-form', component: DynamicFormTestComponent},
  {
    path: 'collections',
    canActivateChild: [AuthGuardService],
    children: [
      { path: '', component: CollectionListComponent },
      { path: 'create', component: CreateCollectionComponent },
      { path: ':id', component: EditCollectionComponent },
    ],
  },
  { path: 'form/:id', component: GeneratedFormComponent },
  { path: 'formcomplete/:id', component: FormCompleteComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
