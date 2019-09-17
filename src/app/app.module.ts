import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
