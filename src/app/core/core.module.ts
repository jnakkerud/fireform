import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule, ORIGIN} from '@angular/fire/functions';

import { HeaderComponent } from './header/header.component';
import { CollectionService } from './collection-service/collection.service';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { RecentlyUsedService } from './recently-used-service/recently-used.service';
import { AngularMaterialModule } from '../angular-material.module';
import { LinkService } from './link-service/link.service';
import { DataService } from './data-service/data.service';
import { DownloadService } from './download-service/download.service';

@NgModule({
    imports: [
        AngularMaterialModule,
        AngularFirestoreModule,
        AngularFireFunctionsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule],
    exports: [HeaderComponent, LoginComponent],
    declarations: [HeaderComponent, LoginComponent],
    providers: [
        CollectionService,
        AuthGuardService,
        AuthService,
        RecentlyUsedService,
        LinkService,
        DownloadService,
        DataService,
        // { provide: ORIGIN, useValue: 'http://localhost:4200' }
    ],
})
export class CoreModule { }
