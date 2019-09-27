import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { HeaderComponent } from './header/header.component';
import { CollectionService } from './collection-service/collection.service';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { RecentlyUsedService } from './recently-used-service/recently-used.service';

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatDividerModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule],
    exports: [HeaderComponent, LoginComponent],
    declarations: [HeaderComponent, LoginComponent],
    providers: [CollectionService, AuthGuardService, AuthService, RecentlyUsedService],
})
export class CoreModule { }
