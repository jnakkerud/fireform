import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { CoreModule } from './core/core.module';
import { CollectionListModule } from './collections/collection-list.component';
import { EditCollectionModule } from './edit-collection/edit-collection.component';
import { CreateCollectionModule } from './create-collection/create-collection.component';
import { GenerateLinkModule } from './generate-link/generate-link.component';
import { GeneratedFormModule } from './generated-form/generated-form.component';
import { DynamicFormTestModule } from './dynamic-form-test/dynamic-form-test.component';
import { SendInvitationModule } from './send-invitation/send-invitation.component';

import { firebaseConfig } from './api-keys';
export const fbConfig = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AngularFireModule.initializeApp(fbConfig),
    AngularFireAuthModule,
    CollectionListModule,
    EditCollectionModule,
    CreateCollectionModule,
    GenerateLinkModule,
    GeneratedFormModule,
    DynamicFormTestModule,
    SendInvitationModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
