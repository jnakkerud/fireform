import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { CollectionService } from './collection-service/collection.service';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { RecentlyUsedService } from './recently-used-service/recently-used.service';
import { AngularMaterialModule } from '../angular-material.module';
import { LinkService } from './link-service/link.service';

@NgModule({
    imports: [
        AngularMaterialModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule],
    exports: [HeaderComponent, LoginComponent],
    declarations: [HeaderComponent, LoginComponent],
    providers: [CollectionService, AuthGuardService, AuthService, RecentlyUsedService, LinkService],
})
export class CoreModule { }
