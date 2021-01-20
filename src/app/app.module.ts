import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { CoreModule } from './core/core.module';

// TODO Lazy load in AppRoutingModule ???
import { GeneratedFormModule } from './generated-form/generated-form.component';
import { DynamicFormTestModule } from './dynamic-form-test/dynamic-form-test.module';
import { LoginModule } from './login/login.component';

import { HeaderModule } from './header/header.component';

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
    BrowserAnimationsModule,
    CoreModule,
    AngularFireModule.initializeApp(fbConfig),
    AngularFireAuthModule,
    GeneratedFormModule,
    DynamicFormTestModule,
    HeaderModule,
    LoginModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
