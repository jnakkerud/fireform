import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';

// TODO can these be moved to AppRoutingModule
import { CollectionListModule } from './collection-list/collection-list.component';
import { EditCollectionModule } from './edit-collection/edit-collection.component';
import { CreateCollectionModule } from './create-collection/create-collection.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    CollectionListModule,
    EditCollectionModule,
    CreateCollectionModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
