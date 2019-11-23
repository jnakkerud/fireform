import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';

import { CoreModule } from './core/core.module';
import { CollectionListModule } from './collection-list/collection-list.component';
import { EditCollectionModule } from './edit-collection/edit-collection.component';
import { CreateCollectionModule } from './create-collection/create-collection.component';
import { GenerateLinkModule } from './generate-link/generate-link.component';
import { GeneratedFormModule } from './generated-form/generated-form.component';

// https://www.learnhowtoprogram.com/javascript/angular-extended/firebase-introduction-and-setup
import { masterFirebaseConfig } from './api-keys';
export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  projectId: masterFirebaseConfig.projectId,
  storageBucket: masterFirebaseConfig.storageBucket
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    CollectionListModule,
    EditCollectionModule,
    CreateCollectionModule,
    GenerateLinkModule,
    GeneratedFormModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
