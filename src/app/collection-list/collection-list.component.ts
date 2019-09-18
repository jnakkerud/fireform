import { Component, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CollectionService } from '../core/collection-service/collection.service';

@Component({
    selector: 'app-project-list',
    templateUrl: 'collection-list.component.html',
    styleUrls: ['./collection-list.component.scss']
})

export class CollectionListComponent {
    constructor(public collectionService: CollectionService) { }
}

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatCardModule],
    exports: [CollectionListComponent],
    declarations: [CollectionListComponent],
  })
  export class CollectionListModule {}
