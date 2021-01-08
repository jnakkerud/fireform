import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule, ORIGIN} from '@angular/fire/functions';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { CollectionService } from './collection-service/collection.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './auth/user.service';
import { RecentlyUsedService } from './recently-used-service/recently-used.service';
import { LinkService } from './link-service/link.service';
import { DataService } from './data-service/data.service';
import { DownloadService } from './download-service/download.service';
import { StorageService } from './storage-service/storage.service';
import { StorageLocationService } from './storage-service/storage-location.service';
import { TrackingUserService } from './tracking-user-service/tracking-user.service';
import { FirestoreService } from './firestore-service/firestore.service';
import { FingerprintService } from './fingerprint-service/fingerprint.service';
@NgModule({
    imports: [
        AngularFirestoreModule,
        AngularFireFunctionsModule,
        AngularFireStorageModule,
        RouterModule],
    providers: [
        CollectionService,
        AuthGuardService,
        AuthService,
        UserService,
        RecentlyUsedService,
        LinkService,
        DownloadService,
        DataService,
        StorageService,
        StorageLocationService,
        TrackingUserService,
        FirestoreService,
        FingerprintService
        // { provide: ORIGIN, useValue: 'http://localhost:4200' }
    ],
})
export class CoreModule { }
