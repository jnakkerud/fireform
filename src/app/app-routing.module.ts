import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    loadChildren: () => import('./collections/collections.module').then(m => m.CollectionsModule)
  },
  { path: 'form/:id', component: GeneratedFormComponent },
  { path: 'formcomplete/:id', component: FormCompleteComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
